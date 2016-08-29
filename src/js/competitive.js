var ListUrl = "http://wap.autostreets.com/noHaggle/list";
var paramListUrl = "http://wap.autostreets.com/noHaggle/getParamsForList";

var imgurl = "http://images.autostreets.com/";

var caelogoimg = "http://img.autostreetscdn.com/";

var siteurl = "http://wap.autostreets.com/html/";

var page = 1;

var isload = '0';

var power = '0';//0允许 1不允许 ＋1

$(function () {

    //alert('123');
    $.ajax({
        type: "GET",
        url: paramListUrl,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        scriptCharset: "GBK",
        jsonpCallback: "getlist",
        cache: false,
        success: function (data) {
            var result = data.data;
            //循环品牌
            $("#typebox-1 ul").empty();
            $.each(result.brandList, function (i, item) {
                var _getbrand = $("<li><a href='javascript:;' selectname='" + item.name + "'><img src='" + caelogoimg + item.logoUrl + "'>" + item.name + "</a></li>");
                _getbrand.click(function () {
                    var val=$(this).children('a').attr('selectname');
                    if(val.length>4){
                        val=val.substr(0,3)+"...";
                    }
                    $('#type-1 a').html(val).attr("selectname",$(this).children('a').attr('selectname'));
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-1,#tipbg').hide();


                    loadpro();
                });
                $("#typebox-1 ul").append(_getbrand);
            });

            //循环城市
            $("#typebox-2 ul").empty();
            $.each(result.cityList, function (i, item) {
                var _getcity = $("<li><a href='javascript:;' selecetval ='" + item.name + "'>" + item.name + "</a></li>");

                _getcity.click(function () {
                    var val=$(this).children('a').attr('selecetval');
                    if(val.length>4){
                        val=val.substr(0,3)+"...";
                    }
                    $('#type-2 a').html(val).attr("selecetval",$(this).children('a').attr('selecetval'));
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-2,#tipbg').hide();

                    loadpro();
                });

                $("#typebox-2 ul").append(_getcity);
            });
            //循环价格
            $("#typebox-4 ul").empty();
            $.each(result.price, function (i, item) {
                var _getprice = $("<li><a href='javascript:;' selecetval='" + i + "' selectname='" + item + "'>" + item + "</a></li>");
                _getprice.click(function () {
                    $('#type-4 a').html($(this).children('a').attr('selectname'));
                    $('#type-4 a').attr('selecetval', $(this).children('a').attr('selecetval'));
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-4,#tipbg').hide();
                    loadpro();
                });

                $("#typebox-4 ul").append(_getprice);
            });
            //循环车龄
            //alert(JSON.stringify(data.extras.ageMap));
            $("#typebox-3 ul").empty();
            $.each(result.ageMap, function (i, item) {
                //alert(data.extras.ageMap[i]);
                var _getold = $("<li><a href='javascript:;' selecetval='" + i + "' selectname='" + item + "'>" + item + "</a></li>");

                _getold.click(function () {
                    //alert($(this).children('a').attr('selecetname'))
                    $('#type-3 a').html($(this).children('a').attr('selectname'));
                    $('#type-3 a').attr('selecetval', $(this).children('a').attr('selecetval'));
                    //alert($('#type-3 a').attr('selecetval'))
                    $(this).parent().parent().find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('#typebox-3,#tipbg').hide();

                    loadpro();
                });

                $("#typebox-3 ul").append(_getold);
            });
        }
    });

    //点击下拉事件
    $('#type-1').click(function () {
        document.body.addEventListener('touchmove', preventScroll);
        $('#typebox-1,#typebox-2,#typebox-3,#typebox-4').hide();
        $('#typebox-1,#tipbg').show();
        $('#loading').hide();
        page = 1;
    });

    $('#type-2').click(function () {
        document.body.addEventListener('touchmove', preventScroll);
        $('#typebox-1,#typebox-2,#typebox-3,#typebox-4').hide();
        $('#typebox-2,#tipbg').show();
        $('#loading').hide();
        page = 1;
    });

    $('#type-3').click(function () {
        document.body.addEventListener('touchmove', preventScroll);
        $('#typebox-1,#typebox-2,#typebox-3,#typebox-4').hide();
        $('#typebox-3,#tipbg').show();
        $('#loading').hide();
        page = 1;
    });
    $('#type-4').click(function () {
        document.body.addEventListener('touchmove', preventScroll);
        $('#typebox-1,#typebox-2,#typebox-3,#typebox-4').hide();
        $('#typebox-4,#tipbg').show();
        $('#loading').hide();
        page = 1;
    });

    //点击选项所有事件

    $('#typebox-1-all').click(function () {
        $('#type-1 a').html($(this).html());
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-1,#tipbg').hide();
        $('#type-1 a').attr('selectname', "");
        loadpro();
    });

    $('#typebox-2-all').click(function () {
        $('#type-2 a').html($(this).html());
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-2,#tipbg').hide();
        $('#type-2 a').attr('selecetval', "");
        loadpro();
    });

    $('#typebox-3-all').click(function () {
        $('#type-3 a').html($(this).html());
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-3,#tipbg').hide();
        $('#type-3 a').attr('selecetval', "0");
        loadpro();
    });
    $('#typebox-4-all').click(function () {
        $('#type-4 a').html($(this).html());
        $(this).parent().parent().find('a').removeClass('on');
        $(this).addClass('on');
        $('#typebox-4,#tipbg').hide();
        $('#type-4 a').attr('selecetval', "0");
        loadpro();
    });
    $(".select-type li").not(".select-type-line").click(function () {
        $(this).addClass("curr").siblings().removeClass("curr");
    });
    //点击背景隐藏下拉筛选条件层
    $('#tipbg').click(function () {
        document.body.removeEventListener('touchmove', preventScroll);
        $('.select-list-box').hide();
        $(this).hide();
        $('.select-type li').removeClass("curr");
    });

    function touchScroll(id) {
        if ("ontouchstart" in document) {
            var el = document.getElementById(id);
            var scrollStartPos = 0;
            document.getElementById(id).addEventListener("touchstart", function (event) {
                scrollStartPos = this.scrollTop + event.touches[0].pageY;
//                    event.preventDefault();
            }, false);
            document.getElementById(id).addEventListener("touchmove", function (event) {
                this.scrollTop = scrollStartPos - event.touches[0].pageY;
//                    event.preventDefault();
            }, false);
        }
    }

    touchScroll("typebox-1");
    touchScroll("typebox-2");
    touchScroll("typebox-3");
    touchScroll("typebox-4");
});
function preventScroll(event) {
    event.preventDefault();

}
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

function loadpro() {
    document.body.removeEventListener('touchmove', preventScroll);
    $('.select-type li').removeClass("curr");
    var select_1 = $('#type-1 a').attr("selectname");
    if (select_1 == "品牌"|| select_1 == null) {
        select_1 = '';
    }

    var select_2 = $('#type-2 a').attr("selecetval");
    if (select_2 == "城市"|| select_2 == null) {
        select_2 = '';
    }
    var select_4 = $('#type-4 a').attr('selecetval');
    if (select_4 == "0" || select_4 == null) {
        select_4 = '';
    }
    var select_3 = $('#type-3 a').attr('selecetval');
    if (select_3 == "0" || select_3 == null) {
        select_3 = '';
    }

    var select_url = ListUrl + "&brand=" + select_1 + "&city=" + select_2 + "&price=" + select_4 +"&age=" + select_3 + "&current=" + page;
    //current
    $.ajax({
        type: "GET",
        url: select_url,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        scriptCharset: "GBK",
        jsonpCallback: "getlist1",
        cache: false,
        beforeSend:function(){$('#loading').show();},
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
                    //alert(item.registerLicenseDate.toDateString());
                    var _price = item.price;

                    if (item.hidden) {
                        _price = "面议";
                    }else{
                        _price = "&yen; " + _price/10000+"万元";
                    }
                    var newCarPrice=item.priceNewcar?"新车价："+(item.priceNewcar)/10000+"万":"";
                    var tax=item.taxBuy?"购置税"+item.taxBuy/10000+"万":"";
                    var sellName=item.selledName?item.selledName:"";
                    if(item.priceNewcar && item.taxBuy ){
                        var price=newCarPrice+"+"+tax;
                    }else{
                        var price=newCarPrice+tax;
                    }



                    var _prolist = $("<li><span class='prolist_img'><img src='" + imgurl + item.firstPhotoUrl + "'></span><h3>" + item.brand + " " + item.vehicleModel + " " + sellName + "</h3><p>" + item.currentCity + "<ins>|</ins>" + (new Date(item.registerLicenseDate)).Format("yyyy年M月") + "<ins>|</ins>" + Number((item.displayMileage)).toFixed(2) + "万公里<ins>|</ins>" + item.licenseCodeDisplay + "</p><strong>" + _price + "</strong><p class='taxbuy'>"+price+"</p></li>");

                    _prolist.click(function () {
                        //alert('123');
                        window.location.href = siteurl + "/usedcar/competitive_detail.html?id=" + item.sid;
                    });

                    $("#competitive_list").append(_prolist);
                    power = '0';

                });
            }
            else {
                if (page == 1) {
                    $("#competitive_list").empty();
                    $("#competitive_list").append("<li class='nodata'>抱歉，没有符合条件的车辆</li>");
                }
                power = '1';
            }
            $('#loading').hide();
        }
    });
}


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

        if (power == '0') {
            page++;
            power = '1';
            loadpro();
        }
    }
};
loadpro();
 
