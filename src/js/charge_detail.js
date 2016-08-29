var _infourl = "http://wap.autostreets.com/auction/getCollectFeeDetailByAvSid?avSid="+GetQueryString('id');

var imgurl = "http://images.autostreets.com/";

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}



$(function(){




    $.ajax({type: "GET",url:_infourl,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getinfo",cache:false,
        success:function(data){
            console.log(data)

            if(!data.data.commission){
                data.data.commission = "0"
            }
            if(!data.data.commissionPercent){
                data.data.commissionPercent = "0"
            }
            if(!data.data.licenseFee){
                data.data.licenseFee = "0"
            }
            if(!data.data.exWarehouseFee){
                data.data.exWarehouseFee = "0"
            }
            if(!data.data.parkingFee){
                data.data.parkingFee = "0"
            }
            if(!data.data.totalPrice){
                data.data.totalPrice = "0"
            }

            $('#charge-1').html(Number(data.data.commissionPercent).toFixed(2)+"%");
            $('#charge-2').html(data.data.commission+'元')
            $('#charge-3').html(data.data.licenseFee+'元')
            $('#charge-4').html(data.data.exWarehouseFee+'元')
            $('#charge-5').html(data.data.parkingFee+'元')
            $('#charge-7').html(data.data.totalPrice+'元')

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
