var CLICK = "click"; 
var UA = window.navigator.userAgent;
if (/iphone|iPod|ipad|itouch|ios|android|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()))CLICK = "tap";
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null)return decodeURI(r[2]);
    return null
}
var sitUrl = "http://wap.autostreets.com/";
var imgUrl = "http://images.autostreets.com/";
var loadingIcon = $("#loading");
var halfOffActivity = sitUrl + "activity/halfOffActivity";
var getActivityDetail = sitUrl + "activity/getActivityDetail";
function api() {
    function createParame() {
        var p = "";
        for (var i in this)p += "?" + i + "=" + this[i] + "";
        return p
    }

    var t = this;
    var fn = arguments[0];
    var requireUrl = arguments[1] ? t + createParame.call(arguments[1]) : t;
    $.ajax({
        type: "GET",
        url: requireUrl,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        beforeSend: function () {
            loadingIcon.show()
        },
        success: function (data) {
            fn(data);
            loadingIcon.hide()
        }
    })
}
var activityListUl = $(".half_off_ul");
var titleFlag = true;
if ($("#half_off_list").length) {
    var getActivityListFn = function $getActivityListFn$(data) {
        var result = data.data;
        $.each(result, function (i, item) {
            if (titleFlag) {
                $("header section").append(item.activityName);
                //insertTitle(item.activityName);
                titleFlag = false
            }
            var discount = 1 - item.modelPrice / item.guildePrice == 0 ? 0 : (item.modelPrice / item.guildePrice * 10).toFixed(1);
            var html='<li class="half_item_wrap">' +
                '<a class="half_item" href=./halfOffDetail?id='+item.id+'>' +
                '<p class="img_wrap">' +
                '<img onerror="this.src=\'http://img.autostreetscdn.com/m/build/1.00/images/new_mall/no_pic.jpg\'" src="'+imgUrl+item.picUrl+ '"  alt="">' +
                '</p>' +
                '<div class="r_box">' +
                '<strong class="discount">'+discount+'折</strong>' +
                '<p class="title">'+item.selledName+'</p>' +
                '<div class="price">' +
                '<span class="curr_price">&yen;<span class="curr_price_num">'+(item.modelPrice).toFixed(2)+'</span>万</span>' +
                '<span class="origin_price">市场价：<span class="origin_price_num">'+(item.guildePrice).toFixed(2)+'万</span></span>' +
                '</div>' +
                '<span class="location">'+item.city+'</span>' +
                '</div>' +
                '</a></li>';
            activityListUl.append(html)
        })
    };
    api.call(halfOffActivity, getActivityListFn);
    $(".load_others").click(function () {
        activityListUl.empty();
        api.call(halfOffActivity, getActivityListFn)
    })
}
if ($("#half_off_detail").length) {
    var id = GetQueryString("id");
    var getActivityDetailFn = function $getActivityDetailFn$(data) {
        var result = data.data[0];
        var stock = result.stock;
        setTimeout(function () {
            if (stock == 1 || stock > 1) {
            $('.ho_sub p').html(""+Math.floor(result.depositAmt)+"元抵1000元现金\<br\/\>到店支付尾款")
            $('.ho_sub a').html("支付定金")
            } else {
            $('.ho_sub p').html("由于车源紧张，请留下联系方式\<br\/\>如有现车我们将第一时间联系您")
            $('.ho_sub a').html("我有兴趣")
            }
        }, 100);
        $(".car_banner_sub").before('<img class="car_banner_img" onerror="this.src=\'http://img.autostreetscdn.com/m/build/1.00/images/new_mall/no_pic.jpg\'" src="' + imgUrl + result.picUrl + '"  alt="">');
        $(".title h3").html(result.selledName);
        insertTitle(result.selledName);
        $(".discount_price span").html((result.modelPrice).toFixed(2));
        $(".origin_price span").html((result.guildePrice).toFixed(2));
        $("#get_car_location i").html(result.city);
        $("#get_car_range i").html(result.saleArea);
        $("#configParameters").prop("href", "http://wap.autostreets.com/replacement/toPatameter?modelSid=" + id)
    };
    api.call(getActivityDetail, getActivityDetailFn, {id: id})
}
;
var _daq = _daq || [];
function insertTitle(title) {
    var t = document.createElement("title");
    t.innerHTML = title;
    var l = document.getElementsByTagName("link")[0];
    l.parentNode.insertBefore(t, l);
    _daq.push(["_setAccount", "wap"]);
    (function() {
        var da = document.createElement("script");
        da.type = "text/javascript";
        da.async = true;
        da.src = ("https:" == document.location.protocol ? "https://da" : "http://da") + ".autostreets.com/da.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(da, s)
    })()
}
