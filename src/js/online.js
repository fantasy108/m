var url = "http://wap.autostreets.com/online/getOnlineAuctionList";

var param = "http://wap.autostreets.com/online/getVehicleListParams";

var imgurl = "http://images.autostreets.com/";

var caelogoimg = "http://img.autostreetscdn.com/";

var siteurl = "http://wap.autostreets.com/html/usedcar/online/";

var page = 1;

var isload = '0';

var power = '0'//0允许 1不允许 ＋1
var loadingImg=$('#loading');
//本地资源
//url = "http://10.100.200.148/m/src/js/onlinelist.json";
//siteurl="http://img.autostreetscdn.com/m/build/1.00/html/"


$(function () {

    loadpro();
    /*
     $.ajax({type: "GET",url:url,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getlist",cache:false,
     success:function(data){
     $("#competitive_list").empty();
     //alert(data.data)
     //循环数据列表
     if(data.data.length>0){
     $.each(data.data,function(i,item){
     //alert(item.registerLicenseDate.toDateString());

     var _price = item.startPrice;
     //if(_price != "面议"){
     _price = "&yen; " + _price/10000;
     //}

     var _prolist = $("<li><span class='prolist_img'><img src='"+imgurl+item.vehicle.firstPhotoUrl+"'></span><h3>"+item.vehicle.brand+" "+item.vehicle.vehicleModel+" "+item.vehicle.selledName+"</h3><p>"+item.city+"<ins>|</ins>"+item.vehicle.registerLicenseDate+"<ins>|</ins>"+item.vehicle.displayMileage+"万公里<ins>|</ins>"+item.vehicle.licenseCode+"</p><span class='endtime'>结束时间：09-06 15:30</span><strong>"+_price+"万起拍</strong></li>");
     _prolist.click(function(){
     //alert('123');
     window.location.href=siteurl+"online_detail.html?id="+item.sid;
     });
     $("#competitive_list").append(_prolist);
     });
     }
     else{
     $('#loading').hide();
     $("#competitive_list").empty();
     $("#competitive_list").append("<li class='nodata'>抱歉，没有符合条件的车辆</li>");
     }
     }
     });
     */

    $.ajax({type: "GET", url: param, dataType: "jsonp", jsonp: 'jsoncallback', scriptCharset: "GBK", jsonpCallback: "getdata", cache: false,
        success: function (data) {
            //alert(data.data.cityList);

            //循环城市
            $("#typebox-1 ul").empty();
            $.each(data.data.onlineCities, function (i, item) {
                //  alert(data.cityList);
                var style=item.act?"color:#f00":"";
                var _getcity = $("<li><a style="+style+" href='javascript:;' selecetval ='" + item.city + "'>" + item.city + "</a></li>");

                _getcity.click(function () {
                    $('#type-1 a').html($(this).children('a').attr('selecetval'));
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-1,#tipbg').hide();

                    //controlbody();
                    loadpro();
                });

                $("#typebox-1 ul").append(_getcity);
            });

            //循环时间
            $("#typebox-2 ul").empty();
            $.each(data.data.dateFlag, function (i, item) {
                var _getcity = $("<li><a href='javascript:;' selecetval ='" + i + "'>" + item + "</a></li>");
                _getcity.click(function () {
                    $('#type-2 a').html($(this).children('a').html());
                    $('#type-2 a').attr('selecetval', $(this).children('a').attr('selecetval'));
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-2,#tipbg').hide();
                    //controlbody();
                    loadpro();
                });

                $("#typebox-2 ul").append(_getcity);
            });


            //循环状态
            $("#typebox-3 ul").empty();
            $.each(data.data.status, function (i, item) {
                var _getcity = $("<li><a href='javascript:;' selecetval ='" + i + "'>" + item + "</a></li>");

                _getcity.click(function () {
                    $('#type-3 a').html($(this).children('a').html());
                    $('#type-3 a').attr('selecetval', $(this).children('a').attr('selecetval'));
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-3,#tipbg').hide();
                    //controlbody();
                    loadpro();
                });

                $("#typebox-3 ul").append(_getcity);
            });
        }
        //alert(JSON.stringify(data));
        //alert(JSON.stringify(data.extras.brandList));
        //循环品牌
        /*
         $("#typebox-1 ul").empty();
         $.each(data.dateFlag,function(i,item){
         var _getbrand = $("<li><a href='javascript:;' selectname='"+item.name+"'><img src='"+caelogoimg+item.logoUrl+"'>"+item.name+"</a></li>");
         _getbrand.click(function(){
         $('#type-1 a').html($(this).children('a').attr('selectname'));
         $(this).parent().parent().find('a').removeClass('on');
         $(this).children('a').addClass('on');
         $('#typebox-1,#tipbg').hide();


         loadpro();
         });
         $("#typebox-1 ul").append(_getbrand);
         });
         */

        //循环城市
        //$("#typebox-2 ul").empty();
        //$.each(data.cityList,function(i,item){
        //  alert(data.cityList);
        /*
         var _getcity = $("<li><a href='javascript:;' selecetval ='"+item.name+"'>"+item.name+"</a></li>");

         _getcity.click(function(){
         $('#type-2 a').html($(this).children('a').attr('selecetval'));
         $(this).parent().parent().find('a').removeClass('on');
         $(this).children('a').addClass('on');
         $('#typebox-2,#tipbg').hide();

         loadpro();
         })

         $("#typebox-2 ul").append(_getcity);
         */
        //});

        /*
         //循环车龄
         //alert(JSON.stringify(data.extras.ageMap));
         $("#typebox-3 ul").empty();
         $.each(data.status,function(i,item){
         //alert(data.extras.ageMap[i]);
         var _getold = $("<li><a href='javascript:;' selecetval='"+i+"' selectname='"+data.extras.ageMap[i]+"'>"+data.extras.ageMap[i]+"</a></li>");

         _getold.click(function(){
         //alert($(this).children('a').attr('selecetname'))
         $('#type-3 a').html($(this).children('a').attr('selectname'));
         $('#type-3 a').attr('selecetval',$(this).children('a').attr('selecetval'));
         //alert($('#type-3 a').attr('selecetval'))
         $(this).parent().parent().find('a').removeClass('on');
         $(this).children('a').addClass('on');
         $('#typebox-3,#tipbg').hide();

         loadpro();
         })

         $("#typebox-3 ul").append(_getold);
         });
         */
        // }
    });


    //点击下拉事件
    $('.select-type li').click(function () {
        fixUi();
        document.body.addEventListener('touchmove', preventScroll);
    })

    $('#type-1').click(function () {
        $('#typebox-1,#typebox-2,#typebox-3').hide();
        $('#typebox-1,#tipbg').show();
        $('#loading').hide();
        //$("#body").css('height', '100%');
        //$("html").css('height', '100%');
        //$("body").css('height', '100%');
        page = 1;
    });

    $('#type-2').click(function () {
        $('#typebox-1,#typebox-2,#typebox-3').hide();
        $('#typebox-2,#tipbg').show();
        $('#loading').hide();
        //$("#body").css('height', '100%');
        //$("html").css('height', '100%');
        //$("body").css('height', '100%');
        page = 1;
    });

    $('#type-3').click(function () {
        $('#typebox-1,#typebox-2,#typebox-3').hide();
        $('#typebox-3,#tipbg').show();
        $('#loading').hide();
        //$("#body").css('height', '100%');
        //$("html").css('height', '100%');
        //$("body").css('height', '100%');
        page = 1;
    });

    //点击选项所有事件

    $('#typebox-1-all').click(function () {
        $('#type-1 a').html($(this).html());
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-1,#tipbg').hide();
        //controlbody();
        loadpro();
    });

    $('#typebox-2-all').click(function () {
        $('#type-2 a').html($(this).html());
        $('#type-2 a').attr('selecetval', '0');
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-2,#tipbg').hide();
        //controlbody();
        loadpro();
    });

    $('#typebox-3-all').click(function () {
        $('#type-3 a').html($(this).html());
        $('#type-3 a').attr('selecetval', '0');
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-3,#tipbg').hide();
        $('#type-3 a').attr('selecetval', "0");
        //controlbody();
        loadpro();
    });

});

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
}


//根据拍卖会标识获取拍卖会状态
var getJsonInSessionStorage = function(value){
    var obj = sessionStorage.getItem(value);
    var json = {};
    try {
        if (obj) {
            json = JSON.parse(obj);
        }
    } catch (e) {
        console.log(e.message);
    }
    return json;
};

var memberInfo = getJsonInSessionStorage("member_info"); //会员信息

function loadpro() {

    var select_1 = $('#type-1 a').html();
    if (select_1 == "全部城市") {
        select_1 = '';
    }

    var select_2 = $('#type-2 a').attr('selecetval');
    //alert(select_2);
    if (select_2 == "0" || select_2 == null) {
        select_2 = '';
    }
    //alert(select_2);

    var select_3 = $('#type-3 a').attr('selecetval');
    if (select_3 == "0" || select_3 == null) {
        select_3 = '';
    }

    var select_url = url + "&city=" + select_1 + "&dateFlag=" + select_2 + "&status=" + select_3 + "&current=" + page;
    //current
    $.ajax({type: "GET", url: select_url, dataType: "jsonp", jsonp: 'jsoncallback', scriptCharset: "GBK", jsonpCallback: "getlist1", cache: false,
        beforeSend:function(){
            loadingImg.show();
        },
        success: function (data) {
            if (data.data.length > 0) {
                if (page == 1) {
                    $("#competitive_list").empty();
                }
                //循环数据列表
                //if(data.data.length == 0){
                //  $('#loading').hide();
                //}

                $.each(data.data, function (i, item) {
                    console.log(item);
                    var _price = item.startPrice;
                    if(memberInfo.isSpCertMerchant||memberInfo.isCertMerchant){
                        if (_price < 100) {
                            _price = "&yen; " + _price+"元起拍";
                        }
                        else {

                            _price = "&yen; " + _price / 10000 + "万元起拍";
                        }
                    }else{
                        _price="价格仅认证商户"
                    }


                    var _status = item.status;
                    //alert(_status)
                    var _getstatus= item.statusDesc;
                    var _img = item.activity ?  "<li><img src='http://img.autostreetscdn.com/m/src/images/online_act.png' class='act_png'>" : "<li>"
                    var _prolist = $( _img + "<span class='prolist_img'><img src='" + imgurl + item.vehicle.firstPhotoUrl + "'></span><div class='r_box'><h3>" + item.vehicle.brand + " " + item.vehicle.vehicleModel + " " + item.vehicle.selledName + "</h3><p>" + item.city + "<ins>|</ins>" + (new Date(item.vehicle.registerLicenseDate)).Format("yyyy年M月") + "<ins>|</ins>" + item.vehicle.displayMileage + "万公里<ins>|</ins>" + item.vehicle.licenseCode + "</p><p class='list-status'>" + _getstatus + "</p><span class='endtime'>结束时间：" + (new Date(item.planEndTime)).Format("M-d hh:mm") + "</span><strong>" + _price + "</strong></div></li>");
                    _prolist.click(function () {
                        //alert('123');
                        window.location.href = siteurl + "online_detail.html?id=" + item.sid;
                    });
                    $("#competitive_list").append(_prolist);
                });
                power = '0'
            }
            else {
                $('#loading').hide();
                if (page == 1) {
                    $("#competitive_list").empty();
                    $("#competitive_list").append("<li class='nodata'>抱歉，没有符合条件的车辆</li>");
                }
            }
            loadingImg.hide();
        }
    });
    releaseScroll();
}

function preventScroll(event) {
    event.preventDefault();

}
function releaseScroll(event){
    document.body.removeEventListener('touchmove', preventScroll);
    $('body').css({
        "position":"",
        "width":""
    })
}
function touchScroll(id) {
    if ("ontouchstart" in document) {
        var el = document.getElementById(id);
        var scrollStartPos = 0;
        document.getElementById(id).addEventListener("touchstart", function (event) {
            scrollStartPos = this.scrollTop + event.touches[0].pageY;
        }, false);
        document.getElementById(id).addEventListener("touchmove", function (event) {
            this.scrollTop = scrollStartPos - event.touches[0].pageY;
        }, false);
    }
}
touchScroll("typebox-1");
touchScroll("typebox-2");
touchScroll("typebox-3");
//点击背景隐藏下拉筛选条件层
$('#tipbg').click(function () {
    releaseScroll();

    $('.select-list-box').hide();
    $(this).hide();
    $('.select-type li').removeClass("curr");
});

//滚动条在Y轴上的滚动距离
function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;

    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;

    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
window.onscroll = function () {
    if (getScrollTop() + getWindowHeight()+100 >= getScrollHeight()) {
//        $('#loading').show();

        if (power == '0') {
            page++;
            power = '1'
            loadpro();
        }

    }
};

function fixUi(){
    $('body').css({
        'position':"fixed",
        "width":"100%"
    })
}
function controlbody() {
    $("#body").css('overflow', '');
    $("#body").css('height', '');
    $("html").css('height', '');
    $("body").css('height', '');
}
 
