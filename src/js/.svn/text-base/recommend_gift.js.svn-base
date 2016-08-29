Object.prototype.hasClass = function (cls) {
    return this.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
Object.prototype.addClass = function (cls) {
    if (!this.hasClass(cls)) this.className += " " + cls;
};
Object.prototype.removeClass = function (cls) {
    if (this.hasClass(cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        this.className = this.className.replace(reg, '');
    }
};
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
if(is_weixn()){
    $('header').hide();
}
var CLICK = ("ontouchstart" in document) ? "tap" : "click";

var shareBtn = document.querySelector('#share_btn');
var uiMask = document.querySelectorAll(".ui_mask")[0];
var uiPopWrap = document.querySelectorAll(".ui_pop_wrap")[0];
var uiPop = document.querySelectorAll(".ui_pop")[0];
var imgurl = "http://images.autostreets.com/";

shareBtn.addEventListener(CLICK, function () {
    uiMask.addClass("ui_mask_show");
    if (is_weixn()) {
        document.querySelector('.share_to_img').style.display = "block";
    } else {
        uiPop.addClass("zoomIn");
        uiPopWrap.style.visibility = "visible";
    }
});
uiPopWrap.addEventListener(CLICK, function () {
    var t = this, timer;
    clearTimeout(timer);
    uiPop.removeClass("zoomIn");
    uiPop.addClass("zoomOut");
    timer = setTimeout(function () {
        uiMask.removeClass("ui_mask_show");
        uiPop.removeClass("zoomOut");
        t.style.visibility = "hidden";
    }, 300);
});
uiPop.addEventListener(CLICK, function (e) {
    e.stopPropagation();
});

uiMask.addEventListener(CLICK, function () {
    hideWeixinMask();
});
document.querySelector('.share_to_img').addEventListener(CLICK, function () {
    hideWeixinMask();
});


function hideWeixinMask() {
    uiMask.removeClass('ui_mask_show');
    document.querySelector('.share_to_img').style.display = "none";
}

// http://wap.autostreets.com/member/recommend?referenceId=0ad31c1020b9454dbb69bf8f48892283&referenceWay=3

if (sessionStorage.memberSid && !GetQueryString('referenceId')) {
    window.location.href += "?referenceId=" + sessionStorage.memberSid + "&referenceWay=2";

} else if (sessionStorage.memberSid && GetQueryString('referenceId')) {
    $('header section').append('<a href="javascript:history.go(-1);" class="back"></a>推荐有礼');
    $('.has_login').show();

    $.ajax({
        url: 'https://login.autostreets.com/member/share',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        jsonpCallback: "getImg",
        data: {
            memberSid: sessionStorage.memberSid,
            referenceWay: 2
        },
        success: function (data) {
            if (data.success) {
                $('.qrcode').prop("src", imgurl + data.data.shareImg);
                $('.user_name').html(returenCellPhone());
            }
            
            
            function returenCellPhone() {
                var cellPhone=JSON.parse(sessionStorage.member_info).cellphone;
                return cellPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }

        }
    });
}else if (GetQueryString("referenceId") && !sessionStorage.memberSid) {
    $('.un_login').show();
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
