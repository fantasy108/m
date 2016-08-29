var imgurl = "http://images.autostreets.com/";
$.ajax({
    type: "GET",
    url: "http://wap.autostreets.com/auctionVehicle/findAdvertise",
    dataType: "jsonp",
    jsonp: 'jsoncallback',
    scriptCharset: "GBK",
    jsonpCallback: "getActivityList",
    cache: false,
    success: function (data) {
        var html="";
        var text="";
        $.each(data.data, function (i,item) {
            //<li><a href="activity_list.html"><img class="index_ad" src="http://img.autostreetscdn.com/m/src/images/index_ad.png" alt=""/></a></li>
            html+='<li><a href="'+item.clickUrl+'" onClick="_traceEvent(\'Wap拍卖大厅焦点图\',\'点击\',\''+item.name+'\',\'10\',\'false\')"" ><img class="index_ad" src="'+imgurl+item.photoUrl+'" alt=""/></a></li>';
            text+='<li>'+item.name+'</li>';
        });
        $('.slider>ul').empty().append(html);
        $('.slider .text ul').empty().append(text);
        $(".slider").swipeSlide({
            speed: 4000,
            trigger: ".trigger",
            continuousScroll: true,
            lazyLoad: true,
            callback: function (i, j, k) {
                $('.text li').eq(i).show().siblings().hide();
            }
        });
    }
});