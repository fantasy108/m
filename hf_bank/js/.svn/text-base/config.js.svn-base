require.config({
    baseUrl:"http://img.autostreetscdn.com/m/src/js/",
    paths: {
        "zepto": "lib/zepto.min",
        "touch": "lib/touch"
    },
    shim: {
        zepto: {
            exports: '$'
        },
        touch:{
            deps: ['zepto']
        },
        common:{
            deps: ['zepto']
        }
    }
});




var CLICK = "click";
var UA = window.navigator.userAgent;
if(/iphone|iPod|ipad|itouch|ios|android|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase())){
    CLICK = 'tap'
}
var imgurl = "http://images.autostreets.com/";

var caelogoimg = "http://img.autostreetscdn.com/";
var sourceUrl = "http://img.autostreetscdn.com/";
var siteurl = "http://wap.autostreets.com/html/";
//var siteurl = "http://mwap.com/src/html/";

var headerH = document.querySelectorAll('header')[0].offsetHeight;
var winW = document.documentElement.clientWidth || document.body.clientWidth;
var winH = document.documentElement.clientHeight || document.body.clientHeight;
