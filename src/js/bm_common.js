/**
 * Created by xuelei.kong on 2015/5/18.
 */
FastClick.attach(document.body);
var host = location.host;
var uiMask = $('.ui_mask');//渐变遮罩
var sitUrl = "http://wap.autostreets.com/";
//var staticUrl = sitUrl+"html/booking_maintenance/";
if (host == "mwap.com") {
    var staticUrl = "http://mwap.com/src/html/booking_maintenance/";
} else {
    var staticUrl = sitUrl + "html/booking_maintenance/";

}
var imgUrl = "http://images.autostreets.com/";
var maintenancePort = maintenancePort || {};
var winW = document.documentElement.clientWidth || document.body.clientWidth;
var winH = document.documentElement.clientHeight || document.body.clientHeight;


//配置參數
maintenancePort.getConfigParams = sitUrl + "common/getConfigParams";
//套餐
maintenancePort.packageList = sitUrl + "maintenPackage/list";
//套餐详情
maintenancePort.packageDetail = sitUrl + "maintenPackage/detail";
//套餐是否匹配
maintenancePort.isMatchPackage = sitUrl + "maintenPackage/isMatchPackage";
//靠谱门店列表
maintenancePort.shopList = sitUrl + "maintainOrganization/list";
//靠谱门店列表
maintenancePort.shopDetail = sitUrl + "maintainOrganization/detail";
//门店是否匹配
maintenancePort.isMatchOrgan = sitUrl + "maintainOrganization/isMatchOrgan";
//优惠券提示信息
maintenancePort.getMsg = sitUrl + "coupon/getMsg";
//优惠券列表
maintenancePort.couponList = sitUrl + "coupon/list";
//车辆品牌
maintenancePort.carBrands = sitUrl + "customerVehicle/selectBrands";
//车辆车系
maintenancePort.carSeries = sitUrl + "customerVehicle/selectSeries";
//选择车型
maintenancePort.selectModel = sitUrl + "customerVehicle/selectModel";
//保存爱车
maintenancePort.createMyCar = sitUrl + "customerVehicle/create";
//我的爱车
maintenancePort.myCarList = sitUrl + "customerVehicle/list";
//爱车详情
maintenancePort.myCarDetail = sitUrl + "customerVehicle/detail";
//订单列表
maintenancePort.orderList = sitUrl + "maintainOrder/list";
//订单详情
maintenancePort.orderDetail = sitUrl + "maintainOrder/detail";

var current = 1;
var loadingIcon = $("#loading");
var loadFlag;
function bm_api() {
    var t = this;
    var fn = arguments[0];
    var requireUrl = arguments[1] ? (t + createParame.call(arguments[1])) : t;
    var loadType = arguments[2];

    function createParame() {
        var p = '';
        for (var i in this) {
            p += '&' + i + '=' + this[i] + '';
        }
        return p;
    }

    $.ajax({
        type: "GET",
        url: requireUrl,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        beforeSend: function () {
            if (typeof loadType == "undefined") {
                loadFlag = false;
            }
            loadingIcon.show();
        },
        success: function (data) {
            //console.log(data.data);
            if (typeof loadType == "undefined") {
                if (data.success) {
                    if (data.data.length || isNotEmptyObj(data.data)) {
                        fn(data);
                        loadFlag = true;
                    } else {
                        if (current == 1) {
                            fn(data);
                        }
                        loadFlag = false;
                    }
                } else {
                    fn(data);
                    successPop("warning_icon", data.msg, 1000);
                }
            } else {
                fn(data);
            }

            loadingIcon.hide();

        }
    });
}

function scrollLoading(fn) {
    loadFlag = true;
    window.onscroll = function () {
        //console.log("scrollLoadFlag:" + loadFlag, current);
        var s_t = document.documentElement.scrollTop || document.body.scrollTop;
        var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (s_t + winH + 150 >= doc_h && loadFlag) {
            current++;
            fn();
        }
    }
}


var position_option = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 1000
};
var lat = "", lng = "";
var getCurrentLatLon = function (callbackFn) {
    navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, position_option);
    // lat = 30.2634315803;
    // lng = 120.1568070739;
    function getPositionSuccess(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        //alert( "您所在的位置： 纬度" + lat + "，经度" + lng );
        typeof  callbackFn == "function" && callbackFn();
    }

    function getPositionError(error) {
        var result;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                result = "您拒绝了使用位置共享服务，查询已取消"
                break;
            case error.POSITION_UNAVAILABLE:
                result = "获取位置信息失败"
                break;
            case error.TIMEOUT:
                result = "连接超时，请重试"
                break;

        }
        typeof  callbackFn == "function" && callbackFn();
        //alert(result)

    }
}


//搜索模块
var searchFlag = false;
var hisFlag = true;
var searchCount = 0;
var search = search || {};
var searchDom = $('.search_module');
var searchBtn = $('.search_btn');
var searchIpt = $('.search_ipt');
var searchCancel = $('.cancel_search');
var searchHistDom = $('.sea_history');
var clearHist = $('.clear_his');
var searchTop = $('.sea_top');
var searchBot = $('.sea_bot');
var searchHisArr = [];
searchBtn.on('click', function () {
    searchDom.show();
    searchBot.show();
    uiFix(event);
})
//取消
searchCancel.on('click', function () {
    //console.log(searchCount);
    searchShopName = "";
    if (searchFlag) {
        doEachSearch();
    }
    searchDom.hide();
    searchHistDom.hide();
    $('.his_list').empty();
    searchFlag = false;
    hisFlag = true;
    uiAuto();
})
searchIpt.on('focus', function () {
    if (localStorage.shopSearchHistory) {
        searchHistshow(JSON.parse(localStorage.shopSearchHistory));
    }
    hisFlag = false;
})

searchIpt.on('blur', function () {

})

function searchHistshow(his) {
    searchBot.show();
    searchHistDom.show();
    $('.his_list').empty();
    for (var i = 0; i < his.length; i++) {
        $('.his_list').append('<li><a href="javascript:void(0)" >' + his[i] + '</a></li>');
    }
}


clearHist.on('click', function () {
    searchHistDom.hide();
    $('.his_list').empty();
    localStorage.removeItem('shopSearchHistory');
    searchHisArr = [];
})
searchHistDom.on("click", "a", function () {
    searchShopName = $(this).html();
    searchIpt.val(searchShopName);
    $('#search_form').submit();

})

$('#search_form').submit(function () {
    searchShopName = $.trim(searchIpt.val());
    $(".bm_shop_list").empty();
    doEachSearch();
    searchBot.hide();
    searchIpt.blur();
    uiAuto();
    pushHisSearch(searchShopName);
    searchFlag = true;
    return false;

})

function pushHisSearch(val) {
    if (val != "") {
        searchHisArr.push(val);
        localStorage.shopSearchHistory = JSON.stringify(unique(searchHisArr));
    }
}
function unique(arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

function uiFix(event) {
    event.preventDefault();
    $('body').addClass("uiFix");
}
function uiAuto() {
    document.body.removeEventListener('touchmove', uiFix);
    $('body').removeClass("uiFix");
}
//搜索模块

var allCountry = "全国省市";
var currentProvince = "", currentCity = "", currentSortTypeTxt = "";
var scviSid = sessionStorage.scviSid ? sessionStorage.scviSid : "";
var memberSid = sessionStorage.memberSid ? sessionStorage.memberSid : "";
//var memberSid = "78f2cbd64ef5498aba07b7cb2d23114e";
var searchShopName = $.trim(searchIpt.val());
var currentSortTypeVal = "";
var currProvIdx = 0;//当前省份索引;
var currentCityIdx = 0;//城市索引


if ($('.select_module').length) {
    var provinceScroll = scrollMe('.area_l');
    var cityScroll = scrollMe('.area_r');
    /*条件筛选*/
    var citiesArr = [[]];
    pageType = $('.select_module').data('type');
    var paramIds = pageType == "adviser" ? [401, 402, 403, 404] : [401, 402, 403];

    function getConfigParamsList() {
        //lat = typeof lat == "undefined" ? "" : lat;
        //lng = typeof lng == "undefined" ? "" : lng;
        bm_api.call(
            maintenancePort.getConfigParams,
            getConfigParams,
            {
                "paramIds": paramIds,
                "lat": lat,
                "lng": lng
            },
            false
        );
        function getConfigParams(data) {
            var provinceData = data.data.maintainLocation;
            var sortTypeData = pageType == "adviser" ? data.data.consultantSort : data.data.maintainPackageSort;

            currentCity = data.extras.currentCity;
            currentSortTypeTxt = data.extras.sortType;

            /*地址*/

            $.each(provinceData, function (i, item) {
                i == 0 ? cls = "condition" : cls = "";
                // ' + cls + '
                $('.province_list').append('<button id="province_' + i + '" class="province ' + cls + '">' + item.province + '</button>')
                i != 0 && citiesArr.push(item.cityList)
            })
            provinceScroll.refresh();
            //console.log(citiesArr);

            //默认选中高亮
            if (currentCity == allCountry) {
                $('.province').eq(0).addClass("curr sel");
                currentProvince = allCountry;
            } else {
                $.each(citiesArr, function (i, cityArr) {
                    $.each(cityArr, function (j, city) {
                        if (city == currentCity) {
                            currentCityIdx = i + "_" + j;
                            currProvIdx = i;
                            $('.city_list').empty();
                            $.each(citiesArr[currProvIdx], function (k, item) {
                                $('.city_list').append('<button id="city_' + currProvIdx + '_' + k + '" data-id="' + i + '_' + k + '" class="city condition">' + item + '</button>');
                            })

                            $("#city_" + currentCityIdx).addClass("curr");
                            cityScroll.scrollToElement($("#city_" + currentCityIdx)[0], 300);
                            provinceScroll.scrollToElement($('.province_list button').eq(currProvIdx)[0], 300);
                            $('.province').eq(currProvIdx).addClass("curr").siblings().removeClass('curr');
                            currentProvince = $('.province_list button').eq(currProvIdx).html();
                            return;
                        }
                    })
                })
            }
            $('#location').html(currentCity);
            $('#sort_by').html(currentSortTypeTxt);


            /*排序*/

            $.each(sortTypeData, function (i, item) {
                //i == 0 ? cls = " curr" : cls = "";
                //' + cls + '
                if (item.value == currentSortTypeTxt) {
                    cls = "curr"
                    currentSortTypeVal = i + 1;
                } else {
                    cls = "";
                }
                $('.sort_list').append('<button data-type="' + item.key + '" class="sort_by condition ' + cls + '">' + item.value + '</button>')
            })

            doEachSearch();
        }

    }

    getCurrentLatLon(getConfigParamsList);
}

function doEachSearch() {
    $('.data_wrap').empty();
    current = 1;
    switch (pageType) {
        case "package":
            packageFn();
            break;
        case "shop":
            shop();
            break;
        case "adviser":
            consultantList();
            break;
        case "sele_shop":
            organList();
    }
}

//筛选下拉层
var k = 0;
$('.sm_hd_item').on("click", function () {
    var i = $(this).index();
    var smBdItem = $('.sm_bd_item').eq(i)
    if ($('.toggle_down').length) {
        if (k == i) {
            smBdItem.removeClass('toggle_down');
            hideUiMask();
        } else {
            var siblingsItem = smBdItem.siblings();
            siblingsItem.removeClass('toggle_down');
            smBdItem.toggleClass('toggle_down');
            //siblingsItem[0].addEventListener("webkitTransitionEnd",EndTransitionEnd,false);
            showUiMask();
        }
    } else {
        smBdItem.addClass("toggle_down");
        showUiMask();
    }


    $(this).find('.w_9_arr').toggleClass('toggle_arr');
    $(this).siblings().find(".w_9_arr").removeClass("toggle_arr");

    $('.city_list').empty();
    $.each(citiesArr[currProvIdx], function (k, item) {

        $('.city_list').append('<button id="city_' + currProvIdx + '_' + k + '" data-id="' + currProvIdx + '_' + k + '" class="city condition">' + item + '</button>');

    })
    if (currentCityIdx != 0) {
        $("#city_" + currentCityIdx).addClass("curr");
        cityScroll.refresh();
        cityScroll.scrollTo(0, 0, 0, IScroll.utils.ease.quadratic);
        cityScroll.scrollToElement($("#city_" + currentCityIdx)[0], 300);
    }
    if ($('.province_list button').eq(currProvIdx).length) {
        provinceScroll.scrollToElement($('.province_list button').eq(currProvIdx)[0], 300);
    }
    $('.province').eq(currProvIdx).addClass("curr").siblings().removeClass('curr');

    k = i;
})


$(".sm_bd_item").on("click", "button", function () {
    $(this).addClass("curr").siblings().removeClass("curr");
    /*if ($(this).hasClass('province')) {

     }*/
})
//点击省份
$('.province_list').on("click", ".province", function () {
    var i = $(this).index();
    if ($(this).hasClass('condition')) {
        currentProvince = allCountry;
        currProvIdx = 0;
        currentCity = allCountry;
        currentCityIdx = 0;
    }
    $('.city_list').empty();
    $.each(citiesArr[i], function (j, item) {
        $('.city_list').append('<button id="city_' + i + '_' + j + '" data-id="' + i + '_' + j + '" class="city condition">' + item + '</button>');

    })
    cityScroll.refresh();
    if ($("#city_" + currentCityIdx).length) {
        $("#city_" + currentCityIdx).addClass("curr");
        cityScroll.scrollToElement($("#city_" + currentCityIdx)[0], 300);
    } else {
        cityScroll.scrollTo(0, 0, 0, IScroll.utils.ease.quadratic);
    }

    if ($(this).index() == 0) {
        $('#location').html($(this).html());
        $(this).addClass('sel');
        currProvIdx = 0;
        currentCityIdx = 0;
    }
})

//选取城市
$('.city_list').on("click", "button", function () {
    var city = $(this).html();
    $(this).addClass('curr');
    $('#location').html(city);
    $('.province_list button').first().removeClass('sel');
    currentCity = city;
    currentCityIdx = $(this).data("id");

    currentProvince = $('.province.curr').html();
    currProvIdx = $('.province.curr').index();

});
//选取排序规则
$('.sort_list').on("click", "button", function () {
    $(this).addClass('curr');
    $('#sort_by').html($(this).html());
    currentSortTypeVal = ($(this).data('type'));

});

//点击条件查询
$('.sm_bd_item').on("click", ".condition", function () {
    doEachSearch();
    intiAllStatus();
});

//做保养判断是否有选中爱车
$('.top_menu li').last().find("a").on("click", function () {
    if (!sessionStorage.scviSid) {
        require(["custVehicle"], function (custVehicle) {
            custVehicle.newVehicle(staticUrl+"bm_maintain.html");
        });
        return false;
    }

})
/*遮罩点击*/
uiMask.on("click", function () {
    $('.error_layer').hide();
    intiAllStatus();
})

var intiAllStatus = function () {
    $('.sm_bd_item').removeClass("toggle_down");
    hideUiMask();
    $('.w_9_arr').removeClass('toggle_arr');
}

function iScrollClick(){    
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;  
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent)); 
    if (/Silk/i.test(navigator.userAgent)) return false;    
    if (/Android/i.test(navigator.userAgent)) {  
        var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);   
        return parseFloat(s[0]+s[3]) < 44 ? false : true;
    }
}

function scrollMe(id, dir) {
    $(id).find('.iScrollVerticalScrollbar').remove();
    var scrollX, scrollY;
    if (dir == "horizon") {
        scrollX = true;
        scrollY = false;
    } else {
        scrollX = false;
        scrollY = true;
    }
    if (typeof IScroll != "undefined") {
        return new IScroll(
            id,
            {
                // click: iScrollClick(),
                scrollX: scrollX,
                scrollY: scrollY,
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: false,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            }
        );
    }


}

function successPop(cls, txt, time) {
    $("body").append('<div class="set_default_success">' +
        '<div class="success_pop UI_animated UI_speed_fast UI_ani_bounceIn">' +
        '<span class="pop_icon ' + cls + '"></span><p>' + txt + '</p></div></div>')

    setTimeout(function () {
        $('.success_pop').addClass('UI_ani_bounceOut');

        setTimeout(function () {
            $('.set_default_success').remove();
        }, 300)
    }, time)
}

function showUiMask() {
    uiMask.addClass("ui_show");
}

function hideUiMask() {
    uiMask.removeClass("ui_show");
}


function noResult(txt) {
    return result = '<li id="no_result" class="no_result"><div class="no_result_pic"></div><p>' + txt + '</p></li>';
}
function TransformEnd(obj, callback) {
    obj[0].addEventListener("webkitTransitionEnd", callback());
}
function isNotEmptyObj(obj) {
    for (var i in obj) {
        return true;
    }
    return false;
}


//读cookie
var getCookie = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    } else {
        return null;
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
//获取URL 参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
function request() {
    var url = location.search
    var theRequest = new Object()
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1])
        }
    }
    return theRequest;
}

function createScore(score) {
    var scroeHtml = '';
    var re = /^[0-9]*[1-9][0-9]*$/;
    for (var i = 1; i < 6; i++) {
        if (re.test(score)) {
            if (i <= score) {
                scroeHtml += '<span class="level level_' + i + '"><i class="full"></i></span>';
            } else {
                scroeHtml += '<span class="level level_' + i + '"><i></i></span>';
            }
        } else {
            if (i <= Math.floor(score)) {
                scroeHtml += '<span class="level level_' + i + '"><i class="full"></i></span>';
            } else if (i == Math.ceil(score)) {
                scroeHtml += '<span class="level level_' + i + '"><i style="width:' + (score - Math.floor(score)) * 100 + '%"></i></span>';
            } else {
                scroeHtml += '<span class="level level_' + i + '"><i></i></span>';
            }
        }


    }


    return scroeHtml;

}


/*搜索*/
var his = [];
localStorage.searchHistory ? getLocal() : setLocal();

function getLocal() {
    var str = localStorage.searchHistory;
    his = JSON.parse(str);
    var html = '';
    $.each(his, function (i, item) {
        html += '<li>' + item + '</li>'
    })
    $('.search_main>ul').append(html)
}

function setLocal() {
    $('.search_main').hide()
    localStorage.searchHistory = JSON.stringify(his);
}

function isRepeat(data) {
    var flag = false, len = his.length;
    for (var i = 0; i < len; i++) {
        if (his[i] == data) {
            flag = true;
        }
    }
    return flag;
}

var search = {
    show: function () {
        $('.search').click(function () {
            $('#search').show();
        })
    },
    searHistory: function () {
        $('.search_main>ul>li').click(function () {
            var _parma = $(this).text();
            search.searPort(_parma)
        })
    },
    searSubmit: function () {
        $('#search_top').submit(function () {
            var _parma = $('#con_name').val();
            search.searPort(_parma)
            return false;
        })
    },
    clear: function () {
        $('.clearHis').click(function () {
            localStorage.removeItem('searchHistory')
            his = []
            $('.search_main>ul').remove()
            $('.search_main').hide()
        })
    },
    searPort: function (parma) {
        if (!isRepeat(parma)) {
            his.push(parma)
        }
        $('#search').css('height', 'auto')
        setLocal()
        $('.search_main').hide()
        $('#consultant_list').html('')
        searchConsultant(parma)
    },
    init: function () {
        this.show()
        this.searHistory()
        this.searSubmit()
        this.clear()
    }
}
search.init()