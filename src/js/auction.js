
var url = "http://wap.autostreets.com//memberVehicle/getAuctionVehicleByMember?memberSid="+userUtils.getMemberSid(true);

var imgurl = "http://images.autostreets.com/";

var caelogoimg="http://img.autostreetscdn.com/";

var siteurl="http://wap.autostreets.com/html/usedcar/";

var page = 1;

var isload = '0';

var power = '0'//0允许 1不允许 ＋1


$(function(){

    //alert(userUtils.getMemberSid(true));
    loadpro();


});

function loadpro(){

    var select_url = url+"&current="+page;

    $.ajax({type: "GET",url:select_url,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getlist",cache:false,
        success:function(data){
            //$("#pro_list").empty();
            //循环数据列表
            //alert(data.data.length);
            if(data.data.length>0){

                if(page == 1){
                    $("#competitive_list").empty();
                }

                $.each(data.data,function(i,item){
                    //alert(item.registerLicenseDate.toDateString());
                    var lin=item.vehicle.source=="av"?"<span class='lin'>临</span>":"";
                    var _price = item.finalPrice;

                    if(_price < 100 ){
                        _price = "&yen; " + _price;
                    }
                    else{

                        _price = "&yen; " + _price/10000 + "万";
                    }
                    //if(_price != "面议"){
                    //  _price = "&yen; " + _price;
                    //}
                    var auctionId=item.auctionSid?item.auctionSid:"";
                    var tip=item.auctionType==0?"<i class='tongbu_p'><s>现场拍</s></i>":"<i class='online_p'><s>在线拍</s></i>";
                    var _prolist = $("<li  data-av='"+(item.vehicle.source || "other")+"' sid='"+auctionId+"' data-type='"+item.auctionType+"'><p class='prolist_img'><span class='ft_tip'>"+tip+"<img src='"+imgurl+item.vehicle.firstPhotoUrl+"'></span></p><h3>"+lin+item.vehicle.brand+" "+item.vehicle.vehicleModel+" "+(item.vehicle.selledName || "")+"</h3><p>"+item.city+"<ins>|</ins>"+(new Date(item.vehicle.registerLicenseDate)).Format("yyyy年M月")+"<ins>|</ins>"+item.vehicle.displayMileage+"万公里<ins>|</ins>"+item.vehicle.licenseCode+"</p><strong>"+_price+"元竞得</strong></li>");
                    _prolist.click(function(){
                        if($(this).data("av")=="av"){return;}
                        localStorage.auctionSid=$(this).attr('sid');
                        var type=$(this).data('type')==0?"sync/sync_auction_detail.html":"online/online_detail.html";
                        window.location.href=siteurl+type+"?id="+item.sid;
                    });
                    $("#pro_list").append(_prolist);
                });
            }
            else{
                $('#loading').hide();
                if(page == 1){
                    $("#pro_list").empty();
                    $("#pro_list").append("<li class='nodata'>抱歉，没有符合条件的车辆</li>");
                }
            }




            $('#loading').hide();


        }
    });
}

//事件字符转换
Date.prototype.Format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}



//滚动条在Y轴上的滚动距离  
function getScrollTop(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
window.onscroll = function(){
    if(getScrollTop() + getWindowHeight() == getScrollHeight()){
        $('#loading').show();
        if(power=='0'){
            page++;
            power='1'
        }
        loadpro();
    }
};




