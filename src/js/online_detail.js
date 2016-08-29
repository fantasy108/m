var _infourl = "http://wap.autostreets.com/auction/getVehicleDetailInfoByAvSid?avSid="+GetQueryString('id');

var imgurl = "http://images.autostreets.com/";

var siteurl = "http://wap.autostreets.com/html/";

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}



$(function(){

    $('#charge').click(function(){
        if(sessionStorage.isCertMerchant=="true"){
            window.location.href=siteurl+"charge_detail.html?id="+GetQueryString('id');
        }
        else{
            alert("该车成交价只有认证商户可见您可以拨打客服热线400-821-8889申请成为商家用户");
        }
    });


    var w=document.documentElement.clientWidth || document.body.clientWidth;
    $('#wrapper').width(w);
    //$('#thelist li').width(w);


    $.ajax({type: "GET",url:_infourl,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getinfo",cache:false,
        success:function(data){

            //加价幅度
            g_plus_range = data.data.plusRange;
            $("#myBid").text(g_price + g_plus_range);

            //车辆标题
            $('#id_title').html(data.data.vehicleTitle);
            //车辆价格
            //alert(data.data.hidden);//undi
            //if(data.data.hidden){  
            //  $('#infodetail_price').html("面议")
            // $('#infodetail_price').html(data.data.price/10000 +" <ins>万元</ins>")
            //}
            //else{
            //$('#infodetail_price').html("面议")
            //  $('#infodetail_price').html(data.data.price +" <ins>元</ins>")
            //}
            $("#detaillink").on("click", function(){
                location.href = "http://wap.autostreets.com/html/usedcar/competitive_detail_info.html?vehicleSid="+data.data.vehicleSid;
            });


//            $("#vehicleDetail").html(data.data.currentCity + "<ins>|</ins>"+ new Date(data.data.registerLicenseDate).Format("yyyy年MM月") +"<ins>|</ins>"+ data.data.displayMileage +"万公里<ins>|</ins>" + data.data.sweptVolumeStandard);

            //车辆信息
            city= data.data.auCity ;
            $.each(data.data.vehicleAttribute,function(i,item){

               /* if(item.key=="所在城市"){
                    city= item.value ;
                }*/

                if(item.key=="表显里程"){
                    dis = item.value + "万公里";
                }

                if(item.key=="首次上牌"){
                    licTime  = (new Date(item.value)).Format("yyyy年M月");
                }
                if(item.key=="原车牌号"){
                    lic  = item.value;
                }
            });
            _vehicleAttribute =city+"<ins>|</ins>"+licTime+"<ins>|</ins>"+dis+"<ins>|</ins>"+lic;
            $("#vehicleDetail").append(_vehicleAttribute);

            //alert(data.data.vehiclePhotoList);
            //车辆图片
            $('#scroller').width(w*data.data.vehiclePhotoList.length);
            var myScroll;
            myScroll = new iScroll('wrapper', {
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

            //$('#proimgbig').html("<img src='"+ imgurl + data.data.vehiclePhotoList[0] +"'>");

            //thelist

            //车辆描述
            //$('#vehicleDesc').html(data.data.vehicleDesc);


        }
    });



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
