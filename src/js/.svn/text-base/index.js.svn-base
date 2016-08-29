var CLICK=("ontouchstart" in document)?"tap":"click";
var imgurl = "http://images.autostreets.com/";
$.ajax({
    type: "GET",
    url: "http://wap.autostreets.com/activity/findAdvertise",
    dataType: "jsonp",
    jsonp: 'jsoncallback',
    scriptCharset: "GBK",
    jsonpCallback: "getActivityList",
    cache: false,
    success: function (data) {
        var html="";
        $.each(data.data, function (i,item) {
            //<li><a href="activity_list.html"><img class="index_ad" src="http://img.autostreetscdn.com/m/src/images/index_ad.png" alt=""/></a></li>
            html+='<li><a href="'+item.clickUrl+'" onClick="_traceEvent(\'Wap焦点图\',\'点击\',\''+item.name+'\',\'10\',\'false\')"" ><img class="index_ad" src="'+imgurl+item.photoUrl+'" alt=""/></a></li>';
        });
        $('.slider ul').empty().append(html);
        $('.slider').swipeSlide({
            speed: 4000,
            trigger:".trigger",
            continuousScroll: true,
            lazyLoad: true
//        callback: function (i,j,k) {
//        }
        });
    }
});

if(!localStorage.downapp){
    $('.app_download').show();
}
$('#close_app_download').on(CLICK,function () {
    $('.app_download').addClass('hide_app_download');
    localStorage.downapp=2;
});
