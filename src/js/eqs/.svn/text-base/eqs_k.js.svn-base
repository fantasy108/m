/**
 * Created by xuelei.kong on 2015/10/19.
 */
$(function () {

    //alert(sessionStorage.appraiserId);
    //alert(sessionStorage.userInfo);
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

    var host = location.host;
//var uiMask = $('.ui_mask');//渐变遮罩
    var siteUrl = "http://eqs.autostreets.com";
    var loadingIcon = $('.loading');
    if (host == "mwap.com") {
        var staticUrl = "http://mwap.com/src/html/eqs";
    } else {
        var staticUrl = siteUrl + "/html";

    }
    var imgUrl = "http://images.autostreets.com/";
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    var eqs = eqs || {};
    eqs.userEqsListPort = siteUrl + "/m/usereqs/list";//检测列表
    eqs.vinPort = siteUrl + "/m/vin/selectVehicleInfoListByVin";//vin 码查询
    eqs.baseInfoParamPort = siteUrl + "/m/eqs/getBaseInfoParam";//基本信息——>参数
    eqs.getBaseInfoPort = siteUrl + "/m/eqs/getBaseInfo";//编辑基本信息
    eqs.getByLicensePort = siteUrl + "/m/eqs/getByLicense";//根据车牌号获取省市

    eqs.getLicensePort = siteUrl + "/m/eqs/getLicense";//获取上牌省市
    eqs.getLocationPort = siteUrl + "/m/eqs/getLocation";//获取省份城市
    eqs.getCheckResultPort = siteUrl + "/m/eqs/getCheckResult";//获取省份城市

    eqs.saveBaseInfoPort = siteUrl + "/m/eqs/saveBaseInfo";//保存基本信息
    eqs.getbrandSeriesPort = siteUrl + "/m/eqs/getbrandSeries";//获取品牌厂商车系
    eqs.improveGranulesPort = siteUrl + "/m/eqs/improveGranules";//检测信息是否完善
    eqs.getVehicleFeaturePort = siteUrl + "/m/eqs/getVehicleFeature";//获取配置项
    eqs.getVehicleAccessoryParamPort = siteUrl + "/m/eqs/getVehicleAccessoryParam";//附件配置——>参数
    eqs.delPort = siteUrl + "/m/eqs/del";//附件配置——>参数
    eqs.uploadPort = siteUrl + "/m/eqs/upload";//上传车辆检测
    eqs.getVehicleAccessoryPort = siteUrl + "/m/eqs/getVehicleAccessory";//获取车辆检测附件信息
    eqs.getVehiclePhotoParamPort = siteUrl + "/m/eqs/getVehiclePhotoParam";//车辆照片——>参数
    eqs.getPhotoStarsPort = siteUrl + "/m/eqs/getPhotoStars";//获取车辆照片
    eqs.savePhotoStarsPort = siteUrl + "/m/eqs/savePhotoStars";//保存车辆照片
    var loadFlag;


    function eqs_api() {
        var t = this;
        var fnCallBack = arguments[1];
        var setting = {
            type: "GET",
            url: t,
            dataType: "jsonp",
            jsonp:"jsoncallback",
            data: arguments[0],
            beforeSend: function () {
                loadingIcon.show();
                loadFlag = false;
            },
            success: function (data) {
                loadingIcon.hide();
                fnCallBack(data);
            }
        }
        if (arguments[0].hasOwnProperty('type')) {
            setting.type = "POST";
        }
        $.ajax(setting);
    }
    function noData(obj) {
        var dom = $('<li  class="no_result"><div><p>很抱歉，没有符合条件的车辆</p></div></li>');
        $(obj).empty().append(dom);

    }


    /*用户检测车辆列表*/
    function getDetectionList(option) {
        var setting = {
            appraiserId: sessionStorage.appraiserId,
            current: 1
        };
        var opt = $.extend(setting, option );
        var status = opt.searchAuditedStatusByEQS || "s";
        //console.log(opt);

        eqs_api.call(
            eqs.userEqsListPort,
            opt,
            function (data) {
                //console.log(data);
                if (data.extras.count) {
                    //console.log(data.data);
                    $.each(data.data, function (i, item) {
                        if(status==99 || item.auditedStatusText=="未上传" ){
                            var page="add_car";
                        }else{
                            var page="sec_hand_check";
                        }
                        $('#detection_list_' + status).data("length", data.extras.count);
                        item.auditedStatusText && $('#detection_list_' + status).append('<li><a href="'+page+'.html?appraiserId=' + sessionStorage.appraiserId + '&status=' + status + '" data-statustxt="'+item.auditedStatusText+'" data-vehicleid="' + item.vehicleId + '" data-code="' + item.code + '" data-status="' + status + '" class="detection_item" href=""> <div class="img_wrap">' + img(item.firstPhoto) + score(item.score, item.grade) + '</div><div class="car_info"><h2>' + item.vehicleName + '</h2><h3>' + (item.licenseCode|| "") + '</h3><p>车辆编号：<span>' + item.code + '</span></p><p><span class="date">' + item.uploadDtm + '</span><!--<span class="time">13:22:57</span>--></p><span class="status status' + status + '">' + item.auditedStatusText + '</span></div></a></li>');
                    })

                    $('#detection_list_' + status + '').delegate(".detection_item", "click", function () {

                        //sessionStorage.vehicleId = $(this).data('vehicleid');
                        sessionStorage.setItem("vehicleId", $(this).data('vehicleid'));
                        sessionStorage.setItem("status", $(this).data('status'));
                    });
                    if(status==99){
                        if($('#detection_list_99').find("li").length>=data.extras.num){
                            //$('#addCar').hide();
                            $('#addCar').addClass("disable").html("未上传车辆最多为"+data.extras.num+"条").prop("href","javascript:void(0)")
                        }
                    }
                    loadFlag = true;
                } else {
                    /*$('.no_result').show();
                     $('.item').hide();*/
                    noData('#detection_list_' + status);
                }

                function score(score, grade) {
                    //#97C43C #569AB7 #CBAA74 #B3A679
                    /* switch (grade){
                     case "A":
                     cls="hight";
                     break;
                     case 'B':
                     cls="top";
                     break;
                     case 'C':
                     cls=''
                     }*/
                    var g = grade && grade.substring(0, 1);
                    var cls = g == 'A' && 'high' || g == 'B' && 'top' || g == 'C' && 'middle' || g == 'D' && 'low';
                    if (score) {
                        return '<div class="score ' + cls + '"><span>' + score + grade + '</span></div>';
                    }
                    return "";
                }
            }
        )
    }


    if ($('.detection_list').length) {
        if (!sessionStorage.appraiserId) {
            common_popupWindow({
                content: "当前浏览器版本过低，推荐使用QQ浏览器！",
                btnYes: {
                    text: "好的",
                    url: "javascript:void(0)",
                    callback: function () {
                        window.location.href = staticUrl + '/login.html';
                    }
                }
            })
            return;
        }
        var status;
        var status1Curr = 1, status2Curr = 1, status0Curr = 1, status99Curr = 1, statussCurr = 1;
        loadFlag = true;
        getDetectionList({
            searchAuditedStatusByEQS: 99
        });//默认未上传
        $('.top_filter').delegate('span', "click", function () {
            status = $(this).data("code");
            $(this).addClass("curr").siblings().removeClass('curr');
            $('#detection_list_' + status).show().siblings(".item").hide();
            status1Curr = 1, status2Curr = 1, status0Curr = 1, status99Curr = 1,statussCurr = 1;
            $('#detection_list_' + status).empty();
            getDetectionList({
                searchAuditedStatusByEQS: status
            })
        });
        function returnPage(status) {
            //console.log(status);
            return a=status==1 && ++status1Curr || status==2 && ++status2Curr ||status==0 && ++status0Curr ||status==99 && ++status99Curr||status=="s" && ++statussCurr;
        }




        /*顶部搜索*/
        var searchIpt = $('#searchIpt'), searchBtn = $('#search_submit'),
            cleanBtn = $('#clean_search_word'), list = $('.detection_list'), searchContent = $('#detection_list_s');
        var searchType = $('#filter_type');
        $('#search_light').on('click', function () {
            status="s";
            $('#top_filter_wrap').hide();
            list.hide();
            searchContent.show();
            $('#search').show();
            $('#wrapper').addClass('searching');
            $('.sub_opt').hide();
            uiFix();
        })

        $('#closeSearch').click(function () {
            closeSearch();
        })
        function closeSearch() {
            list.show();
            searchContent.hide().empty();
            searchType.val('0');
            $('#search').hide();
            $('#top_filter_wrap').show();
            $('#wrapper').removeClass('searching');
            searchIpt.removeClass('focus');
            $('.sub_opt').show();
            searchIpt.val("");
            uiAuto();
            status=$('.top_filter .curr').data("code");
            $('#detection_list_' + status).empty();
            getDetectionList({
                searchAuditedStatusByEQS: status
            })
        }

        $('#search_form').submit(function () {
            var type = searchType.val();
            var searchKeyWord = searchIpt.val();
            var param = {};
            statussCurr = 1;
            if (type == "0") {
                alert("请选择查询条件")
            } else {
                searchContent.empty();
                param[type] = searchKeyWord;
                getDetectionList(param);
                searchIpt.blur();
                searchBtn.hide();
                cleanBtn.hide();
                searchIpt.removeClass('focus');
                uiAuto(event);
            }
            return false;
        })
        searchIpt.focus(function () {
            searchBtn.show();
            searchContent.show();
            if (searchIpt.val().length != 0) {
                cleanBtn.show();
            }
            searchIpt.addClass('focus');
        }).keyup(function () {
            cleanBtn.show();
            if (searchIpt.val().length == 0) {
                cleanBtn.hide();
            }
        })
        cleanBtn.click(function () {
            searchIpt.val("");
            this.style.display = "none";
        })
        $('#addCar').click(function () {
            sessionStorage.vehicleId = "";
            sessionStorage.status = 100;
        });
        $('#filter_type').change(function () {
            if($(this).val()){
                searchBtn.show();
            }
        });
        window.onscroll = function () {
            var s_t = document.documentElement.scrollTop || document.body.scrollTop;
            var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (s_t + winH + 150 >= doc_h && loadFlag) {
                //console.log($('#detection_list_' + status).data("length"));
                //console.log($('#detection_list_' + status).find('li').length);
                //console.log(status);
                var param={};
                if(typeof status!="number"){
                    status="s";
                    param[searchType.val()]=searchIpt.val();
                }else{
                    param["searchAuditedStatusByEQS"]=status;
                }
                param.current=returnPage(status);

                if ($('#detection_list_' + status).find('li').length < $('#detection_list_' + status).data("length")) {
                    getDetectionList(param);
                }
            }
        }
    }

    function img(imgResult) {
        return imgResult ? '<img src="' + imgUrl + imgResult + '" alt="">' : '';
    }


    function common_popupWindow(/*p,*/ option) {

        function insertStyle(cssSrc) {
            var css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = cssSrc;
            document.head.appendChild(css)
        };
        function getLocationPopup() {
            /*  if (!p) {
             return
             }
             popup.insertStyle(p);*/
            var setting = option || {
                    title: "默认标题",
                    closeBtn: false,
                    content: "描述文字。。。",
                    btnYes: {text: "确定", url: "http://www.yhd.com"},
                    btnNo: {text: "取消", url: "http://www.yhd.com"}
                };
            if (setting.closeBtn) {
                var closeBtn = '<b class="close"></b>';
            } else {
                var closeBtn = "";
            }
            if (setting.hasOwnProperty("title")) {
                var title = '<div class="title">' + setting.title + '</div>';
            } else {
                var title = "";
            }
            if (setting.hasOwnProperty("btnYes")) {
                var btnYes = '<a href="' + setting.btnYes.url + '" class="btn_public btnYes">' + setting.btnYes.text + "</a>"
            } else {
                var btnYes = ""
            }
            if (setting.hasOwnProperty("btnNo")) {
                var btnNo = '<a href="' + setting.btnNo.url + '" class="btn_public btnNo">' + setting.btnNo.text + "</a>"
            } else {
                var btnNo = ""
            }
            var pop = '<div class="popup_wrap">' + title + closeBtn + '<div class="text">' + setting.content + '</div><div class="btn_box">' + btnNo + btnYes + "</div></div>";
            var div = document.createElement("div");
            div.id = "popupTipsLocation";
            div.innerHTML = pop;
            document.body.appendChild(div);
            div.querySelector(".close") && close.addEventListener("click", function () {
                closePopup()
            }, false);
            var popupWrap = div.querySelector(".popup_wrap");
            var popupWrap = div.querySelector(".popup_wrap");
            /*popupWrap.addEventListener("click", function(e) {
             if (e.target === document.querySelector(".popup_wrap")) {
             closePopup();
             } else {
             e.stopPropagation()
             }
             }, false)*/
            div.querySelector(".btnNo") && div.querySelector(".btnNo").addEventListener("click", function () {
                closePopup();
            }, false);
            div.querySelector(".btnYes") && div.querySelector(".btnYes").addEventListener("click", function () {
                closePopup();
                if (setting.btnYes.callback) {
                    (setting.btnYes.callback)();
                }
            }, false);

        };
        function closePopup() {
            var a = document.querySelector("#popupTipsLocation");
            a.parentNode.removeChild(a)
        };
        getLocationPopup();
    };
    function goBackConfirm() {
        common_popupWindow({
            content: "您所修改的内容尚未保存，是否确定返回",
            btnNo: {text: "取消", url: "javascript:void(0)"},
            btnYes: {
                text: "确定",
                url: "javascript:history.go(-1)"
            }
        })
    }

    /*  (function ($) {
     $.imageFileVisible = function (options) {
     var defaults = {
     wrapSelector: null,
     fileSelector: null,
     width: '100%',
     height: 'auto',
     errorMessage: "不是图片"
     };
     var opts = $.extend(defaults, options);
     var ImgWrap = $(opts.wrapSelector);
     var maxW = ImgWrap.width();
     var maxH = ImgWrap.height();
     $(opts.fileSelector).on("change", function () {
     ImgWrap.empty();
     var file = this.files[0];
     var imageType = /image.*!/;
     if (file.type.match(imageType)) {
     var reader = new FileReader();
     reader.onload = function () {
     var img = new Image();
     img.src = reader.result;
     resizeImg(img);
     ImgWrap.append(img);
     };
     reader.readAsDataURL(file);
     } else {
     alert(opts.errorMessage);
     }
     });

     function resizeImg(img) {
     img.onload = function () {
     var w = img.offsetWidth;
     var h = img.offsetHeight;
     var ratio = Math.min(maxW / w, maxH / h);

     img.style.width = w * ratio + "px";
     img.style.height = h * ratio + "px";
     img.style.marginTop = adjustPos(ratio * h) + "px";
     function adjustPos(h) {
     var gap = 0, imgMrTop = 0;
     gap = maxH - h;
     return imgMrTop = (gap > 0 ? gap : 0) / 2;
     }
     }
     }
     };
     })(jQuery);

     $.imageFileVisible({
     wrapSelector: ".image_wrap",
     fileSelector: "#takePhoto"
     });
     */
    /*is_Lic */


    function scrollMe(id, option) {
        var defaultSettings = {
            tap: true,
            scrollX: false,
            scrollY: true,
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: false,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        };
        var setting = $.extend({}, defaultSettings, option || {});
        $(id).find('.iScrollVerticalScrollbar').remove();

        if (typeof IScroll != "undefined") {
            return new IScroll(
                id,
                setting
            );
        }


    }


    function tab(tab, content, callback) {
        $(tab).click(function () {
            var idx = $(this).index();
            $(this).addClass('curr').siblings().removeClass('curr');
            $(content).eq(idx).show().siblings(content).hide();
            if (callback && typeof callback == "function") {
                callback(idx);
            }
        })
    }


    $('.layer_close').click(function () {
        closeLayer();
    })

    function closeLayer() {
        $('.layer').removeClass('show_layer');
        uiAuto();
    };


    //$("#param_list").height($("#car_param ul").height());

    function isTouch(event) {
        var type = event.type;
        if (type.indexOf('touch') >= 0) {
            return true;
        } else {
            return false;
        }
    }

    var isSupportTouch = "ontouchend" in document ? true : false;

    function touchEvent() {
        this.each(function () {
            var t = $(this)[0];
            t.style.Transform = "translate(0px,0px)";
            t.style.webkitTransform = "translate(0px,0px)";
            var pos = 0;
            var maxTranslateX = -($(this).width() - winW+$('.hd').width())
            if (isSupportTouch) {
                var evStart = "touchstart", evMove = "touchmove", evEnd = "touchend";
                var bindDom = t;
            } else {
                var evStart = "mousedown", evMove = "mousemove", evEnd = "mouseup";
                var bindDom = document;
            }
            t.addEventListener(evStart, function () {
                startX = event.clientX || event.touches[0].clientX;
                startY = event.clientX || event.touches[0].clientY;
                initX = startX;
                initY = startY;
                pos = Number(this.style["-webkit-transform"].match(/\-?[0-9]+/g)[0]);
                this.style.Transition = "all 0s";
                this.style.webkitTransition = "all 0s";
                startTime = Date.now();
                bindMove(event);
            })


            function move(event) {
                var endX = event.clientX || event.touches[0].clientX;
                var endY = event.clientX || event.touches[0].clientY;
                var absX = endX - startX + pos;
                $('.slider ul').css({
                    "-webkit-transition": "all 0s",
                    "-webkit-transform": "translate(" + absX + "px,0)"
                })
                finishX = endX;
                finishY = endY;

            }

            function bindMove() {
                bindDom.addEventListener(evMove, move)
            }

            bindDom.addEventListener(evEnd, function (event) {
                pos = Number(t.style["-webkit-transform"].match(/\-?[0-9]+/g)[0]);
                if (pos > 0) {
                    $('.slider ul').css({
                        "-webkit-transition": "all .3s",
                        "-webkit-transform": "translate(0,0)"
                    })
                }

                if (pos < maxTranslateX) {
                    $('.slider ul').css({
                        "-webkit-transition": "all .3s",
                        "-webkit-transform": "translate(" + maxTranslateX + "px,0)"
                    });
                }
                initX = 0;
                finishX = 0;
                if (!isSupportTouch) {
                    document.removeEventListener("mousemove", move, false);
                    document.removeEventListener("mouseup", move, false);
                }
            })
        })

    }

    //基础参数
    var baseConfigScroll;
    var privateConfigScroll;
    var reglocationData;
    var currLocationData;
    var getBrandSeriesFlag = true;
    var seriesScroll;
    var getConfigParamFlag = true;
    /*vin码*/
    function getVinInfo(vin) {
        var paramList = {
            "brand": "品牌",
            "brandSeries": "车系",
            "manufacturer": "厂家",
            "suggestionPrice": "新车指导价",
            "oilType": "燃料类型",
            "maxPower": "最大功率(KW)",
            "producedYear": "生产年份",
            "produceingType": "国产合资进口",
            "selledName": "销售名称",
            "sweptVolume": "排量(升)",
            "sweptVolumeStandard": "排放标准",
            "bodyType": "车身款式",
            "transmissionType": "变速器类型",
            "vehicleModel": "车型",
            "category": "车辆类型"
        };
        eqs_api.call(
            eqs.vinPort,
            {
                vinCode: vin
            },
            function (data) {
                //console.log(data);
                if (data.success && data.data) {

                    var result = data.data;
                    var field = $.extend({}, paramList, result.item);
                    //console.log(result.item);
                    var fieldArr = [];
                    var list = result.list;


                    $('.param_field').empty();
                    for (var i in field) {
                        fieldArr.push(i);
                        $('.param_field').append('<li><span>' + field[i] + '</span></li>');
                    }
                    //console.log(fieldArr);
                    $("#car_list ul").empty();
                    $("#param_list ul").empty();
                    $.each(list, function (i, car) {
                        //console.log(car);
                        $("#car_list ul").append('<li><div class="item"><p class="car">' + car.brand + car.brandSeries + '</p><a class="select_car" href="javascript:void(0)" data-brand="' + car.brand + '" data-manufacturer="' + car.manufacturer + '" data-brandseries="' + car.brandSeries + '" data-vehiclemodel="' + car.vehicleModel + '" data-car="' + car.brand + " " + car.manufacturer + " " + car.brandSeries + '" data-sellname="' + car.selledName + '" data-sweptvolume="' + car.sweptVolume + '" data-maxpower="' + car.maxPower + '" data-airtype="' + car.airType + '" data-producedyear="' + car.producedYear + '" data-transmissiontype="' + car.transmissionType + '" data-oiltype="' + (car.oilType).substring(0, 2) + '" data-transmissiontype="' + car.transmissionType + '"data-featureitems="' + (car.featureItems||"") + '" data-levelid="'+car.levelId+'">选择</a></div></li>');
                        var li = '<li><ol>';
                        $.each(fieldArr, function (j, item) {
                            li += "<li><span>" + (car[item] || "无") + "</span></li>";

                        })
                        li += "</ol></li>"
                        $('#param_list ul').append(li);
                    })
                    $("#car_list ul").width(
                        $('#car_list ul li').length * ($('#car_list ul li').outerWidth(true))+2
                    );
                    $("#param_list ul").width(
                        $('#param_list ul>li').length * $('#param_list ul>li').outerWidth(true)+2
                    );

                    if ($('.slider').width() < $('.slider ul').width()) {
                        touchEvent.call($('.slider ul'))
                    }
                    /* $('#car_param').css(
                     "top",$('#brand_series').outerHeight(true)+$(".base_param").outerHeight(true)
                     )*/
                    if (list.length > 1) {
                        $('#vin_layer').addClass('show_layer');
                        uiFix();
                    } else {
                        $('.select_car').click();
                    }
                    //$('#vin_layer').addClass('show_layer');
                    scrollMe('#car_param', {"bounce": false});

                } else {
                    alert(data.msg);
                }
            }
        );
    }

    function getBaseInfoParam() {
        eqs_api.call(
            eqs.baseInfoParamPort,
            {},
            function (data) {
                var result = data.data;
                var feature = result.vehicleFeature;
                $.each(result.bodyColor, function (i, item) {
                    $('#bodyColor').append('<option value="' + item + '">' + item + '</option>')
                })
                $.each(result.interiorColor, function (i, item) {
                    $('#interiorColor').append('<option value="' + item + '">' + item + '</option>')
                })
                $.each(result.oilType, function (i, item) {
                    $('#oilType').append('<option value="' + item + '">' + item + '</option>')
                })
                $.each(result.sweptVolumeType, function (i, item) {
                    $('#sweptVolumeType').append('<label for="v_'+item+'"><input id="v_'+item+'" type="radio" name="sweptVolumeType" value="'+item+'"><span>'+item+'</span></label>')
                })
                $.each(result.transmissionType, function (i, item) {
                    $('#transmissionType').append('<option value="' + item + '">' + item + '</option>')
                })
                if (!sessionStorage.vehicleId) {
                    $('#yes')[0].checked = true;
                }
                getLocation();
            }
        )
    }

    function getLicensePort(currLocationData) {
        eqs_api.call(
            eqs.getLicensePort,
            {},
            function (data) {
                reglocationData = data.data;
                $.each(reglocationData, function (i, item) {
                    $('#registerProvince').append('<option data-id="' + i + '" class="reg_pro">' + item.province + '</option>');
                })
                if (sessionStorage.vehicleId) {
                    getBaseInfo(currLocationData, reglocationData);
                }
            }
        )
    }

    function getLocation() {
        eqs_api.call(
            eqs.getLocationPort,
            {},
            function (data) {
                currLocationData = data.data;
                $.each(data.data, function (i, item) {
                    $('#currentProvince').append('<option class="province_opt" data-id="' + i + '" value="' + item.province + '">' + item.province + '</option>')
                })
                getLicensePort(currLocationData);
                $('#licenseCode').blur(function () {
                    var val = $.trim($(this).val());
                    if (val != '') {
                        eqs_api.call(
                            eqs.getByLicensePort,
                            {
                                license: val
                            },

                            function (data) {
                                //console.log(data);
                                if (data.success) {
                                    var pro = data.data.province;
                                    var city = data.data.city;
                                    //console.log(reglocationData);
                                    $('#registerProvince').val(pro);
                                    var id = $('#registerProvince').find("option:selected").data("id");
                                    $('#registerCity').find(".city_opt").remove();
                                    $.each(reglocationData[id].cityList, function (i, item) {
                                        $('#registerCity').prop("disabled", false).append('<option class="city_opt" data-lic="' + item.license + '" value="' + item.city + '">' + item.city + '</option>');
                                    })
                                    $('#registerCity').val(city);
                                    //$('#registerCity').val(city);

                                } else {
                                    //alert(data.msg);
                                }
                            }
                        )
                    }

                })

                $('#registerCity').change(function () {
                    var lic = $(this).find("option:selected").data("lic");
                    $('#licenseCode').val(lic);
                });

                $('#power').blur(function () {
                    var t=$(this);
                    if($(this).val()!="" && $(this).val()<0.1){
                        alert("最大功率不得小于0.1");
                        $('#power').val('');
                        t.focus();
                    }
                });

                $('#sweptVolume').blur(function () {
                    t=$(this);
                    if($(this).val()!="" && $(this).val()<0.1){
                        alert("排气量不得小于0.1");
                        $('#sweptVolume').val('');
                        t.focus();
                    }
                });
                $('#power').blur(function () {
                    var t = $(this);
                    var val = $.trim(t.val());
                    if (val) {
                        if (isNaN(val)) {
                            alert("请输入正确的数值");
                            t.focus();
                            t.val("");
                        } else if (Number(val) > 999) {
                            t.val("");
                            alert("输入的数字不能大于999.00");
                            t.focus();
                        }
                    }
                })
                $('#displayMileage').blur(function () {
                    if($(this).val()>9999999){
                        alert("最大里程为9999999公里");
                        $(this).val("");
                    }
                });
                $('#sweptVolume').blur(function () {
                    var t = $(this);
                    val = $.trim(t.val());
                    if (val) {
                        if (isNaN(val)) {
                            alert("请输入正确的数值");
                            t.focus();
                            t.val("");
                        } else if (Number(val) > 20) {
                            t.val("");
                            alert("输入的数字不能大于20.00");
                            t.focus();
                        } else if (val.indexOf('.') == -1 || (val.substring(val.indexOf('.')).length > 3 || val.substring(val.indexOf('.')).length == 1)) {
                            t.val("");
                            alert("输入格式错误！范例：n.n或n.nn");
                            t.focus();
                        }
                    }
                })
                $(".province").change(function () {
                    var name = $(this).prop("name");
                    //console.log(name);
                    var val = $(this).val();
                    var cityData = name == "registerProvince" ? reglocationData : currLocationData;
                    var id = $(this).find("option:selected").data('id');
                    var citySelect = $(this).parents('li').next('li').find(".city");
                    citySelect.prop("disabled", false).find(".city_opt").remove();
                    if (val == "") {
                        citySelect.prop("disabled", true).find(".city_opt").remove();
                        return;
                    }

                    $.each(cityData[id].cityList, function (i, item) {
                        if (name == "registerProvince") {
                            citySelect.append('<option data-lic="' + item.license + '" class="city_opt" value="' + item.city + '">' + item.city + '</option>');
                            if (val.indexOf('市') != -1) {
                                return false;
                            }



                        } else {
                            citySelect.append('<option class="city_opt" value="' + item + '">' + item + '</option>');
                        }


                    });
                });
            }
        )


    }

    function getBaseInfo(currLocationData, reglocationData) {//编辑基本信息
        eqs_api.call(
            eqs.getBaseInfoPort,
            {
                "vehicleId": sessionStorage.vehicleId
            },
            function (data) {
                var result = data.data;
                //console.log(result);
                var featureItemList = result.featureItemList;
                var personalFeatureItemList = result.personalFeatureItemList;
                result.vehicleLicenseUrl && $("#get_photo").append('<img src="' + imgUrl + result.vehicleLicenseUrl + '" class="finalImg"/>');
                $('#brand_val').html(result.brand == null ? "" : result.brand + " " + result.manufacturer + " " + result.brandSeries);
                $('input[name="brand"]').val(result.brand);
                $('input[name="manufacturer"]').val(result.manufacturer);
                $('input[name="brandSeries"]').val(result.brandSeries);
                $('input[name="vehicleModel"]').val("");
                $('input[name="levelId"]').val(result.levelId);
                result.sweptVolumeType && $("#v_"+result.sweptVolumeType+"").attr("checked",true);
                if (result["vehicleLicense"] === false) {
                    $('#is_lic').attr("checked", !result[i]);
                    $('.get_photo').addClass('no_lic');
                    $('#outfile').hide();
                }

                if (result['clearVin'] != null) {
                    $('input[name="clearVin"][value="' + result['clearVin'] + '"]').attr("checked", true)
                } else {
                    $('input[name="clearVin"][value="true"]').attr("checked", true)
                }
                $('#displayMileage').val(result["displayMileage"]);
                if (result['clearDisplayMileage'] === false) {
                    $('#no_mile').attr("checked", true)
                    //$('#displayMileage').attr("disabled", !result['clearDisplayMileage']).val('');
                    $('#displayMileage').parents('li').hide();
                }
                for (var i in result) {
                    if (result[i] != "" && result[i] != null) {

                        if (i == "sweptVolume") {
                            $('#sweptVolume').val(result[i].toFixed(2));

                        } else if (i == "clearVin") {
                            $('input[name="' + i + '"][value="' + result[i] + '"]').attr("checked", true);
                        } else if (i == "producedYears") {
                            $("#" + i).val(result[i].substring(0, 4) + "-" + result[i].substring(4, 6));
                            $('#registerLicenseYears').prop('min', result[i].substring(0, 4) + "-" + result[i].substring(4, 6))
                        } else if (i == "registerLicenseYears") {
                            $("#" + i).val(result[i].substring(0, 4) + "-" + result[i].substring(4, 6));
                        } else if (i == "featureItemList") {
                            if (result[i].length) {
                                $('.base_config').addClass("has_config");
                                $.each(result[i], function (i, item) {
                                    $('.base_config ul').append('<li  data-val="' + item + '" data-type="base" class="item"><a data-val="' + item + '"  data-type="base" class="config_item base_selected selected" href="javascript:void(0)"><span>' + item + '</span></a></li>');
                                })
                            }

                        } else if (i == "personalFeatureItemList") {
                            if (result[i].length) {
                                $('.private_config').addClass("has_config");
                                $.each(result[i], function (i, item) {
                                    $('.private_config ul').append('<li  data-val="' + item + '" data-type="private" class="item"><a data-val="' + item + '"  data-type="private" class="config_item private_selected selected" href="javascript:void(0)"><span>' + item + '</span></a></li>');
                                })
                            }

                        } else {
                            $("#" + i).val(result[i]);
                            if (i == "registerProvince") {

                                var regId = $("#" + i).find("option:selected").data("id");
                                $.each(reglocationData[regId].cityList, function (j, item) {
                                    $('#registerCity').prop("disabled", false).append('<option class="city_opt" data-lic="' + item.license + '" value="' + item.city + '">' + item.city + '</option>');
                                    if (result[i].indexOf('市') != -1) {
                                        return false;
                                    }

                                })
                            }

                            if (i == "currentProvince") {
                                var regId = $("#" + i).find("option:selected").data("id");
                                $.each(currLocationData[regId].cityList, function (i, item) {
                                    $('#currentCity').prop("disabled", false).append('<option class="city_opt" value="' + item + '">' + item + '</option>');
                                })
                            }


                        }

                    }

                }

                //$('input[name="selledName"]').val("");

            }
        )

    }

    function getConfigParam() {//基础个性配置参数
        eqs_api.call(
            eqs.getVehicleFeaturePort,
            {},
            function (data) {
                $('.config').each(function (j) {
                    var type = $(this).data("type");
                    $.each(data.data, function (i, item) {
                        var li = $('<li data-val="' + item.featureColumnText + '" data-type="' + type + '" data-id="' + item.id + '" class="item"><a data-val="' + item.featureColumnText + '" data-id="' + item.id + '" data-type="' + type + '" class="config_item ' + type + '_' + item.id + '" href="javascript:void(0)"><span>' + item.featureColumnText + '</span></a></li>');
                        $('#' + type + '_config ul').append(li);

                    });

                })
                baseConfigScroll = scrollMe("#base_config");
                privateConfigScroll = scrollMe("#private_config");
                editConfig();
                getConfigParamFlag = false;
            }
        )
    }


    function getbrandSeries() {
        eqs_api.call(
            eqs.getbrandSeriesPort,
            {},
            function (data) {
                var result = data.data;
                $.each(result, function (i, item) {
                    var cls = i == 0 ? "curr" : "";
                    var manufacturer = item.manufacturerList;
                    var ul = "<ul>";
                    $('#brand ul').append('<li data-sid="' + item.sid + '" class="l_brand ' + cls + '">' + item.name + '</li>')
                    $.each(manufacturer, function (i, item) {
                        var seriesList = item.seriesList;
                        ul += '<li class="manufacturer" data-sid="' + item.sid + '">' + item.name + '</li>';
                        $.each(seriesList, function (i, item) {
                            ul += '<li class="item" data-sid="' + item.sid + '">' + item.name + '</li>';
                        })
                    })
                    ul += "</ul>";
                    $('#series_item').append(ul);
                })
                scrollMe('#brand');
                seriesScroll = scrollMe('#series');

                getBrandSeriesFlag = false;
            }
        )
    }

    function saveBaseInfo() {
        var base = [], private = [];
        $('.base_config .base_selected').each(function () {
            //$('#base_hidden')[0].value+=($(this).data('val'));
            base.push($(this).data('val'))
        })
        $('.private_config .private_selected').each(function () {
            //$('#base_hidden')[0].value+=($(this).data('val'));
            private.push($(this).data('val'))
        })
        $('#base_hidden').val(base.join(','))
        $('#private_hidden').val(private.join(','))
        //alert($('#base_hidden').val());
        //alert($('#private_hidden').val());
        //alert(base);
        eqs_api.call(
            eqs.saveBaseInfoPort,
            $('#base_form').serialize(),
            function (data) {
                //console.log(data);
            }
        )
    }


    //基础信息
    var cvs = document.getElementById('canvas');
    if (cvs) {
        var ctx = cvs.getContext("2d");
    }
    var imgLoading = $('.img_loading');
    var uploadBtn = $('#uploadBtn');
    var restoreBtn = $('#restore');
    var saveBtn = $('#save_photo');
    var clipBtn = $('#clipBtn');
    var clipArea = $('#clipArea');
    var bark;
    var imgInsertDom;

    if ($('.base_info').length) {
        document.querySelector('.goBack').addEventListener('click', goBackConfirm);//返回确认事件绑定
        getBaseInfoParam();
        $("#producedYears").change(function () {
            var proYear = Number($('#producedYears').val().replace("-", ""));
            var regYear = Number($('#registerLicenseYears').val().replace("-", ""));
            //console.log(proYear);
            //console.log(regYear);
            if (regYear < proYear) {
                $('#registerLicenseYears').val('');
            }
            $('#registerLicenseYears').prop('min', $('#producedYears').val());
        })

        $("#registerLicenseYears").change(function () {
            var proYear = Number($('#producedYears').val().replace("-", ""));
            var regYear = Number($('#registerLicenseYears').val().replace("-", ""));
            if (proYear && regYear < proYear) {
                $('#registerLicenseYears').val('');
            }
            $('#registerLicenseYears').prop('min', $('#producedYears').val());
        })


        $(".no_mile").click(function () {
            //$(".miles")[0].disabled = $('#no_mile')[0].checked;
            $('#no_mile')[0].checked?$('#displayMileage').parents("li").hide():$('#displayMileage').parents("li").show();
            //$('#displayMileage').parents("li").hide();
            $(".miles").val("");
        })
        //照相
        $('#is_lic').click(function () {
            if (this.checked) {
                $(this).val('false');
                $('.get_photo').addClass('no_lic');
                $('#vehicleLicenseUrl').val("");
                $('.finalImg').hide();
                $(cvs).hide();
                clipArea.show();
                restoreBtn.hide();
                saveBtn.hide();
                ctx.clearRect(0, 0, w, h);
                $('#outfile').hide();

            } else {
                $(this).val("true");
                $('.finalImg').show();
                $('.get_photo').removeClass('no_lic');
                $('#outfile').show();
            }

        });
        //新增
        $('.add_new_info').click(function () {
            if (getConfigParamFlag) {
                getConfigParam();
            }
            //baseConfigScroll = scrollMe("#base_config");
            //privateConfigScroll = scrollMe("#private_config");
            var idx = $('.add_new_info').index($(this));
            $('.config_tab').eq(idx).addClass('curr').siblings().removeClass('curr');
            $('.config').eq(idx).show().siblings('.config').hide();


            uiFix();
            $('#config_layer').addClass("show_layer");
            $('.outConfig').each(function () {
                var type = $(this).data('type');
                $("#" + type + "_config").find(".item").show();
                $("#" + type + "_config").find(".config_item").removeClass("" + type + "_selected selected");
            })//初始

            editConfig();
            baseConfigScroll && baseConfigScroll.refresh();
            privateConfigScroll && privateConfigScroll.refresh();
        })

        function editConfig() {
            $('.outConfig .config_item').length && $('.outConfig').each(function () {
                var type = $(this).data("type");
                $(this).find(".selected").each(function () {
                    var thisType = $(this).data("type");
                    var sibType = thisType == "base" ? "private" : "base";
                    var val = $(this).data("val");
                    //console.log(sibType);
                    $('#' + type + "_config").find('li[data-val="' + val + '"]').find('.config_item').addClass(type + "_selected selected");
                    $('#' + sibType + "_config").find('li[data-val="' + val + '"]').hide();

                })
            })
        }

        tab('.config_tab', ".config", function (i) {
            /*  if (i == 1 && !$('.config').eq(i).hasClass('ok')) {
             privateConfigScroll = scrollMe("#private_config");
             $('.config').eq(i).addClass('ok');
             }*/
            baseConfigScroll.refresh();
            privateConfigScroll.refresh();


        });
        //保存基础和个性配置
        $("#save_config").click(function () {
            $('.config').each(function () {
                var type = $(this).data("type");
                if ($('.' + type + '_selected').length) {
                    $('.' + type + '_config').find('ul').empty().append($('.' + type + '_selected').parent().clone());
                    if ($('.' + type + '_config').find('li').length) {
                        $('.' + type + '_config').addClass("has_config");
                    } else {
                        $('.' + type + '_config').removeClass("has_config");
                    }
                } else {
                    $('.' + type + '_config').find('ul').empty().removeClass("has_config");
                    $('.' + type + '_config').removeClass("has_config");
                }
            })
            $('.layer').removeClass('show_layer');
            uiAuto();
        })


        $("#get_brand").click(function () {
            $('#brand_layer').addClass("show_layer");

            if (getBrandSeriesFlag) {
                getbrandSeries();
            }
            uiFix();
        })
        $('#brand').delegate("li", "tap", function () {
            var idx = $(this).index();
            $(this).addClass("curr").siblings().removeClass('curr');
            $('#series_item ul').eq(idx).show().siblings().hide();
            seriesScroll.refresh();
            seriesScroll.scrollTo(0, 0, 0, IScroll.utils.ease.quadratic);
        });
        $('#series_item').delegate(".item", "tap", function () {
            var ul = $(this).parent();
            var idx = ul.index();
            var brand = $('.l_brand').eq(idx).html();
            var manufacturer = ul.find(".manufacturer").html();
            var brandSeries = $(this).html();
            $('#brand_val').html(brand + " " + manufacturer + " " + brandSeries);
            $('input[name="brand"]').val(brand);
            $('input[name="manufacturer"]').val(manufacturer);
            $('input[name="brandSeries"]').val(brandSeries);
            $('input[name="vehicleModel"]').val("");
            $('input[name="selledName"]').val("");
            closeLayer();
        });
        //外选
        $('.outConfig').delegate(".config_item", "click", function () {
            var type = $(this).data("type");
            //var id=$(this).data("id");
            var sibType = type == "base" ? "private" : "base";
            $(this).toggleClass(type + "_selected selected");
            /*  if($(this).hasClass("selected")){
             $('#'+sibType+'_config li[data-id='+id+']').hide();
             }else{
             $('#'+sibType+'_config li[data-id='+id+']').show();
             }*/


        })
        //弹层选
        $('.config').delegate("a", "tap", function () {
            var type = $(this).data("type");
            var id = $(this).data("id");
            var sibType = type == "base" ? "private" : "base";
            $(this).toggleClass(type + "_selected selected");
            if ($(this).hasClass("selected")) {
                $('#' + sibType + '_config li[data-id=' + id + ']').hide();
            } else {
                $('#' + sibType + '_config li[data-id=' + id + ']').show();
            }

        })

        // VIN码
        var vc;
        $('#query').click(function () {
            var vinCode = $.trim($('.vin_code').val());
            if (!vinCode) {
                alert("请输入VIN码");
            } else {
                if(vc!=vinCode){
                    vc=vinCode;
                    getVinInfo(vinCode);
                }else{
                    $('#vin_layer').addClass('show_layer');
                }

                //LSVTT13319N567881
                //KMHSH81B6AU641627
            }

        })

        //选择车型
        $('#car_list').delegate(".select_car", "click", function () {
            var brand = $(this).data("brand");
            var manufacturer = $(this).data('manufacturer');
            var brandSeries = $(this).data("brandseries");
            var car = $(this).data('car');
            var sellName = $(this).data('sellname');
            var vehicleModel = $(this).data("vehiclemodel");
            var featureitemsArr =$(this).data("featureitems")!="" &&  ($(this).data("featureitems")).split(',');
            var levelId=$(this).data("levelid");
            //console.log(featureitemsArr);
            $('#brand_val').html(car);
            $('.carType').val(sellName);


            $('input[name="brand"]').val(brand);
            $('input[name="manufacturer"]').val(manufacturer);
            $('input[name="brandSeries"]').val(brandSeries);
            $('input[name="vehicleModel"]').val(vehicleModel);
            $('input[name="levelId"]').val(levelId);

            $('#sweptVolume').val($(this).data('sweptvolume'));
            $('#power').val($(this).data('maxpower'));
            //$('#sweptVolumeType').val($(this).data('airtype') == "自然吸气" ? "L" : "T");
            $(this).data('airtype') == "自然吸气"?$("#v_l").attr("checked",true):$("#v_t").attr("checked",true)
            $('#producedYears').val($(this).data('producedyear') + "-" + "02");
            $('#transmissionType').val($(this).data('transmissiontype'));
            $('#oilType').val($(this).data('oiltype'));
            //data-oiltype="'+(car.oilType).substring(0,2)+'" data-transmissiontype="'+car.transmissionType+'"

            //组出基本配置

            featureitemsArr.length && $(".base_config").addClass('has_config').find("ul").empty() && $.each(featureitemsArr, function (i, item) {
                $(".base_config ul").append('<li data-val="' + item + '" data-type="base" class="item"><a data-val="' + item + '" data-type="base" class="config_item base_0 base_selected selected" href="javascript:void(0)"><span>' + item + '</span></a></li>');
            });
            closeLayer();
        })

        //拍照
        var w = $('#get_photo').width(), h = $('#get_photo').height();

        $(cvs).prop({width: w, height: h});

        //触发拍照
        $("#outfile").click(function (event) {
           imgInsertDom = $('#get_photo');
            /*if ($(this).hasClass("no_lic")) {
                event.preventDefault();
            } else {
                $("#take_photo_layer").addClass("show_layer");
                $("body").css("position","fixed");
                uiFix();
            }*/

        });
        $('#take_photo_layer .layer_close').click(function () {
            $("body").css("position","");
            $('#take_photo_layer .layer_content').hide();
        })
        clipPhoto(w, h);
        paint(cvs);
        //////////////////////////////////////////////////////////////////////////////
        //还原编辑
        restoreBtn.click(function () {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(bark, 0, 0, w, h);
            $(cvs).css({
                "display": "block"
            });
            $(this).hide();
            $('.step3').removeClass('curr');
        })
        $('.layer_close').click(function () {
            resetClip();
        })
        $('#save_photo').click(function () {
            saveImg(w, h);


        })
    }

    //TODO 车辆照片
    if ($('.car_photo').length) {
        //document.querySelector('.goBack').addEventListener('click', goBackConfirm);//返回确认事件绑定
        eqs_api.call(
            eqs.getVehiclePhotoParamPort,
            {},
            function (data) {
                var result = data.data;
                //console.log(result);
                //<p class="txt_holder">'+item.photoName+'</p>
                $.each(result, function (i, item) {
                    $('#wrapper').append('<div class="hd">' + item.photoDesc + '</div><div class="item"><div class="photo"  data-id="' + item.id + '" id="photo_' + item.id + '"> <span class="add_btn"><strong>+点击添加</strong></span><input type="file" accept="image/*" class="file"><img src="' + imgUrl + item.photoUrl + '" alt="" class="img_holder"/></div></div>');
                })
                if (sessionStorage.vehicleId) {
                    eqs_api.call(
                        eqs.getPhotoStarsPort,
                        {
                            vehicleId: sessionStorage.vehicleId
                        },
                        function (data) {
                            var result = data.data;
                            //console.log(result);
                            $.each(result, function (i, item) {
                                //console.log(item.configId);
                                $('#photo_' + item.configId).append('<img src="' + imgUrl + item.photoUrl + '" class="finalImg"/>')
                            })
                        }
                    )
                }
                var w = $('.photo').width(), h = $(".photo").height();
                $(cvs).prop({width: w, height: h});
                $('.photo').click(function () {
                     photoScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
                    imgInsertDom = $(this);
                    //$('.layer').addClass("show_layer");
                    /*setTimeout(function () {
                        $('.layer').addClass("show_photo_layer").css({
                            "top":scrollTop
                        });
                    },300)*/
                    $("#take_photo_layer .layer_content").show();
                 /*   $('body').css({
                        "overflow": "hidden",
                        "position":"fixed"
                    });*/
                    //document.addEventListener('touchmove', preventDfu);

                })

                clipPhoto(w, h);


                $('.layer_close').click(function () {
                    resetClip();
                    $('.layer').removeClass("show_photo_layer").css("top","100%");
                    setTimeout(function () {
                        $('.layer').css("top","");
                    },300)
                    $("#take_photo_layer .layer_content").hide();
                    $('body').css({
                        "overflow": "",
                        "position":""
                    });
                    $('.step3').removeClass('curr');
                    $(document).scrollTop(photoScrollTop);
                });
                $('#save_photo').click(function () {
                    saveImg(w, h);
                })
            }
        )

    }

    function clipPhoto(w, h) {
        clipArea.css({
            width: w + 20,
            height: h + 20
        }).photoClip({
            width: w,
            height: h,
            //strictSize: true,
            file: "#outfile,#file,.file",
            view: "#view",
            ok: "#clipBtn",
            loadStart: function () {
                imgLoading.show();
            },
            loadComplete: function () {
                $("#take_photo_layer").addClass("show_layer").find('.layer_content').show();
                $("body").css("position","fixed");
                imgLoading.hide();
                clipArea.show();
                $(cvs).hide();
                restoreBtn.hide();
                saveBtn.hide();
                clipBtn.show();
                $('.img_step1,.text1').show();
                $('.img_step2,.text2').hide();
                //$('.step3').removeClass('curr');
                $('.steps').removeClass('done');
                $('.steps').removeClass('curr');
                $('.step1').addClass('curr');
                if($('.car_photo').length){
                    $('.control').show();
                }

            },
            clipFinish: function (dataURL) {
                bark = new Image();
                bark.src = dataURL;
                restoreBtn.hide();
                saveBtn.show();
                $('.img_step1,.text1').hide();
                $('.img_step2,.text2').show();
                $('.step2').addClass("curr").prevAll().addClass('done').removeClass('curr');
                if($('.car_photo').length){
                    $('.control').hide();
                }
                // 图片加载完成后，将其显示在canvas上
                bark.onload = function () {
                    //console.log("bbb");
                    clipArea.hide();
                    //uploadBtn.hide();
                    clipBtn.hide();
                    ctx.drawImage(bark, 0, 0, w, h);
                    $(cvs).css({
                        "display": "block"
                    });
                }
            }
        });

    }


    function paint(obj) {
        var flag = false;
        var ctx = obj.getContext("2d");
        obj.addEventListener('mousemove', onMouseMove, false);
        obj.addEventListener('mousedown', onMouseDown, false);
        obj.addEventListener('mouseup', onMouseUp, false);

        obj.addEventListener('touchstart', onMouseDown, false);
        obj.addEventListener('touchmove', onMouseMove, false);
        obj.addEventListener('touchend', onMouseUp, false);
        function onMouseMove(evt) {
            evt.preventDefault();
            if (flag) {
                var p = pos(evt);
                ctx.lineTo(p.x, p.y);
                ctx.lineWidth = 10.0; // 设置线宽
                ctx.shadowColor = "#CC0000";
                ctx.strokeStyle = "#CC0000"; // 设置线的颜色
                ctx.shadowBlur = 1;
                ctx.stroke();
            }
        }

        function onMouseDown(evt) {
            restoreBtn.show();
            evt.preventDefault();
            ctx.beginPath();
            var p = pos(evt);
            ctx.moveTo(p.x, p.y);
            $('.step3').addClass("curr").siblings().removeClass("curr");
            $('.step1,.step2').addClass("done");


            flag = true;
        }

        function onMouseUp(evt) {
            evt.preventDefault();
            flag = false;
        }


        var photoW=$('#get_photo').width();
        function pos(event) {
            var x, y;
            //alert( (winW)
            if (isTouch(event)) {
                x = event.touches[0].pageX - (winW - photoW) / 2;
                y = event.touches[0].pageY - $('#canvas').offset().top;
            } else {
                x = event.layerX;
                y = event.layerY;
            }
            return {x: x, y: y};
        }
    }

    function resetClip() {
        $('.photo-clip-rotateLayer').empty();
        ctx.clearRect(0, 0, w, h);
        clipArea.show();
        uploadBtn.show();
        clipBtn.show();
        saveBtn.hide();
        restoreBtn.hide();
        $('.steps').removeClass('curr');
        $('.steps').removeClass('done');
        $('.img_step1,.text1').show();
        $('.img_step2,.text2').hide();
        $(cvs).hide();
        if($('.car_photo').length){
            $('.control').show();
        }
        uiAuto();
    }
    function saveImg(w, h) {
        if ($(cvs).is(":hidden")) {
            alert("请截取图片");
            return;
        } else {
            $('#take_photo_layer').removeClass("show_layer");
            var img = convertCanvasToImage(cvs);
            img.className = "finalImg";
            img.width = w;
            img.height = h;
            img.setAttribute("data-status", "1");
            imgInsertDom.find('.finalImg').remove().end().append(img);
            $('.step3').removeClass('curr');
            if($('#vehicleLicenseUrl').length){
                //基本信息
                $('#vehicleLicenseUrl').val(canvas.toDataURL("image/jpeg"));
            }else{
                //车辆拍照
                var pamaData = {};
                pamaData.starPhotoList = [];
                pamaData.starPhotoList.push({
                    configId : imgInsertDom.attr("data-id"),
                    photoUrl : imgInsertDom.find("img.finalImg").attr("src")
                });
                if (sessionStorage.vehicleId) {
                    pamaData.id = sessionStorage.vehicleId;
                }
                if (sessionStorage.appraiserId) {
                    pamaData.appraiserId = sessionStorage.appraiserId;
                }
                eqs_api.call(
                    eqs.savePhotoStarsPort,
                    {
                        param:JSON.stringify(pamaData),
                        type:"POST"

                    },
                    function (data) {
                        if (data.success) {
                            sessionStorage.vehicleId = data.data;
                        } else {
                            alert(data.msg);
                        }

                    }

                )
            }



            resetClip();
            $("body").css("position","");
            $('#take_photo_layer .layer_content').hide();
            document.removeEventListener('touchmove', preventDfu);
            //$('#take_photo_layer').removeClass("show_photo_layer").css("top","")
            if($('.car_photo').length){
                $('body').css({
                    "overflow": "",
                    "position":""
                });
                $(document).scrollTop(photoScrollTop);
            }
        }
    }


    //车辆信息
    if ($('.car_info').length) {
        //检测信息是否完善
        var uploadFlag = true;
        if (sessionStorage.vehicleId) {
            eqs_api.call(
                eqs.improveGranulesPort,
                {vehicleId: sessionStorage.vehicleId},
                function (data) {
                    var result = data.data;
                    for (var i in result) {
                        if (!result[i]) {

                            $("." + i).html('<span class="status_icon warn">未完善必填项</span>');
                            uploadFlag = false;
                        } else {
                            $("." + i).html('<span class="status_icon"></span>')
                        }
                    }


                    $('.view_report').addClass('enable');
                    $('.view_report').prop("href", "sec_hand_check.html");
                    eqs_api.call(
                        eqs.getCheckResultPort,
                        {
                            vehicleId: sessionStorage.vehicleId
                        },
                        function (data) {
                            //console.log(data);
                            if(data.data.del){
                               $('.delete').addClass('enable');
                           }
                            if(data.data.upload){
                                $('.upload').addClass('enable');
                            }

                        }
                    );
                }
            )
        } else {
            $('.view_report').prop("href", "javascript:void(0)");
            $('.status').html("请完善车辆信息");
        }

        $(".delete").click(function () {
            if ($(this).hasClass("enable")) {
                common_popupWindow(
                    {
                        content: "是否删除该车辆",
                        btnNo: {text: "取消", url: "javascript:void(0)"},
                        btnYes: {
                            text: "删除", url: "javascript:void(0)", callback: function () {
                                eqs_api.call(
                                    eqs.delPort,
                                    {
                                        vehicleId: sessionStorage.vehicleId
                                    },
                                    function (data) {
                                        if (data.success) {
                                            window.location.href = staticUrl + "/my_detection.html";
                                        } else {
                                            alert(data.msg)
                                        }

                                    }
                                )
                            }
                        }
                    }
                );
            }
        });

        $('.upload').click(function () {
            if ($(this).hasClass("enable")) {
                eqs_api.call(
                    eqs.uploadPort,
                    {
                        vehicleId: sessionStorage.vehicleId
                    },
                    function (data) {
                        if (data.success) {
                            alert("上传成功");
                            window.location.href = staticUrl + "/my_detection.html";
                        } else {
                            alert(data.msg);
                        }

                    }
                )
            }
        })
    }
    //附件检测
    if ($('.accessory').length) {
        document.querySelector('.goBack').addEventListener('click', goBackConfirm);//返回确认事件绑定
        eqs_api.call(
            eqs.getVehicleAccessoryParamPort,
            {},
            function (data) {
                var accessoryConfig = data.data.accessoryConfig;
                var idStr;
                $.each(accessoryConfig, function (i, item) {
                    if (item.optionCategory == "accessory_option_damage") {
                        idStr = "threeRadio";
                    } else {
                        idStr = ""
                    }
                    $('#accessoryConfig').append('<li><div class="item"><label class="field"><span>' + item.accessoryName + '</span></label><div class="content"><p class="radio_box" id="' + idStr + '">' + creatRadio(item.optionCategory, item.id) + '</p></div></div></li>')

                })

                function creatRadio(type, id) {
                    if (type == "accessory_option_default") {
                        return ' <label for="config_' + id + '_1"><input  value="有" class="config_' + id + '"  data-type="list" id="config_' + id + '_1" type="radio" name="' + id + '"/><span>有</span></label><label for="config_' + id + '_2"><input value="未见" class="config_' + id + '" id="config_' + id + '_2" type="radio"  data-type="list" name="' + id + '"/><span>未见</span></label>';
                    }
                    if (type == "accessory_option_damage") {
                        return ' <label for="config_' + id + '_1"><input value="损伤" class="config_' + id + '"  data-type="list" id="config_' + id + '_1" type="radio" name="' + id + '"/><span>损伤</span></label><label for="config_' + id + '_2"><input value="有" class="config_' + id + '" data-type="list" id="config_' + id + '_2" type="radio" name="' + id + '"/><span>有</span></label><label for="config_' + id + '_3"><input  value="未见" class="config_' + id + '" data-type="list" id="config_' + id + '_3" type="radio" name="' + id + '"/><span>未见</span></label>';
                    }
                }


                if (sessionStorage.vehicleId) {
                    eqs_api.call(
                        eqs.getVehicleAccessoryPort,
                        {
                            vehicleId: sessionStorage.vehicleId
                        },
                        function (data) {
                            var result = data.data;
                            //console.log(result);
                            var list = result.accessoryList;
                            for (var i in result) {
                                if (result[i] != null) {
                                    $('input[name="' + i + '"][value="' + result[i] + '"]').prop("checked", "checked");

                                    if (i == "nextAnnualExamination") {
                                        $('#nextAnnualExamination').val(result[i].split(' ')[0])
                                    }
                                    if (i == "nextCompulsoryInsurance") {
                                        $('#nextCompulsoryInsurance').val(result[i].split(' ')[0])
                                    }
                                    if (i == "annexKey") {
                                        $('#annexKey').val(result[i])
                                    }
                                    if (i == "transferNumber") {
                                        $('#transferNumber').val(result[i])
                                    }
                                    if (i == "accessoryRemark") {
                                        $('#accessoryRemark').val(result[i]);
                                        $('.str_count span').html($('#accessoryRemark').val().length)
                                    }
                                } else {
                                    $('input[name="' + i + '"][value="true"]').prop("checked", "checked");
                                    $('input[name="' + i + '"][value="非营运"]').prop("checked", "checked");
                                }
                            }
                            $("#accessoryConfig li").each(function () {
                                if ($(this).find('.field span').html() == "备胎") {
                                    $(this).find('.content label').eq(1).find("input").prop("checked", true);
                                } else {
                                    $(this).find('.content label').first().find("input").prop("checked", true);
                                }
                            });
                            $.each(list, function (i, item) {
                                $('.config_' + item.accessoryConfigId + '[value="' + item.optionSelected + '"]').prop("checked", "checked");
                            })


                        }
                    )
                } else {
                    $('#n_tran,#y_tax,#y_cz').prop("checked", true);
                    $("#accessoryConfig li").each(function () {
                        if ($(this).find('.field span').html() == "备胎") {
                            $(this).find('.content label').eq(1).find("input").prop("checked", true);
                        } else {
                            $(this).find('.content label').first().find("input").prop("checked", true);
                        }

                    });

                }

            }
        )

        var bind_name = 'input';
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            bind_name = 'propertychange';
        }
        $('#accessoryRemark').bind(bind_name, function () {
            var len = $(this).val().length;
            if (len == 101) {
                return
            }
            ;
            $('.str_count span').html(len);
        })

    }
    function uiFix() {
        $('body').css("overflow", "hidden");
    }
    function preventDfu(event){
        event.preventDefault();
    }
    function uiAuto() {
        $('body').css("overflow", "");
    }

    function convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/jpeg");
        return image;
    }

})
