var liveRoomFlag=true;
var _infourl = "http://wap.autostreets.com/auction/getVehicleDetailInfoByAvSid?&avSid="+GetQueryString('id');


var imgurl = "http://images.autostreets.com/";
var siteurl = "http://wap.autostreets.com/html/usedcar/";


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}




$(function(){


    var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

//    $('#wrapper').width(w);
    //$('#thelist li').width(w);


    $.ajax({type: "GET",url:_infourl,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getinfo",cache:false,
        success:function(data){
            /*//本地存储 所在门店信息
             if(window.localStorage){
             localStorage.storeName=data.data.orgStore;
             localStorage.storeAdd=data.data.orgStoreAddr;
             localStorage.storeTime=data.data.orgServiceTime;
             }

             $('.storeName').html(data.data.orgStore);*/

            //车辆标题
            $('#id_title').html(data.data.vehicleTitle);
            insertTitle(data.data.vehicleTitle);
            //车辆价格
            //alert(data.data.hidden);//undi
            if(data.data.hidden){
                $('#infodetail_price').html("面议");
                // $('#infodetail_price').html(data.data.price/10000 +" <ins>万元</ins>")
            }
            else{
                //$('#infodetail_price').html("面议") 
                $('#infodetail_price').html(data.data.price/10000 +" <ins>万元</ins>")
            }

            $('#detaillink').attr('href',siteurl+'competitive_detail_info.html?vehicleSid='+data.data.vehicleSid);

            //车辆信息
            $.each(data.data.vehicleAttribute,function(i,item){

                if(item.key=="表显里程"){
                    item.value = item.value + "万公里"
                }

                if(item.key=="首次上牌"){
                    item.value = (new Date(item.value)).Format("yyyy年M月")
                }
                if(item.key=="原车牌号"){
                    item.value = item.value.substr(0,2);
                }

                var _vehicleAttribute = "<li>"+"<span>"+item.key+"</span>"+"："+item.value+"</li>";
                $("#vehicleAttribute").append(_vehicleAttribute);

            });

            //alert(data.data.vehiclePhotoList);
            //车辆图片
            $('#scroller').width(w*data.data.vehiclePhotoList.length);
            var myScroll;
            myScroll = new iScroll('scroller_wrap', {
                snap:true,
                momentum:false,
                hScrollbar:false,
                lockDirection:false,
                vScroll:false,
                fixedScrollbar:true,
                onScrollStart:function(e){
                    e.preventDefault();
                },
                onScrollEnd: function () {
                    //document.querySelector('#indicator > li.active').className = '';
                    //document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                }
            });

            //alert(data.data.vehiclePhotoList);

            //$('#thelist').width(w*data.data.vehiclePhotoList.length);
            //alert(data.data.vehiclePhotoList);
            $.each(data.data.vehiclePhotoList,function(i,item){
                // alert($('#scroller').width());
                var _proimgbig = "<li style='width:"+w+"px'><img src='"+ imgurl + item +"'></li>"
                $("#thelist").append(_proimgbig);

            });
            //车辆图片
            $('#scroller').width(w*data.data.vehiclePhotoList.length);
            /*确定图片宽度*/
            var _width = $(window).width();
            var scro_len = $("#scroller li").length;
            var indi_len = $("#indicator li").length;
            $("#scroller li").width(_width);
            $("#scroller li img").width(_width);
            $("#nav").width(_width);
            $("#scroller").height(Math.ceil((_width/640)*453));
//	$("#indicator").width(12*indi_len)

            //轮播索引点
            if(scro_len<1){
                var dot="";
                for(var i=1;i<scro_len;i++){
                    if(i==1){
                        dot+='<li class="active"></li>';
                    }
                    dot+='<li></li>';
                }

                $('#indicator').append(dot);
            }
            var myScroll;
            myScroll = new iScroll('scroller_wrap', {
                snap: true,
                momentum: false,
                hScrollbar: false,
                onScrollStart:function(e){e.preventDefault()},
                onScrollEnd: function () {
                    document.querySelector('#indicator > li.active').className = '';
                    document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                }
            });

            //$('#proimgbig').html("<img src='"+ imgurl + data.data.vehiclePhotoList[0] +"'>");

            //thelist

            //车辆描述
            $('#vehicleDesc').html(data.data.vehicleDesc);


        }
    });




});

//根据拍卖会标识获取拍卖会状态
var memberSid = userUtils.getMemberSid();
var getJsonInSessionStorage = function(value){
    var obj = sessionStorage.getItem(value);
    var json = {};
    try {
        if (obj) {
            json = JSON.parse(obj);
        }
    } catch (e) {
        console.log(e.message);
    }
    return json;
};

var memberInfo = getJsonInSessionStorage("member_info"); //会员信息
/*if (memberSid) {
 if (!userUtils.isCertMerchant(memberSid)) {
 $(".link_live_room").addClass("not_allow");
 }
 }*/

$.ajax({
    url:"http://wap.autostreets.com/auction/getStatusByAuctionSid&auctionSid="+localStorage.auctionSid,
    type:"GET",
    dataType: "jsonp",
    jsonp: 'jsoncallback',
    scriptCharset: "GBK",
    jsonpCallback: "getStatusByAuctionSid",
    cache: false,
    success:function(data){
        //0-未发布、1-已发布、2-拍卖开始、3-拍卖结束
        var status=data.data;
        var member_isCertMerchant = userUtils.isCertMerchant();

        if(status=="2"  && (memberInfo.isCertMerchant || memberInfo.isSpCertMerchant)){

            $('.link_live_room').removeClass("not_allow").find("a");
        }else{
            $('.link_live_room').addClass("not_allow").find("a").css("cursor","default");
            liveRoomFlag=false;
        }
    }
});

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
/*title 处理*/
var _daq = _daq || [];
function insertTitle(title){
    var t=document.createElement("title")
    t.innerHTML=title;
    var l = document.getElementsByTagName('link')[0];
    l.parentNode.insertBefore(t, l);

    _daq.push(['_setAccount', 'wap']);
    (function() {
        var da = document.createElement('script');
        da.type = 'text/javascript';
        da.async = true;
        da.src = ('https:' == document.location.protocol ? 'https://da' : 'http://da') + '.autostreets.com/da.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(da, s);
    })();

}