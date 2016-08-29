function ui_fix() {
    $("body").addClass('ui_fix');
}

function ui_auto() {
    $("body").removeClass('ui_fix');
}
function preventScroll(event) {
    event.preventDefault();

}
var getCurrentLatLon = function (callback) {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                if (typeof callback == 'function') {
                    callback(true, null, {latitude: position.coords.latitude, longitude: position.coords.longitude});
                }
            },
            function (err) {
                var errMsg;
                switch (err.code) {
                    case 1:
                        errMsg = "位置服务被拒绝。";
                        break;
                    case 2:
                        errMsg = "暂时获取不到位置信息。";
                        break;
                    case 3:
                        errMsg = "获取位置超时。";
                        break;
                    default:
                        errMsg = "未知错误。";
                        break;
                }
                if (typeof callback == 'function') {
                    callback(false, errMsg);
                }
            },
            {enableHighAccuracy: false, timeout: 1000, maximumAge: 2000}
        );
    } else {
        callback(false, "该浏览器不支持地理定位");
    }
};

var CLICK = "click";
var UA = window.navigator.userAgent;
if (/iphone|iPod|ipad|itouch|ios|android|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase())) {
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

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}


/*$(document).bind("touchstart", function() {
    $('.top_pop').removeClass("show_pop");
});
$('.top_nav').bind("touchstart", function(e) {
    $('.top_pop').toggleClass("show_pop");
    e.stopPropagation();
});
$('.top_pop').bind("touchstart", function(e) {
    e.stopPropagation();
});*/

var searcheType = $('#search_type .curr a').data("searchtype");
/*品牌选车*/
if ($('#brand_list').length) {
    var brandListWrap = $('#brand_list');
    $.ajax({
        type: "GET",
        url: "http://wap.autostreets.com/replacement/selectBrands",
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        scriptCharset: "GBK",
        jsonpCallback: "getCarBrand",
        cache: false,
        success: function (data) {
            var result = data.data;
            brandListWrap.empty();
            $.each(result, function (i, brand) {
                if (!$('#' + brand.firstPinyin.toLowerCase() + "_dt").length) {
                    brandListWrap.append('<dl>' +
                        '<dt id="' + brand.firstPinyin.toLowerCase() + "_dt" + '">' + brand.firstPinyin + '</dt>' +
                        '<dd>' +
                        '<ul id=' + brand.firstPinyin.toLowerCase() + '_ul' + '></ul>' +
                        '</dd>' +
                        '</dl>')
                }
                $('#' + brand.firstPinyin.toLowerCase() + '_ul').append('<li data-brand="' + brand.brand + '"><img onerror="this.src=\'http://img.autostreetscdn.com/m/build/1.00/images/new_mall/no_pic.jpg\'" src="' + "http://img.autostreetscdn.com/" + brand.logoUrl + '"  alt=""><p>' + brand.brand + '</p></li>')

            })

        }
    });
    var seriesList = $("#series_list");
    brandListWrap.delegate("li", CLICK, function () {

        //var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        //currentPosition==0?serList.css("top",".4949rem"):serList.css("top","0");
        seriesList.addClass("show");
        $('html,body').css("overflow", "hidden");
        document.body.addEventListener('touchmove', preventScroll);
        $("#series_list").find('ul').empty();
        //getSeries($(this).data("brand"));

        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/replacement/selelctSeries?brand=" + $(this).data('brand'),
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getSeries",
            cache: false,
            success: function (data) {
                $('#loading').hide();
                if (data.success) {
                    if (data.data) {
                        $(data.data).each(function (index, obj) {
                            var seriesUrl = "http://img.autostreetscdn.com/m/build/1.00/images/xj_no_pic.jpg";
                            if (obj.seriesUrl) {
                                seriesUrl = "http://images.autostreets.com/" + obj.seriesUrl;
                            }
                            var html = "<li>"
                                    //search_result.html?series=" + encodeURI(obj.series) + "&brand=" + obj.automaker + "
                                + "<a href='###' data-series='" + encodeURI(obj.series) + "' data-brand='" + obj.automaker + "'><img src='" + seriesUrl + "' width='105' height='70' alt=''>"
                                + "<h3>" + obj.automaker + obj.series + "</h3>"
                                + "<p>" + obj.priceRange + "</p>"
                                + "</a>"
                                + "</li>";
                            seriesList.find("ul").append(html);
                        });

                    }
                } else {
                    $(".error_txt").text(data.msg);
                    validate.show();
                }
            }
        });

        $('#series_list').delegate('a', CLICK, function () {
            window.location.href = siteurl + "new_mall/search_result.html?searchType=1&brand=" + $(this).data('brand') + "&series=" + $(this).data('series');
        });
    });

    /* var getSeries = function(brand) {

     };
     */
    /*字母索引*/
    $('.letter_index a').css("lineHeight", $('.letter_index a').height() + "px")[CLICK](function () {
        var targetElm = $('#' + $(this).attr('href').replace('#', '') + '_dt');
        if (targetElm.length) {
            var target = targetElm.offset().top;
            window.scrollTo(window.scrollX, target - $('header').height());
        }
        return false;
    });
    $('#brand_list').swipe(function () {
        seriesList.removeClass("show");
        $('html,body').css("overflow", "auto");
        document.body.removeEventListener('touchmove', preventScroll);
        setTimeout(function () {
            seriesList[0].scrollTop = 0;
        }, 300)
    });

    $(".series_list").swipeRight(function () {
        seriesList.removeClass("show");
        $('html,body').css("overflow", "auto");
        document.body.removeEventListener('touchmove', preventScroll);
        setTimeout(function () {
            seriesList[0].scrollTop = 0;
        }, 300)
    });

    function touchScroll(id) {
        if ("ontouchstart" in document) {
            var el = document.getElementById(id);
            var scrollStartPos = 0;
            document.getElementById(id).addEventListener("touchstart", function (event) {
                scrollStartPos = this.scrollTop + event.touches[0].pageY;
//                event.preventDefault();
            }, false);
            document.getElementById(id).addEventListener("touchmove", function (event) {
                this.scrollTop = scrollStartPos - event.touches[0].pageY;
//                event.preventDefault();
            }, false);
        }
    }

    touchScroll("series_list");

}

/*条件选车*/
if ($('.search_condition').length) {
    $('#car_type_list li div,#capacity li a')[CLICK](function () {
        var _this = $(this);
        $(this).toggleClass("selected");
    });
    $('#car_value li a')[CLICK](function () {
        $(this).toggleClass('selected');
        $(this).parent().siblings().find("a").removeClass('selected');
        $(this).siblings("a").removeClass('selected');
    });
    /*点击搜索*/
    $('.search_btn')[CLICK](function () {
        var categoryArr = [];
        var sweptVolumeArr = [];
        var minPrice = "", maxPrice = "";
        minPrice = $('#car_value .selected').data("carvalue") ? $('#car_value .selected').data("carvalue").split(",")[0] : "";
        maxPrice = $('#car_value .selected').data("carvalue") ? $('#car_value .selected').data("carvalue").split(",")[1] : "";

        $("#car_type_list .selected").each(function () {
            categoryArr.push($(this).data("cate"))
        });
        $("#capacity .selected").each(function () {
            sweptVolumeArr.push($(this).data("capacity"))
        });
        window.location.href = siteurl + "new_mall/search_result.html?searchType=2" + "&category=" + categoryArr + "&sweptVolume=" + sweptVolumeArr + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice;

    });
    /*重置筛选条件*/
    $('.reset_btn')[CLICK](function () {

        $('.selected').removeClass("selected");
    });
}


/*加载搜索结果*/
if ($('#search_result').length) {
    var resultWrap = $('#search_result');
    var length = 10;
    var current = 1;
    var loadingIcon = $('#loading');
    var loadingText = $('.loadMoreText');
    var loadFlag = true;
    var firstRequestFlag = true;

    var setTitle = function (title) {
        $('header section').append(title);
    };
    GetQueryString("searchType") == "1" ? setTitle(UrlDecode(GetQueryString("brand"))) : setTitle("搜索结果");
    var loadCarList = function () {
        if (resultWrap.find('li').length && resultWrap.find('li').length < 10) {
            loadFlag = false;
            return;
        }
        if (!loadFlag) return;
        loadFlag = false;
        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/replacement/findModels",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getCarList",
            cache: false,
            data: {
                searchType: GetQueryString("searchType"),
                category: GetQueryString("category"),
                sweptVolume: GetQueryString("sweptVolume"),
                current: current,
                brand: GetQueryString("brand"),
                series: GetQueryString("series"),
                minPrice: GetQueryString("minPrice"),
                maxPrice: GetQueryString("maxPrice")
            },
            beforeSend: function () {
                loadingIcon.show();
                loadingText.show();
            },
            success: function (data) {
                var result = data.data;
                loadingIcon.hide();
                loadingText.hide();
                firstRequestFlag && resultWrap.empty();
                if (!result.length) {
                    if (firstRequestFlag) {
                        //第一次请求，如果数据为0，则显示无 符合要求的车辆
                        resultWrap.append('<div class="no_data"><img src="http://img.autostreetscdn.com/m/build/1.00/images/new_mall/xj_no_pic.jpg" alt=""/><p>非常抱歉，无符合要求的车辆</p><span>建议您扩大搜索范围</span></div>');
                    }
                    loadFlag = false;
                    return;
                }

                $.each(result, function (i, item) {
                    var mdYear = item.mdYear;
                    if (!$('h2#mdYear' + mdYear).length) {
                        resultWrap.append('<h2 class="hd" id=mdYear' + mdYear + '>' + mdYear + '款</h2><ul id="list' + mdYear + '"></ul>');
                    }

                    $('#list' + mdYear).append('<li data-sid="' + item.sid + '">' +
                        '<img onerror="this.src=\'http://img.autostreetscdn.com/m/build/1.00/images/new_mall/xj_no_pic.jpg\'" src="' + imgurl + item.modelPic + '" alt="">' +
                        '<div class="desc"><p>' + item.selledName + '</p><span>' + item.modelPrice + '万元</span></div>' +
                        '<p class="merchat">' + item.orgNum + '家经销商</p>' +
                        '</li>');
                });

                loadFlag = true;
                firstRequestFlag = false;
            }
        })
    };

    //滚动加载
    window.onscroll = function () {
        var s_t = document.documentElement.scrollTop || document.body.scrollTop;
        var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (s_t + winH + 100 >= doc_h && loadFlag) {
            current += 1;
            loadCarList();
        }
    };
    loadCarList();
    //跳转至车辆详情页
    resultWrap.delegate('li', CLICK, function () {
        var sid = $(this).data("sid");
        window.location.href = siteurl + "new_mall/shops.html?modelSid=" + sid;
    })
}


/*
 @车辆详情页
 @shop_page;
 */
if ($('#shops').length) {
    var picThumbWrap = $('.pic_thumbs');
    var tab_top;
    var likepages = [];
    var modelSid = GetQueryString("modelSid");
    var thumbListHArr = [];
    var img_w, img_h;
    var thumbHeight;
    $("#cityList").empty().append("<option value='全国门店'>全国门店</option>");
    var getVehicle = function () {
        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/replacement/getVehicleDetails?modelSid=" + modelSid,
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getVehicleDetails",
            cache: false,
            success: function (data) {
                if (data.success) {
                    if (data.data) {
                        var result = data.data;
                        var picList = '';
                        sessionStorage.carPic = result.picList;
                        thumbListHArr = result.picList;
                        $(".title p span").text(result.modelPrice + "万元");
                        $(".title h3").text(result.selledName);
                        insertTitle(result.selledName);
                        /*九宫格*/
                        if (result.picList) {
                            if (result.picList.length <= 1) {
                                picThumbWrap.hide();
                            }

                            if (result.picList.length <= 10) {
                                $('.loadMorePic').hide();
                            }

                            $.each(result.picList, function (i, pic) {
                                if (i == 0) {
                                    var Img = new Image();
                                    Img.src = imgurl + pic;
                                    Img.onload = function () {
                                        var w = document.documentElement.clientWidth || document.body.clientWidth;
                                        $('.prod_pic').height(w * this.height / this.width);
                                        img_w = this.width;
                                        img_h = this.height;
                                    };
                                    //canvasDrawImg(imgurl+pic,$('#car_big_pic'));
                                    $('.prod_pic').empty().append('<img class="prod_big_pic" src="' + imgurl + pic + '" alt="">');

                                    setTimeout(function () {
                                        $('.prod_big_pic').css('opacity', 1);
                                    }, 300)
                                } else {
                                    if (i <= 9) {
                                        var list = '<li class="thumbs"><p><img src="' + imgurl + pic + '" alt=""></p></li>';
                                        picThumbWrap.find("ul").append(list);

                                    }


                                }
                            });
                            thumbHeight = Math.ceil($('.thumbs').width() / 1.2972973);
                            $('.thumbs').height(thumbHeight);

                        } else {
                            picThumbWrap.hide();
                            //$('.prod_pic').css({"height":winW*3/4,"width":100+"%"})
                        }

                        tab_top = $('.dealer_tab').offset().top;
                        /*门店地址*/
                        if (data.data.cityList && data.data.cityList.length) {

                            $(data.data.cityList).each(function (index, obj) {
                                $("#cityList").append("<option value='" + obj + "'>" + obj + "</option>");
                            });
                        }
                        if (data.data.smallPic) {
                            $('.car_img').attr("src", imgurl + data.data.smallPic);
                        } else {
                            $('.car_img').attr("src", "//img.autostreetscdn.com/m/build/1.00/images/xj_no_pic.jpg");
                        }

                        $('.shop_info_wrap .hd p').html(data.data.vehicleTitle);
                        $('.shop_info_wrap .hd span').html(data.data.vehicleDesc);
                    }
                } else {
                    $(".error_txt").text(data.msg);
                    validate.show();
                }
            }
        });
    };
    getVehicle();

    //加载更多图片
    var loadCount = 1;
    var loadMorePic = function () {
        loadCount++;
        var cnt = loadCount * 9 < thumbListHArr.length ? loadCount * 9 : thumbListHArr.length - 1;
        for (var i = 9 * (loadCount - 1) + 1; i <= cnt; i++) {
            var list = '<li class="thumbs"><p><img src="' + imgurl + thumbListHArr[i] + '" alt=""></p></li>';
            picThumbWrap.find("ul").append(list);
        }
        $('.thumbs').height(thumbHeight);
        if (thumbListHArr.length - 1 <= picThumbWrap.find("li").length) {
            $('.loadMorePic').hide();
        }

    };
    $('.loadMorePic').click(function () {
        loadMorePic();
    });


    //获取车型所在门店
    var isAuthentication = "Y";
    var Y_current = 1;
    var N_current = 1;
    var Y_loadFlag = true;
    var N_loadFlag = true;
    var loading = $('#loading');
    var renzhengWrap = $('.renzheng_dealer');
    var jiamengWrap = $('.jiameng_dealer');
    var tab_inner = $('.tab_inner p');
    var city = "";
    var lat = "", lng = "";
    var isScroll = false;
    var getFranchiser = function (isAuthentication, getFranchiserCallBack, modelSid, city, lat, lng) {
        var url = "http://wap.autostreets.com/replacement/selectFranchiser";
        var flag = isAuthentication == 'Y' ? Y_loadFlag : N_loadFlag;
        //var Y_isFirstReq=true;
        //var N_isFirstReq=true;
        if (!flag) return;
        //loadFlag = false;
        var hasRenZheng = true;
        var hasJiaMeng = true;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: getFranchiserCallBack,
            cache: false,
            data: {
                modelSid: modelSid,
                isAuthentication: isAuthentication,
                current: isAuthentication == "Y" ? Y_current : N_current,
                city: city,
                lat: lat,
                lng: lng
            },
            beforeSend: function () {
                loading.show();
                isAuthentication == "Y" ? Y_loadFlag = false : N_loadFlag = false;
            },
            success: function (data) {
                if (!data.data.length) {
                    if (isAuthentication == "Y") {
                        Y_loadFlag = false;

                    } else {
                        N_loadFlag = false;
                    }
                    loading.hide();
                    return;
                }
                if (data.success) {
                    if (data.extras && data.extras.city) {
                        $(".area_show span").text(data.extras.city);
                        $("#cityList").val(data.extras.city);
                    } else {
                        $(".area_show span").text("全国门店");
                        $("#cityList").val("全国门店");
                    }
                    if (data.data) {
                        $(data.data).each(function (index, obj) {
                            var html = "";
                            if (isAuthentication == "N") { //是否非认证商户
                                html = "<li data-newMallOrgan='" + JSON.stringify(obj) + "' data-sid='" + obj.sid + "' data-type='" + obj.type + "' class='jiameng'>";
                                if (!$('.jiameng_tab').length) {
                                    //tab_inner.append('<a class="jiameng_tab active" href="javascript:void(0)">加盟经销商</a>');
                                }
                                hasJiaMeng = true;
                            } else {
                                html = "<li data-newMallOrgan='" + JSON.stringify(obj) + "' data-sid='" + obj.sid + "' data-type='" + obj.type + "' data-promTitle='" + obj.promTitle + "' class='renzheng'>";
                                if (!$('.renzheng_tab').length) {
                                    //tab_inner.prepend('<a class="renzheng_tab active" href="javascript:void(0)">认证经销商</a>');
                                }
                                hasRenZheng = true;
                            }

                            html += "<h4>" + obj.companyName + "</h4>";

                            if (obj.promTitle) {
                                html += "<div class='gift cfx'><img src='http://img.autostreetscdn.com/m/build/1.00/images/gift.png' alt=''>"
                                    + "<h5>" + obj.promTitle + "</h5></div>";
                            }

                            html += "<p class='shop_addr'>" + obj.addr + "</p>" + "<p class='shop_tel'>" + obj.telephone + "</p>";

                            if (obj.vendorPrice != null && obj.vendorPrice > 0) {
                                html += "<p class='price'>经销商报价：<span>" + obj.vendorPrice + "</span>万元</p>";
                            }

                            html += "<div class='arrow'></div></li>";

                            isAuthentication == "Y" ? renzhengWrap.append(html) : jiamengWrap.append(html);
                        });
                        if (!renzhengWrap.find("li").length) {
                            hasRenZheng = false;
                        }
                        if (!jiamengWrap.find("li").length) {
                            hasJiaMeng = false;
                        }

                        //console.log(hasRenZheng);
                        //console.log(hasJiaMeng);
                        //console.log(isScroll);


                        if (!isScroll) {
                            if (hasRenZheng && !hasJiaMeng) {
                                $('.renzheng_tab').css("display", "inline-block").addClass("active single_renzheng_tab");
                                $('.jiameng_tab').hide().removeClass("active single_jiameng_tab");
                                renzhengWrap.show();
                                jiamengWrap.hide();
                            }

                            if (!hasRenZheng && hasJiaMeng) {
                                $('.renzheng_tab').removeClass("active single_renzheng_tab").hide();
                                $('.jiameng_tab').css("display", "inline-block").addClass("active single_jiameng_tab");
                                renzhengWrap.hide();
                                jiamengWrap.show();
                            }

                            if (hasRenZheng && hasJiaMeng) {
                                $('.renzheng_tab').css("display", "inline-block").removeClass("single_renzheng_tab").addClass("active");
                                $('.jiameng_tab').removeClass("active single_jiameng_tab").css("display", "inline-block");
                                renzhengWrap.show();
                                jiamengWrap.hide();
                            }
                        }


                    }
                } else {
                    $(".error_txt").text(data.msg);
                    validate.show();
                }
                loading.hide();
                isAuthentication == "Y" ? Y_loadFlag = true : N_loadFlag = true;
                //isAuthentication == "Y" ? Y_isFirstReq = false : N_isFirstReq = false;

            }
        });
    };

    //获取当前位置
    getCurrentLatLon(
        function () {
            if (arguments[0]) {
                if (arguments.length < 3) {
                    getFranchiser("Y", "getFranchiserCallBackY", modelSid, city);
                    getFranchiser("N", "getFranchiserCallBackN", modelSid, city);
                } else {
                    getFranchiser("Y", "getFranchiserCallBackY", modelSid, city, arguments[2].latitude, arguments[2].longitude);
                    getFranchiser("N", "getFranchiserCallBackN", modelSid, city, arguments[2].latitude, arguments[2].longitude);
                    lat = arguments[2].latitude;
                    lng = arguments[2].longitude;
                }
            } else {
                getFranchiser("Y", "getFranchiserCallBackY", modelSid, city);
                getFranchiser("N", "getFranchiserCallBackN", modelSid, city);
                if (arguments[1]) {
                    $(".error_txt").text(arguments[1]);
                    //validate.show();
                }
            }
            isScroll = false;
        }
    );
    $("#configParameters").attr("href", "http://wap.autostreets.com/replacement/toPatameter?modelSid=" + modelSid);

    $(".area").change(function () {
        isScroll = false;
        //isAuthentication = "Y";
        Y_current = 1;
        N_current = 1;
        Y_loadFlag = true;
        N_loadFlag = true;
        renzhengWrap.empty();
        jiamengWrap.empty();
        $(".area_show span").text($(this).val());
        city = $(this).val();
        getFranchiser("Y", "getFranchiserCallBackY", modelSid, city, lat, lng);
        getFranchiser("N", "getFranchiserCallBackN", modelSid, city, lat, lng);

    });

    $("#shop_operation li").on("click", function () {

        var url = $("a", this).attr("href") + "?modelSid=" + modelSid + "&orgSid=" + $("#shop_operation h3").data("sid");
        if (this.id != "giftExist") {
            require(["userUtils"], function () {
                userUtils.login(url);
            });
        } else {
            location.href = url;
        }
        return false;
    });


    /*认证经销商和加盟经销商Tab*/
    $('.dealer_tab').delegate("a", CLICK, function () {
        /* if ($('.dealer_tab').find('a').length == 1) {
         return
         }*/
        var idx = $('.dealer_tab a').index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $('.shops_list').eq(idx).show().siblings('.shops_list').hide();
        isAuthentication = $(this).data('type');

    });
    /*滚动加载*/
    window.onscroll = function () {
        var s_t = document.documentElement.scrollTop || document.body.scrollTop;
        var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
        var flag = isAuthentication == "Y" ? Y_loadFlag : N_loadFlag;
        var callBack = isAuthentication == "Y" ? "getFranchiserCallBackY" : "getFranchiserCallBackN";
        if (s_t + winH + 100 >= doc_h && flag) {
            isScroll = true;
            isAuthentication == "Y" ? Y_current++ : N_current++;
            getFranchiser(isAuthentication, callBack, modelSid, city, lat, lng);

        }
        tab_top = $('.dealer_tab').offset().top;
        if (s_t + $("header").height() >= tab_top) {
            $('.tab_inner').addClass('tab_fixed');
        } else {
            $('.tab_inner').removeClass('tab_fixed');
        }

    };

    $(window).bind('resize', function () {
        var w_w = document.documentElement.clientWidth || document.body.clientWidth;
        tab_top = $('.dealer_tab').offset().top;
        $('.prod_pic').height(w_w * img_h / img_w);
        $('.thumbs').height(Math.ceil($('.thumbs').width() / 1.2972973));
    });
    /*经销商信息*/
    $(".shops_list ").delegate("li", "click", function () {
        localStorage.newMallOrgan = JSON.stringify($(this).data("newmallorgan"));
        var _this = $(this);
        if (_this.parent().hasClass('jiameng_dealer')) {
            return
        }
        showShopInfo(
            _this.find('h4').html(),
            _this.find('.shop_addr').html(),
            _this.find(".shop_tel").html(),
            _this.data("sid"),
            _this.find(".gift")
        );
    });
    var shopInfo = $('.shop_info');
    $('.shop_info_close').click(function () {
        hideShopInfo();
    });
    var showShopInfo = function (shopName, shopAddr, shopTel, sid, gift) {
        likepages = [
            "http://wap.autostreets.com/replacement/inquiry?organSid=" + sid + "&modelSid=" + modelSid,
            "http://wap.autostreets.com/replacement/driverBooking?organSid=" + sid + "&modelSid=" + modelSid,
            "http://wap.autostreets.com/replacement/applyExchange?organSid=" + sid + "&modelSid=" + modelSid,
            "http://wap.autostreets.com/replacement/pay?organSid=" + sid + "&modelSid=" + modelSid,
            "http://wap.autostreets.com/replacement/giftDetails?organSid=" + sid + "&modelSid=" + modelSid
        ];
        //ui_fix();
        shopInfo.find('h3').html(shopName);
        shopInfo.find('.address').html(shopAddr);
        shopInfo.find('.shop_desc .tel').html(shopTel);
        shopInfo.find('ul .tel').attr("href", "tel:" + shopTel);
        if (gift.length) {
            $('.gift_info').css("display", "block");
        } else {
            $('.gift_info').hide();
        }
        $.each(likepages, function (i, item) {
            $('.link_item').eq(i).attr('href', item);
        });
        $('.shop_info').addClass("show_shop_info");
        $(".tipbg").show();

        document.body.addEventListener('touchmove', preventScroll);
    };
    var hideShopInfo = function () {
        ui_auto();
        $('.shop_info').removeClass("show_shop_info");
        $(".tipbg").hide(300);
        document.body.removeEventListener('touchmove', preventScroll);
    };

    $(".tipbg").click(function () {
        hideShopInfo();
        $('.error_layer').hide();
    });

    /*跳转至图片预览页*/
    picThumbWrap.delegate('li', CLICK, function () {
        window.location.href = siteurl + "new_mall/preview.html?idx=" + $(this).index();
    });
}
if ($('#preview').length && sessionStorage.carPic) {
    var w_w = document.documentElement.clientWidth || document.body.clientWidth;
    var picArr = sessionStorage.carPic.split(',');
    var idx = Number(GetQueryString('idx')) + 1;
    //var idx = 2;
    var picThumbWrap = $('.pic_thumbs');
    var thumbListHArr = [];
    var slideHtml = "";
    $('.pic_thumbs ul').empty();
    $('.sub_index .current').html(idx + 1);
    $('.sub_index .count').html(picArr.length);
    for (var i in picArr) {
        if (i == idx) {
            slideHtml += '<li style="-webkit-transform: translate3d(0px, 0px, 0px);width:' + w_w
                + 'px;left:-' + i * w_w + 'px"><img src="' + imgurl + picArr[i] + '" alt=""/></li>';
        } else if (i == idx - 1) {
            slideHtml += '<li style="-webkit-transform: translate3d(' + -w_w + 'px, 0px, 0px);width:' + w_w
                + 'px;left:-' + i * w_w + 'px"><img src="' + imgurl + picArr[i] + '" alt=""/></li>';
        } else {
            slideHtml += '<li style="-webkit-transform: translate3d(' + w_w + 'px, 0px, 0px);width:' + w_w
                + 'px;left:-' + i * w_w + 'px"><img src="' + imgurl + picArr[i] + '" alt=""/></li>';
        }

        if (i < 3) {
            $('.pic_thumbs ul').append('<li class="thumbs" style="margin-top:0"><p><img src="' + imgurl + picArr[i] + '" alt=""><i></i></p></li>');
        } else {
            $('.pic_thumbs ul').append('<li class="thumbs"><p><img src="' + imgurl + picArr[i] + '" alt=""><i></i></p></li>');
        }
    }
    $('#slider').width(w_w * picArr.length).append(slideHtml);
    $('.pic_thumbs li').eq(idx).addClass("hover");

    $('.prod_pic').height(w_w * 3 / 4);
    function Slider(selector, opt) {

        var extend = function (j, k) {
            for (i in k) {
                j[i] = k[i]
            }
            return j;
        };

        var slider = function (selector) {
            this.slider = typeof  selector === "string" ? $(selector) : selector;
            this.w = document.documentElement.clientWidth || document.body.clientWidth;
            this.li = this.slider.find("li");
            this.index = idx;
            this.timer = null;
            this.SetOptions(opt);
            this.onStart = this.option.onStart;
            this.onStop = this.option.onStop;
            this.onFinish = this.option.onFinish;
            this.count = this.li.length;
            this.startX = 0;
            this.startY = 0;
            this.initX = 0;
            this.initY = 0;
            this.finishX = 0;
            this.finishY = 0;
            this.moveLi = [];
            this.posiArr = [];
            this.startTime = 0;
            this.endTime = 0;
            this.init();
        };
        slider.prototype = {
            init: function () {
                this.resizeWin();
                this.setStyle();
                this.resizeWin();
//            this.run();
                ("ontouchstart" in document) && this.touchEvent();


            },
            setStyle: function () {
                var t = this;
                var l_idx = this.index - 1 < 0 ? this.count - 1 : this.index - 1;
                this.li.css({"-webkit-transform": "translate3d(" + this.w + "px,0,0)", "-webkit-transition": "all 0s"});
                this.li.eq(this.index).css({"-webkit-transform": "translate3d(0,0,0)"});
//            this.li.eq(l_idx).css({"-webkit-transform": "translate3d(-" + this.w + "px,0,0)"});

                $.each(this.li, function (i, item) {
                    t.li.eq(i).css({"left": -i * t.w});
                });
                this.setWidth();

            },
            setWidth: function () {
                this.slider.width(this.count * this.w);
                this.li.width(this.w);
            },
            SetOptions: function (opt) {
                this.option = {
                    onStart: function () {
                    },
                    onStop: function () {
                    },
                    onFinish: function () {
                    }
                };
                extend(this.option, opt || {});
            },
            prev: function () {
                this.moveTo.call(this, this.index--, "prev")
            },
            next: function () {
                this.moveTo.call(this, this.index++, "next")

            },
            run: function () {
                var t = this;
                this.timer = setInterval(function () {
                    t.next()
                }, 3000)
            },
            moveTo: function () {
                this.index >= this.count && (this.index = this.count - 1);
                this.index < 0 && (this.index = 0);
                this.move(arguments[1]);
            },
            move: function (dir) {
                var l_idx;
                if (dir == "next") {
                    l_idx = this.index - 1;
                    if (this.index != this.count) {
                        this.li.eq(this.index).css({
                            "-webkit-transition": "all .3s ease-out",
                            "-webkit-transform": "translate3d(0,0,0)"
                        });
                    }


                    this.li.eq(l_idx).css({
                        "-webkit-transition": "all .3s ease-out",
                        "-webkit-transform": "translate3d(-" + this.w + "px,0,0)"
                    });

                } else {

                    this.li.eq(this.index).css({
                        "-webkit-transition": "all .3s ease-out",
                        "-webkit-transform": "translate3d(0,0,0)"
                    });

                    if (this.index + 1 != this.count) {
                        this.li.eq(this.index + 1).css({
                            "-webkit-transition": "all .3s ease-out",
                            "-webkit-transform": "translate3d(" + this.w + "px,0,0)"
                        });
                    }
                    if (!this.index - 1 < 0) {
                        this.li.eq(this.index - 1).css({
                            "-webkit-transition": "all 0s",
                            "-webkit-transform": "translate3d(-" + this.w + "px,0,0)"
                        });

                    }
                }
                setTimeout(this.onFinish(this.index), 300)

            },
            stop: function () {
                clearInterval(this.timer);
                this.onStop();
            },
            resizeWin: function () {
                var t = this;
                var resizeTimer = null;
                $(window).resize(function () {
                    if (resizeTimer) {
                        clearTimeout(resizeTimer)
                    }
                    resizeTimer = setTimeout(function () {
                        t.w = document.documentElement.clientWidth || document.body.clientWidth;
                        t.setStyle();
                    }, 30);
                });

            },
            touchEvent: function () {
                var t = this;
                this.slider.bind("touchstart", function (event) {
                    t.stop();
                    t.moveLi = [];
                    t.posiArr = [0, -t.w, t.w];
                    t.startX = event.touches[0].clientX;
                    t.startY = event.touches[0].clientY;
                    var prev_li = "";
                    var next_li = "";
                    if (t.index - 1 >= 0) {
                        prev_li = t.slider.find("li").eq(t.index - 1);
                    }

                    if (t.index + 1 != t.count) {
                        next_li = t.slider.find("li").eq(t.index + 1);
                    }
                    t.moveLi.push(t.slider.find("li").eq(t.index), prev_li, next_li);
                    t.initX = t.startX;
                    t.initY = t.startY;
                    t.startTime = Date.now();
                    event.preventDefault();
                });

                this.slider.bind("touchmove", function (event) {
                    var endX = event.touches[0].clientX;
                    var endY = event.touches[0].clientY;
                    var absX = endX - t.startX;
                    for (var i in t.moveLi) {
                        var pos = t.posiArr[i] + absX;
                        if (t.moveLi[i]) {
                            t.moveLi[i].css({
                                "-webkit-transition": "all 0s",
                                "-webkit-transform": "translate3d(" + pos + "px,0,0)"
                            })

                        }
                    }

                    t.finishX = endX;
                    t.finishY = endY;
                    event.preventDefault();

                });
                this.slider.bind("touchend", function (event) {
                    for (var i in t.moveLi) {
                        t.moveLi[i] && t.moveLi[i].css({
                            "-webkit-transform": "translate3D(" + t.posiArr[i] + "px,0,0)",
                            "-webkit-transition": ".3s"
                        });
                    }
                    bindEvent(t.initX, t.finishX);
                    t.initX = 0;
                    t.finishX = 0;
//                setTimeout(t.run(), 800)
                });

                var bindEvent = function () {
                    var disX = t.finishX - t.initX;
                    var disY = t.finishY - t.initY;
                    t.endTime = Date.now();
                    var disTime = t.endTime - t.startTime;
                    if (t.finishX == 0 || Math.abs(disY) >= Math.abs(disX) || (disTime > 600 && Math.abs(disX) / t.w < 0.6)) return;
                    disX > 0 ? t.prev() : t.next();
                }
            }
        };


        return new slider(selector, opt);
    }

    Slider('#slider', {
        onStart: function () {
        },
        onStop: function () {
        },
        onFinish: function (i) {
            $('.sub_index .current').html(i + 1);
        }
    });



}
function ui_fix() {
    $("body").addClass('ui_fix');
}

function ui_auto() {
    $("body").removeClass('ui_fix');
}


function preventScroll(event) {
    event.preventDefault();

}

function UrlDecode(zipStr) {
    var uzipStr = "";
    for (var i = 0; i < zipStr.length; i++) {
        var chr = zipStr.charAt(i);
        if (chr == "+") {
            uzipStr += " ";
        } else if (chr == "%") {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                uzipStr += decodeURI("%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                i += 8;
            } else {
                uzipStr += AsciiToString(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            uzipStr += chr;
        }
    }

    return uzipStr;
}

function StringToAscii(str) {
    return str.charCodeAt(0).toString(16);
}


/*title 处理*/
var _daq = _daq || [];
function insertTitle(title){
    var t=document.createElement("title")
    t.innerHTML=title;
    var l = document.getElementsByTagName('link')[0];
    l.parentNode.insertBefore(t, l);

    _daq.push(['_setAccount', 'wap']);
    (function() {
        var da = document.createElement('script');
        da.type = 'text/javascript';
        da.async = true;
        da.src = ('https:' == document.location.protocol ? 'https://da' : 'http://da') + '.autostreets.com/da.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(da, s);
    })();


}
