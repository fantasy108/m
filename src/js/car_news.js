var siteurl = "http://wap.autostreets.com/html/";
//var siteurl = "http://mwap.com/src/html/";
var imgurl = "http://images.autostreets.com/";
var winH = document.documentElement.clientHeight || document.body.clientHeight;

if ($('#car_news').length) {
    var loadFlag = true;
    var current = 1;
    var loadingIcon = $('#loading');
    var loadingText = $('.loadMoreText');
    var loadNewsList = function () {
        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/news/list?current=" + current + "&length=10",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getCarNewsList",
            beforeSend: function () {
                loadingIcon.show();
                loadingText.show();
            },
            success: function (data) {
                var result = data.data;
                $.each(result, function (i, item) {

                    $('#car_news ul').append('<li data-id="' + item.sid + '" class="car_news_list">' +
                        '<a href="'+siteurl+'car_news_detail.html?id=' + item.sid + '&type=news" class="car_news_desc">' +
                        '<img class="car_news_sm_img" src="' + imgurl + item.imgUrl + '" alt="">' +
                        '<p class="car_news_title">' + item.title + '</p>' +
                        '<span class="news_date">' + new Date(item.createTime).format("yyyy-MM-dd") + '</span>' +
                        '</a>' +
                        '</li>')
                })

                if ($('.car_news_list').length >= data.extras.count) {
                    loadFlag = false;
                } else {
                    loadFlag = true;
                }
                loadingIcon.hide();
                loadingText.hide();
            }
        });

    };

    loadNewsList();
    //滚动加载
    window.onscroll = function () {
        var s_t = document.documentElement.scrollTop || document.body.scrollTop;
        var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (s_t + winH + 100 >= doc_h && loadFlag) {
            current += 1;
            loadFlag = false;
            loadNewsList();
        }
    };
}

if ($('#car_news_detail').length) {
    if(GetQueryString("type")=="auction"){
        $('header section span').text('竞拍公告')
    }else if(GetQueryString("type")=="qa"){
        $('header section span').text('常见问题')
    }else if(GetQueryString("type")=="news"){
        $('header section span').text('汽车资讯')
    }
    $.ajax({
        type: "GET",
        url: "http://wap.autostreets.com/news/detail?id="+GetQueryString("id"),
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        scriptCharset: "GBK",
        jsonpCallback: "getCarNewsList",
        success: function (data) {
            var result = data.data;
            /*title*/
            $('#car_news_detail').append('<h2>' + result.title + '</h2>');
            $('#car_news_detail').append('<span class="createTime">' + new Date(result.createTime).format("yyyy-MM-dd") + '</span>');
            $('#car_news_detail').append(result.content);
        }
    });
}


Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

