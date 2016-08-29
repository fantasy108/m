/*车辆品牌,车系START*/
var brandListWrap = $('.iScroll_brand_list');
var seriesListWrap = $('.iScroll_series_list');
var brandList = $('#brand_list');
var seriesList = $('#series_list');
var letterIndex = $('.letter_index');
function carBrands() {
    bm_api.call(
        maintenancePort.carBrands,
        getCarBrands
    );
    function getCarBrands(data) {
        var result = data.data;
        brandListWrap.empty();
        $.each(result, function (i, brand) {
            if (!$('#' + brand.firstPinyin.toLowerCase() + "_dt").length) {
                brandListWrap.append('<dl>' +
                    '<dt  id="' + brand.firstPinyin.toLowerCase() + "_dt" + '">' + brand.firstPinyin + '</dt>' +
                    '<dd>' +
                    '<ul id=' + brand.firstPinyin.toLowerCase() + '_ul' + '></ul>' +
                    '</dd>' +
                    '</dl>');
                letterIndex.append('<a href="javascript:void(0)">' + brand.firstPinyin + '</a>')
            }
            $('#' + brand.firstPinyin.toLowerCase() + '_ul').append('<li data-brandSid="' + brand.sid + '" data-brand="' + brand.brand + '">' +

                '<div class="img_wrap"><img src="' + imgUrl + brand.logoUrl + '" alt=""/></div>' +
                '<p>' + brand.brand + '</p></li>')

        });
        var brandScroll = scrollMe("#brand_list");
        $(".letter_index a").css({
            "lineHeight": $(".letter_index").height() / $(".letter_index a").length + "px",
            height: $(".letter_index").height() / $(".letter_index a").length + "px"
        }).click(function () {
            var i = $(this).index() + 1;
            brandScroll.scrollToElement(document.querySelector('#brand_list dl:nth-child(' + i + ')'), 300);
            return false
        });
    }
}
// var bsid;
// seriesList.bind("swipeRight", function () {
//     seriesList.removeClass("show");
//     bsid = "就是这么任性";
// });
/*获取车系*/
if ($('#bm_complete_car').length) {
    carBrands();
    //var seriesScroll = scrollMe("#series_list");
}

//if (bsid == $(this).data('brandsid')) return;
//seriesList.addClass("show");
if($('#series_list').length){
    bm_api.call(
        maintenancePort.carSeries,
        getCarSeries,
        {
            brandSid: $(this).data('brandsid')
        }
    )
}
function getCarSeries(data) {
    seriesListWrap.empty();
    $.each(data.data, function (i, item) {
        console.log(item);
        var mdBrand = item.brand;
        if (!$('h2#mdBrand' + mdBrand).length) {
            seriesListWrap.append('<div class="hd_wrap"><h2 class="hd" id=mdBrand' + mdBrand + '>' + mdBrand + '</h2></div><ul data-mdBrand="' + mdBrand + '" id="list' + mdBrand + '"></ul>');
        }
        $('#list' + mdBrand).append('<li><a date-brand="'+item.brand+'"data-series="' + item.series + '" href="' + staticUrl + 'bm_complete_car_list.html?seriesSid=' + item.sid + '"></div>' +
            '<div class="img_wrap">' + img(item.seriesUrl) + '</div>' +
            '<h3>' + item.series + '</h3></a></li>');
    });
    // seriesScroll.scrollTo(0, 0, 0, IScroll.utils.ease.quadratic);
    // seriesScroll.refresh();
}

// bsid = $(this).data('brandsid');

// carInfo.brand = $(this).data('brand');
// carInfo.brandLogo = $(this).find('img').prop("src");

seriesList.on("click", "a", function () {
    carInfo = {}
    carInfo.brand = $(this).parent().parent().data('mdbrand');
    carInfo.series = $(this).data('series');
    console.log(carInfo.brand,carInfo.series)
    localStorage.cust_vehicle_info = JSON.stringify(carInfo);
})

/*车型列表*/
function getModelList() {
    var resultWrap = $('#complete_car_list');
    bm_api.call(
        maintenancePort.selectModel,
        getModel,
        {
            seriesSid: GetQueryString('seriesSid'),
            current: 0
        }
    );
    function getModel(data) {
        if (!data.data) {
            return
        };
        $.each(data.data, function (i, item) {
            var mdYear = item.mdYear;
            if (!$('h2#mdYear' + mdYear).length) {
                resultWrap.append('<div class="hd_wrap"><h2 class="hd" id=mdYear' + mdYear + '>' + mdYear + '</h2></div><ul data-mdyear="' + mdYear + '" id="list' + mdYear + '"></ul>');
            }

            $('#list' + mdYear).append('<li data-sid="' + item.sid + '">' +
                '<a data-model="' + item.model + '" data-mdyear="' + mdYear + '" data-sid="' + item.sid + '"   href="' + staticUrl + 'bm_save_my_car.html?modelSid=' + item.sid + '">' +
                '<div class="img_wrap">' + img(item.modelUrl) + '</div>' +
                '<h3>' + item.model + '</h3>' +
                '</a></li>');
        });
    }
}
$('#complete_car_list').on('click', "a", function () {
    carInfo = JSON.parse(localStorage.cust_vehicle_info);
    carInfo.model = $(this).data('model');
    carInfo.mdYear = $(this).data('mdyear');
    localStorage.cust_vehicle_info = JSON.stringify(carInfo);
})
if ($('#complete_car_list').length) {

    getModelList();
}

/*车辆品牌,车系END*/

/*靠谱门店列表*/
function shop() {
    bm_api.call(
        maintenancePort.shopList,
        getShopList,
        {
            "scviSid": scviSid,
            "sortType": currentSortTypeVal,
            "lat": lat,
            "lng": lng,
            "province": currentProvince,
            "city": currentCity,
            "name": searchShopName,
            "current": current
        }
    );
    function getShopList(data) {
        var html = "";
        if (data.data && (data.data.length || isNotEmptyObj(data.data))) {
            $.each(data.data, function (i, item) {
                var package2 = item.maintainPackages ? thisShopPackage(item.maintainPackages) : "";
                /*var isSpecial = item.isFeature ? "special" : "";*/
                var logo = item.brandLogo ? "<img class='brandLogo' src='" + imgUrl + item.brandLogo + "'>" : "";
                var distance = item.distance ? '<div class="distance"><span>' + ((item.distance) / 1000).toFixed(2) + 'km</span></div>' : "";

                html += '<li data-orgSid="' + item.orgSid + '" class="bm_shop">' +
                    '<a class="shop_item_link link" href="' + staticUrl + 'bm_shop_detail.html?orgSid=' + item.orgSid + '">' +
                    '<div class="bm_shop_hd"><div class="img_wrap">' + img(item.photoUrl) +
                    '</div>' +
                    '<div class="bm_shop_r">' +
                    '<h3>' + logo + item.orgNameAbbr + '</h3><div class="stars">' +
                    createScore(item.score) +
                    '</div>' +
                    '<div class="location">' + item.address + '</div>' + distance +
                    '</div></div></a>' + package2 + '</li>';
            })
        } else {
            html = noResult("很抱歉，没有符合条件的门店");
        }

        function thisShopPackage(pack) {
            var html = '<ul class="bm_shop_bd">';
            $.each(pack, function (i, item) {
                //console.log(item);
                html += '<li><a class="package_item_link link" href="' + staticUrl + 'bm_package_detail.html?id=' + item.id + '"><h3>' + item.name + '</h3><p>适用车型：' + item.applicableModels + '</p><span class="fee">&yen;<span>' + item.packagePrice + '</span></span></a></li>';
            });
            html += '</ul>';
            return html;
        }

        $(".bm_shop_list").append(html);


    }
}
if ($('#bm_shop_list').length) {
    scrollLoading(shop);

}


/*门店详情START*/

function shopDetail() {
    bm_api.call(
        maintenancePort.shopDetail,
        getShopDetail,
        {
            orgSid: GetQueryString('orgSid'),
            "lat": lat,
            "lng": lng
        }
    );

    function getShopDetail(data) {
        var result = data.data;
        var distance = result.distance ? $('.bm_shop_r').append('<div class="distance"><span>' + ((result.distance) / 1000).toFixed(2) + 'km</span></div>') : $('.distance').hide();
        var pack = result.maintainPackages;
        var adviser = result.consultantInfos;
        var viewMoreBtn = $('.view_more');
        $(img(result.photoUrl)).appendTo($('.bm_shop_hd .img_wrap'));
        $('.shop_name').html(result.orgNameAbbr);
        $('.shop_time span').html(result.beginTime + "-" + result.endTime);
        $('.shop_description').append(result.description ? result.description.replace(/\r\n/g, "<br/>") : "");
        $('.main_brand').append(result.brand ? result.brand : "所有品牌");


        if (typeof result.tagList == "undefined") {
            $('#service_list').parents('.bm_shop_box').hide();
        } else {
            $('.tel').parent().after(tagListFn());
            $('.service_item').width(winW / 3);
            $('.service_list').width(result.tagList.length * (winW / 3));
            scrollMe('#service_list', "horizon");

        }

        scrollMe('#adviser_list', "horizon");
        if (typeof adviser == "undefined") {
            $('#adviser_list').parent('.bm_shop_box').hide().prev("h2").hide();
        } else {
            $('.adviser_list').append(adviserListFn());
            $('.adviser').width(winW / 3);
            $('.adviser_list').width(result.consultantInfos.length * (winW / 3));
            scrollMe('#adviser_list', "horizon");

        }

        if (!pack.length) {
            $('.package_list').parents(".bm_shop_box").hide();
            $('.package_list').parents().prev("h2").hide();
        } else {
            if (pack.length > 3) {
                viewMoreBtn.css("display", "block");
            } else {
                viewMoreBtn.hide();
            }
            packageListFn();
            viewMoreBtn.on('click', function () {
                packageListFn(true);
            });
        }

        $('.bm_shop_r .stars').append(createScore(result.score));
        $('.map_location').prop("href", "http://wx.autostreets.com/html/map.html?lat=" + result.latitude + "&lng=" + result.longitude + "&name=" + result.orgNameAbbr + "&addr=" + result.address + "").find('p').html(result.address);

        $('.tel').prop("href", "tel:" + result.telephone).find('p').html(result.telephone);

        function tagListFn() {
            var TagHtml = '<div class="bm_shop_box"><div id="service_list"><div class="service_list">';
            $.each(result.tagList, function (i, item) {
                TagHtml += '<span class="service_item"><img src="http://img.autostreetscdn.com/m/build/1.00/images/shop_bm/select.png" alt="">' + item + '</span>';
            })
            TagHtml += "</div></div></div>";
            return TagHtml;
        }

        //' + staticUrl + 'bm_package_detail.html?id=' + arr.id + '
        function packageListFn() {
            for (var i = 0; i < 3; i++) {
                var arr = pack.shift();
                var height = arguments[0] ? 0 : "auto";
                var type = typeof arr.applicableModels != "undefined" ? arr.applicableModels : "通用";
                packageHtml = $('<li style="height:' + height + '" class="package"><a class="package_link" href="javascript:void(0)"><div class="package_l"><h3>' + arr.name + '</h3><p>适用车型：' + type + '</p></div><div class="package_r"><p class="curr_price">&yen;<span>' + arr.packagePrice + '</span></p><s class="origin_price">&yen;' + arr.originalPrice + '</s></div></a></li>');
                $('.package_list').first().append(packageHtml);
                var h = $('.package').height();
                if (arguments[0]) {
                    packageHtml.css({
                        "height": h,
                    })
                }
                if (!pack.length) {
                    viewMoreBtn.hide();
                    return;
                }
            }
        }

        //' + staticUrl + 'bm_con_detail.html?consultSid=' + item.id + '
        function adviserListFn() {
            var adviserHtml = '';
            $.each(adviser, function (i, item) {
                adviserHtml += '<li class="adviser"><a class="adviser_link" href="javscript:void(0)"><div class="img_wrap">' + img(item.photoUrl) + '</div><p class="adviser_name">' + item.name + '</p><div class="stars">' + createScore(item.score) + '</div></a></li>';
            });

            return adviserHtml;
        }

        var item = {
            orgSid: result.orgSid,
            src: imgUrl + result.brandLogo,
            name: result.orgNameAbbr,
            addr: result.address
        }
        localStorage.shopInfo = JSON.stringify(item)
    }

    if (localStorage.defaultVid) {
        bm_api.call(
            maintenancePort.isMatchOrgan,
            isMatchOrgan,
            {
                scviSid: scviSid,
                orgSid: GetQueryString('orgSid')
            }
        )
        function isMatchOrgan(data) {
            if (data.data) {
                var brandLogo = GetQueryString('brandLogo')
                var orgNameAbbr = GetQueryString('orgNameAbbr')
                var address = GetQueryString('address')
                var orgSid = GetQueryString('orgSid')
                console.log(brandLogo, orgNameAbbr, address, orgSid)
                $('#select_shop').prop("href", staticUrl + "bm_by_order.html?brandLogo=" + brandLogo + "&orgNameAbbr=" + orgNameAbbr + "&address=" + address + "&orgSid=" + orgSid);
                //$('#select_shop').prop("href", staticUrl + "bm_by_order.html?orgSid=" + GetQueryString('orgSid'));
            } else {
                $('#select_shop').addClass('grey_long_btn');
            }
        }
    }

    $('#select_shop').on("click", function () {
        if (!localStorage.defaultVid) {
            require(["custVehicle"], function (custVehicle) {
                custVehicle.newVehicle();
            });
        }
    })
}
if ($('#bm_shop_detail').length) {
    getCurrentLatLon(shopDetail)
}

/*门店详情EN*/
function getMyCarDetail() {
    bm_api.call(
        maintenancePort.myCarDetail,
        myCarDetail,
        {
            scviSid: GetQueryString("scviSid")
        }
    );
    function myCarDetail(data) {
        var result = data.data;
        $('.my_car_title').html(result.selledName);
        $('.drive_distance').val(result.currentMiles);
        $('.img_wrap').append(img(result.logoUrl));
        $('.drive_date').val(new Date(result.firstDate).Format("yyyy-MM"));
    }
}
if ($('#my_car').length) {
    if (GetQueryString("scviSid")) {
        getMyCarDetail();

    } else {
        var carInfo = JSON.parse(localStorage.cust_vehicle_info);
        $('.img_wrap').append('<img src="' + carInfo.brandLogo + '" class="my_car_logo" alt=""/>');
        $('.my_car_title').append(carInfo.mdYear + " " + carInfo.brand + " " + carInfo.series + " " + carInfo.model);
    }

}
/*爱车列表*/
if ($('#edit_my_car').length) {
    function getMyCarList() {
        bm_api.call(
            maintenancePort.myCarList,
            getCarList,
            {
                //id: scviSid,
                memberSid: memberSid
            }
        );
        function getCarList(data) {
            var result = data.data;
            $.each(result, function (i, item) {
                var cls = item.defaultVehicle ? "radio_checked" : "";
                $('.my_car_list ul').append('<li data-id="' + item.id + '" class="my_car"><div class="my_car_desc"><div class="img_wrap">' + img(item.logoUrl) + '</div><p class="car_info"><span class="car_title">' + item.selledName + '</span><span class="car_dis">新车上路时间：' + (new Date(item.firstDate).Format("yyyy-MM")) + '</span></p></div><div class="my_car_opt"><span class="set_default module_radio ' + cls + ' ">设为默认</span><p><a href="bm_save_my_car.html?scviSid=' + item.id + '&modelSid=' + item.modelSid + '&from=list" class="edit edit_icon">编辑</a><a href="javascript:void(0)" class="delete delete_icon">删除</a></p></div></li>')
            })
        }
    }
    getMyCarList();
}



/*tab*/
$('.bm_tab a').click(function () {
    $(this).addClass("curr").siblings().removeClass("curr");
    var idx = $(this).index();
    if ($('#bm_my_order_list').length) {
        idx == 0 && $('.order_list_item').show() || idx == 1 && $('.order_list_item').hide() && $('.status_0').show() || idx == 2 && $('.order_list_item').hide() && $('.status_1').show() || idx == 3 && $('.order_list_item').hide() && $('.status_4').show();

    }
    switch (idx) {
        case 0:
            $('.coupon').show();
            break;
        case 1:
            $('.status0').show();
            $('.status1,.status2,.status8').hide();
            break;
        case 2:
            $('.status2').show();
            $('.status0,.status1,.status8').hide();
            break;
        case 3:
            $('.status8').show();
            $('.status0,.status1,.status2').hide();
            break;

    }
});

$('.cancel_reason li').click(function () {
    $(this).addClass("selected").siblings().removeClass("selected");
});

$('.stars span').click(function () {
});


/*订单列表*/

if ($('#bm_my_order_list').length) {
    if (typeof(sessionStorage.memberSid) == "undefined" || !sessionStorage.memberSid) {
        var url = "http://wx.autostreets.com/member/getMember";
        var member = null;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            success: function (data) {
                if (data.success) {
                    member = data.data;
                    sessionStorage.memberSid = member.sid;
                    sessionStorage.member_info = JSON.stringify(member);
                    function updateCustVehicles() {
                        var memberSid = sessionStorage.memberSid;
                        $.ajax({
                            type: "get",
                            async: false,
                            url : "http://wx.autostreets.com/customerVehicle/updateCustVehicles",
                            data: {"defaultId":localStorage.defaultVid ,"memberSid": memberSid, "ids": localStorage.vids},
                            success: function(data){
                                if (data.success) {
                                    updateCache(memberSid);
                                }
                            }
                        });
                    };
                    function updateCache(memberSid) {
                        $.ajax({
                            type: "get",
                            async: false,
                            url : "http://wx.autostreets.com/customerVehicle/list",
                            data: {"memberSid": memberSid},
                            success: function(data){
                                if (data.success) {
                                    data = data.data;
                                    localStorage.removeItem("vids");
                                    localStorage.defaultVid= data[0].id;
                                    deleteCache();
                                    for(var i = data.length-1; i>=0; i--) {
                                        setVehicel(data[i]);
                                    }
                                }
                            }
                        });
                    };

                    function setVehicel(vehicel) {
                        localStorage.setItem(vehicel.id, JSON.stringify(vehicel));
                        if(vehicel.id != localStorage.defaultVid) {
                            var vids = localStorage.vids;
                            if(vids) {
                                var ids = [];
                                ids = vids.split(",");
                                for(var i=0; i<ids.length; i++) {
                                    if(ids[i] == vehicel.id) {
                                        ids.splice(i,1);
                                    }
                                }
                                if(sessionStorage.memberSid) {
                                    if(ids.length> 7) {
                                        localStorage.removeItem(ids[7]);
                                        ids = ids.slice(0, 7);
                                    }
                                } else {
                                    if(ids.length > 2) {
                                        localStorage.removeItem(ids[2]);
                                        ids = ids.slice(0, 2);
                                    }
                                }
                                vids = ids.join(",");
                                localStorage.setItem("vids", vehicel.id + "," + vids);
                            } else {
                                localStorage.vids=vehicel.id;
                            }
                        }
                        if(localStorage.defaultVid){
                            var oldDefault =JSON.parse(localStorage.getItem(localStorage.defaultVid));
                            oldDefault.defaultVehicle = false;
                            localStorage.setItem(localStorage.defaultVid, JSON.stringify(oldDefault));
                        }
                        localStorage.defaultVid = vehicel.id;

                    };

                    function deleteCache() {
                        var vids = localStorage.getItem("vids");
                        var ids = [];
                        if(vids) {
                            ids = vids.split(",");
                        }
                        var vehicelList = [];
                        for(var i = 0; i<ids.length ; i++) {
                            localStorage.removeItem(ids[i]);;
                        }
                        localStorage.removeItem("vids");
                        localStorage.removeItem("defaultVid");
                    };
                    updateCustVehicles();
                    orderList();
                }
            }
        });
    } else {
        orderList();
    }


}
function orderList() {
    bm_api.call(
        maintenancePort.orderList,
        getOrderList,
        {
            memberSid: sessionStorage.memberSid,
            current: 0
        }
    );

    function getOrderList(data) {
        var result = data.data;
        if (result) {
            $.each(result, function (i, item) {
                $('#bm_my_order_list').append('<div class="brd_box order_list_item status_' + item.orderStatus + '">' +
                    '<div class="order_info"><a href="' + staticUrl + 'bm_my_order_detail.html?orderNo=' + item.orderNo + '&orderStatus=' + item.orderStatus + '" class="order_detail_link">' +
                    '<div class="img_wrap">' + img(result.modelUrl) + '</div>' +
                    '<div class="r">' +
                    '<h3>' + item.orgNameAbbr + '</h3>' +
                    '<p>' + item.maintainName + '</p>' +
                    '<p class="r_sub">' +
                    '<span class="status">' + item.statusDesc + '</span>' +
                    '<span class="fee">&yen;' + item.amount + '</span>' +
                    '</p>' +
                    '</div></a>' +
                    '</div>' + getBtns(item.orderStatus, item.orderNo) +
                    '</div>');
                //console.log(item.status);

            })

        } else {

        }

    }
}
window.onscroll = function () {
    var s_t = document.documentElement.scrollTop || document.body.scrollTop;
    var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
    var hdWrap = $('.hd_wrap');
    var hdWrapH = hdWrap.height();
    $.each(hdWrap, function (i, item) {
        var self = $(item);
        var selfTop = this.offsetTop;
        if (s_t + headerH >= selfTop) {
            self.find(".hd").css({
                position: 'fixed',
                top: headerH
            })
        } else {
            self.find(".hd").css({
                position: 'relative',
                top: 0
            })
        }
        if (i != 0) {
            if (s_t + headerH + hdWrapH >= selfTop) {
                hdWrap.eq(i - 1).find(".hd").css({
                    marginTop: selfTop - hdWrapH - s_t - headerH
                });
            } else {
                hdWrap.eq(i - 1).find(".hd").css({
                    marginTop: 0
                });
            }
        }
    })
};

/*订单详情*/
if ($('#bm_my_order_detail').length) {
    function orderDetail() {
        bm_api.call(
            maintenancePort.orderDetail,
            getOrderDetail,
            {
                orderNo: GetQueryString("orderNo")
            }
        );

        function getOrderDetail(data) {

            var result = data.data;
            if (!result) {
                return
            }
            var detailWrap = $('.order_detail');
            var statusCode = result.orderStatus;
            if (result.organ) {
                $('.img_wrap').append(img(result.organ.brandLogo));
            }
            $('.fee').html('&yen;' + result.amount);
            $('.maintainName').html(result.maintainName);
            $('.orderNo').html(result.orderNo);
            $('#bm_my_order_detail').append(getBtns(result.orderStatus, result.orderNo));
            $('.banner').append(getBanner(result.orderStatus, result.statusDesc));
            if (result.maintenItems.length) {
                var maintenItemHtml = '<a href="javascript:void(0)" class="order_item_hd">保养项目<i class="w_9_arr"></i></a><ul class="order_item_bd bm_item">';
                detailWrap.append('')
                $.each(result.maintenItems, function (i, item) {
                    maintenItemHtml += '<li class="bm_item_li">' + item + '</li>';
                })
                maintenItemHtml += '</ul>';
                detailWrap.append(maintenItemHtml);
                $('.bm_item').height(0).data("height", detailWrap.find(".bm_item_li").length * $('.bm_item_li').height());
            }

            if (result.packageItems.length) {
                var packageItemsHtml = '<a href="javascript:void(0)" class="order_item_hd">优惠套餐<i class="w_9_arr"></i></a><ul class="order_item_bd package_item ">';
                detailWrap.append('')
                $.each(result.packageItems, function (i, item) {
                    packageItemsHtml += '<li class="pack_item">' + item.name + '<span>&yen;' + item.packagePrice + '</span></li>';
                })
                packageItemsHtml += '</ul>';
                detailWrap.append(packageItemsHtml);
                $('.package_item').height(0).data("height", detailWrap.find(".pack_item").length * $('.pack_item').height());
            }


            $('.bm_adviser .r_val').html(result.consultant.name);
            $('.name').html(result.custName);
            $('.mobile').html(result.phone).prop("href", "tel:" + result.phone);
            $('.shop_info h3 span').append(result.organ.orgNameAbbr);
            $('.store_addr').append(result.organ.address);
            $('.tel_icon').prop("href", "tel:" + result.organ.telephone);
            $('.home_icon').prop("href", staticUrl + "bm_shop_detail.html?orgSid=" + result.organ.orgSid);
            $('.bm_time .r_val').append(appointTime());
            $('.order_num .r_val').append(result.orderNo);
            $('.order_time .r_val').append(new Date(result.createTime).Format("yyyy/MM/dd  hh:mm"));
            $('.bm_car .r_val').html(result.custVehicleInfo);
            $('.adviser_tel').prop("href", "tel:" + result.consultant.cellphone);
            $('.view_map').prop("href", "http://wx.autostreets.com/html/map.html?lat=" + result.organ.latitude + "&lng=" + result.organ.longitude + "&name=" + result.organ.orgNameAbbr + "&addr=" + result.organ.address + "");
            function appointTime() {
                return result.timeDiscountRate ? '<i class="discount">' + result.timeDiscountRate + '折</i><span>' + new Date(result.appointTime).Format("yyyy-MM-dd  hh:mm") + '</span>' : '<span>' + new Date(result.appointTime).Format("yyyy-MM-dd  hh:mm") + '</span>'

            }

            (function expenseInfo() {
                if (statusCode == 0) {
                    $('.expense_code').hide();
                    return
                }
                ;
                var numCls = "";
                var colorCls = "";
                var refundLink = '';
                var descSub = new Date(result.appointTime).Format("yyyy-MM-dd hh:mm");
                var statusDesc = result.orderStatus;
                var statusDesc = "有效期";
                //console.log(statusCode);
                if (statusCode == 6 || statusCode == 7) {
                    statusDesc = result.statusDesc;
                    colorCls = "has_refund";
                    refundLink = '<a href="bm_refund_detail.html?orderNo=' + result.orderNo + '&amount=' + result.amount + '" class="refund_detail_link">[退款当前状态]' + statusDesc + '，点击查看退款详情]</a>';
                    descSub = "&yen;" + result.amount;
                } else if (statusCode == 8) {
                    statusDesc = "预约时间";
                } else if (statusCode == 9 || statusCode == 10) {
                    statusDesc = result.statusDesc;
                }
                if (statusCode == 9 || statusCode == 2 || statusCode == 6 || statusCode == 7 || statusCode == 5 || statusCode == 10) {
                    numCls = "expense_code_used";
                }
                var expenseInfoHtml = '<div class="expense_info"><div class="flex_box">' +
                    '<div class="l">' +
                    '<span>消费码</span>' +
                    '<p class="expense_code_status ' + numCls + '">' + result.orderNo + '</p>' +
                    '</div>' +
                    '<div class="flex ' + colorCls + '">' +
                    '<span>' + statusDesc + '</span><p>' + descSub + '</p></div></div>' + refundLink + '</div>';

                $('.expense_code').append(expenseInfoHtml);

            })()
        }

    }

    orderDetail();

    /*订单信息展开伸缩*/
    $('.order_detail').on('click', ".order_item_hd", function () {
        var t = $(this);
        var tNext = t.next();
        if (tNext.height() == 0) {
            t.next().height(t.next().data('height'));
        } else {
            tNext.height(0);
        }

        t.find("i").toggleClass('toggle_arr');
    })


}


//退款详情
if ($("#bm_refund_detail").length || $('#bm_refund').length || $('#bm_comment').length) {

    $('.expense_code').html(GetQueryString("orderNo"));

    (function () {
        bm_api.call(
            maintenancePort.orderDetail,
            orderRefundDetail,
            {
                orderNo: GetQueryString('orderNo')
            }
        )


        function orderRefundDetail(data) {
            if (!data.data) {
                return;
            }
            var refundProcess = data.data.refundProcess;
            var reason = data.data.reason;
            $('.fee').html("&yen;" + data.data.amount);
            refundProcess && $.each(refundProcess, function (i, item) {
                i++;
                var cls = item.isEnabled ? "curr" : "";
                var time = item.time ? (new Date(item.time)).Format("yyyy/MM/dd  hh:mm") : "";
                $('.refund_status_list').append('<li>' + item.step + '<i class=' + cls + '>' + i + '</i><span>' + time + '</span></li>')
            })

            if ($('#bm_refund').length) {
                $('.cancel_title').html(data.data.maintainName);
                $('.refund_sum').html("&yen;" + data.data.amount);
            }

            if ($('#bm_comment').length) {
                $('.img_wrap').empty().append(img(data.data.organ.photoUrl));
                $('h3').html(data.data.maintainName);
            }
            function setReason() {
                $.each($('.cancel_reason li'), function (i, item) {
                    var reasonHtml = $(item).html();
                    if (reasonHtml == reason) {
                        $(item).addClass("selected");
                        return;
                    }

                })
            };

        }
    })();
}

/*评分*/
if ($('#bm_comment').length) {
    $('.level').click(function () {
        var level = $(this).parent().find('.level');
        var idx = $(this).index();
        level.each(function () {
            if ($(this).index() <= idx) {
                $(this).find("i").addClass('full')
            } else {
                $(this).find("i").removeClass('full')
            }
        })

    })
}
function getBanner(status, statuDesc) {
    var cls = "";
    if (status == 2 || status == 10 || status == 9) {
        cls = 'warning'
    }
    ;
    if (status == 0 || status == 1 || status == 3 || status == 6) {
        cls = 'waiting';
    }
    if (status == 1) {
        statuDesc = "待服务";
    }
    if (status == 8 || status == 5 || status == 4 || status == 7) {
        cls = 'over';
    }
    if (status == 11) {
        cls = 'waiting';
        statuDesc = "待服务";
    }

    return '<div class="order_banner ' + cls + '"><i class="orderStatusIcon"></i><p class="orderStatus">订单状态：<span>' + statuDesc + '</span></p></div>'
}
function getBtns(status, orderNo) {
    var btns = '<div class="order_opt">';
    switch (status) {
        // case 0://待付款
        //     btns += createBtns("bm_cancel_order.html?orderNo=", "grey_order_btn", "取消订单");
        //     btns += createBtns("weChatNetpay/repay?orderType=101&orderNo=", "blue_order_btn", "付款", "pay");
        //     btns += "</div>";
        //     break;
        case 8://已预约
            btns += createBtns("bm_cancel_order.html?orderNo=", "grey_order_btn", "取消订单");
            btns += "</div>";
            break;
        // case 4://已服务
        //     btns += createBtns("", "blue_order_btn", "确认服务", "confirmService");
        //     btns += "</div>";
        //     break;
        // case 11://未评价
        //     btns += createBtns("bm_comment.html?orderNo=", "grey_order_btn", "评价");
        //     btns += "</div>";
        //     break;
        default:
            btns = "";

    }

    function createBtns(url, btnCls, txt, id) {

        if (txt == "付款") {
            staticUrl = sitUrl
        } else {
            var staticUrl = sitUrl + "html/shop_bm/";
        }
        var u = url ? staticUrl + url + orderNo : "javascript:void(0)";
        var id = id ? "id=" + id + "" : "";//按钮ID
        return '<a ' + id + ' data-orderno="' + orderNo + '" href="' + u + '" class="order_btn ' + btnCls + '">' + txt + '</a>'
    }

    return btns;

}
function img(imgResult) {

    return imgResult ? '<img class="bm_img " src="' + imgUrl + imgResult + '" alt="">' : '';
}

