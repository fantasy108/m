var siteurl = "http://wap.autostreets.com/html/";
var type=$('#qa').length?2:1;
var current=1;
var loadingIcon=$('.loading');
var loadFlag = true;
var winH = document.documentElement.clientHeight || document.body.clientHeight;
var count;
var loadList=function () {
    $.ajax({
        type: "GET",
        url: "http://wap.autostreets.com/auctionVehicle/getAuctionNotice",
        dataType: "jsonp",
        data:{
            type:type,
            current:current
        },
        jsonp: 'jsoncallback',
        jsonpCallback: "getList",
        beforeSend:function () {
            loadingIcon.show();
        },
        success:function (data) {
            console.log(data);
            if(data.success){
                loadingIcon.hide();
                $.each(data.data,function (i, item) {
                    // car_news_detail.html
                    $('.bd ul').append('<li><a href="http://wap.autostreets.com/view/news/detail?id='+item.id+'&type='+(type==1?"auction":"qa")+'">【'+new Date((item.createTime)).Format("yyyy年MM日")+'】  '+item.title+'</a></li>');
                    if($('.bd ul').find('li').length==data.extras.count){
                        loadFlag=false;
                    }else{
                        loadFlag=true;
                    }
                })


            }



        }
    });
};

loadList();
window.onscroll = function () {
    var s_t = document.documentElement.scrollTop || document.body.scrollTop;
    var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (s_t + winH + 100 >= doc_h && loadFlag) {
        current += 1;
        loadFlag = false;
        loadList();
    }
};







//事件字符转换
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};