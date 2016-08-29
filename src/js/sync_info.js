var liveRoomFlag=true;
var siteurl = "/html/";
$(function(){
    var memberSid = userUtils.getMemberSid();
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
    var selectTypeBox=$('.select-type-box');
    var loadingIcon = $('#loading');
    $('.title').html(localStorage.title);
    insertTitle(localStorage.title);
    $('.time').html(localStorage.time);
    $('.address').html(localStorage.address);
    $('.quantity').html(localStorage.quantity);
    localStorage.modelDesc==null?$('.modelDesc').html(localStorage.modelDesc):$(".modelDesc").remove();
    var loadFlag = true;
    var params={},pageLength=10,current=1;
    var paramsStr=["price","age","mileage"];
    params.price=0;
    params.age=0;
    params.mileage=0;

    var imgurl = "http://images.autostreets.com/";
    var listParamUrl="http://wap.autostreets.com/auction/getAuctionVehicleWithParams";



    //点击下拉事件
    $('.type_item').click(function () {
        document.body.addEventListener('touchmove', preventScroll);
        var i=$('.type_item').index($(this));
        $('.select-list-box').eq(i).show().siblings(".select-list-box").hide();
        $('#tipbg').show();
        $('#loading').hide();
        current = 1;
    });



    function getParamList(){
        $.ajax({
            url:listParamUrl,
            type:"GET",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getParamList",
            cache: false,
            success: function (data) {
                var result = data.data;
                var datas=[result.price,result.age,result.mileage];
                //循环参数选项列表
                $('.select-list-box').each(function(i){
                    var listWrap=$(this).find(".select-list");
                    listWrap.empty();
                    $.each(datas[i], function (i, item) {
                        var list = $("<li class='select_list_item'><a href='javascript:;' data-val='" + i + "'>" + item + "</a></li>");
                        listWrap.append(list);
                    });
                });

                $('.select_list_item').click(function(){
                    var i=$('.select-list-box').index($(this).parents(".select-list-box"));
                    var val=$(this).children("a").data('val');
                    var tarElem=$('.type_item').eq(i).find('a');
                    tarElem.html($(this).children('a').html()).data("val",val);
                    $(this).parents(".select-list-box").find('a').removeClass('on');
                    $(this).children('a').addClass('on');
                    $('.select-list-box,#tipbg').hide();
                    $('.type_item').removeClass("curr");

                    //筛选请求
                    $('.type_item').each(function(i){
                        params[paramsStr[i]]=$(this).find('a').data('val')
                    });
                    $('#competitive_list').empty();
                    loadFlag=true;
                    getAuctionList();
                    document.body.removeEventListener('touchmove', preventScroll);
                })
            }
        });
    }

    getParamList();


    //根据拍卖会ID查询拍品列表
    function getAuctionList(){
        var auctionListUrl="http://wap.autostreets.com/auction/findAuctionVehicles&auctionSid="+localStorage.id+"&price="+params.price+"&age="+params.age+"&mileage="+params.mileage+"&current="+current;
        if(!loadFlag){return;}
        loadFlag=false;
        $.ajax({
            url:auctionListUrl,
            type:"GET",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getAuctionList",
            cache: false,
            beforeSend:function(){
                loadingIcon.show();
            },
            success:function(data){
                var result=data.data;
                console.log(result);

                loadingIcon.hide();
                if(!result.length){
                    loadingIcon.hide();
                    $('#competitive_list').empty().append('<li class="nodata">抱歉，没有符合条件的车辆</li>');
                    return;}
                var listHtml = "";
                var total=data.extras.total;

                $.each(result,function(i,item){
                    var status=item.status;
                    var statusCls="";
                    var isav=item.vehicle.source=="av"?"<span class='lin'>临</span>":"";


                    var num = item.auctionVehicleOrder < 100 ? completeLen(item.auctionVehicleOrder) : item.auctionVehicleOrder;
                    if(status=="5"){statusCls="auction_ing"}
                    listHtml +='<li class="car_list" id="'+item.sid+'">' +
                        '<span class="prolist_img"><i class="num">'+num+'</i><img src="'+imgurl+item.vehicle.firstPhotoUrl+'"></span>' +
                        '<h3>'+isav+item.vehicle.brand+item.vehicle.vehicleModel+(item.vehicle.selledName || "")+'</h3>' +
                        '<p class="mb5">'+(item.vehicle.registerCity?item.vehicle.registerCity+"<ins>|</ins>" : "") +(item.vehicle.registerLicenseDate?new Date(item.vehicle.registerLicenseDate).Format("yyyy年M月")+"<ins>|</ins>": "")+(item.vehicle.displayMileage>0?item.vehicle.displayMileage+'万公里<ins>|</ins>':"")+item.vehicle.licenseCode+'</p>';
                        //+
                        //'<p class="auction_status '+statusCls+'" data-status="'+item.status+'">'+item.statusDesc+'</p></li>';
                });


                $('#competitive_list').append(listHtml);
                $('#competitive_list li').length>=total?loadFlag=false:loadFlag=true;
                //调整至车辆详情页
                $('.car_list').click(function(){
                    if($(this).find(".lin").length)return;
                    localStorage.auctionSid=localStorage.id;
                    window.location.href = siteurl + "usedcar/sync/sync_auction_detail.html?id=" + $(this).prop("id");

                });
            }
        })
    }

   /* var isShowStartPrice=function(p){
        if(member_isCertMerchant.success && member_isCertMerchant.data){
            return '<strong>¥ '+p/10000+'万元起拍</strong>';
        }else{
            return "";
        }
    };*/
    getAuctionList();
//补全三位
    function completeLen(val) {
        if (val < 10) {
            val = "00" + val;
        } else {
            val = "0" + val;
        }
        return val;
    }





    //滚动参数定屏
    var selectTypeTop=selectTypeBox.offset().top;
    var w_h = document.body.clientHeight || document.body.clientHeight;
    window.onscroll=function(){
        var s_t = document.body.scrollTop || document.documentElement.scrollTop;
        s_t+$('header').height()>=selectTypeTop?selectTypeBox.css({"position":"fixed","top":"44px"}):selectTypeBox.css({"position":"relative","top":0});

        //滚动加载
        var doc_h = document.body.scrollHeight || document.documentElement.scrollHeight;
        if (s_t + w_h + 50 >= doc_h && loadFlag) {
            current += 1;
            getAuctionList();
        }
    };

//根据拍卖会标识获取拍卖会状态

    /*if (memberSid) {
     if (!userUtils.isCertMerchant(memberSid)) {
     $(".link_live_room").addClass("not_allow");
     }
     }*/

    $.ajax({
        url:"http://wap.autostreets.com/auction/getStatusByAuctionSid&auctionSid="+localStorage.id,
        type:"GET",
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        scriptCharset: "GBK",
        jsonpCallback: "getStatusByAuctionSid",
        cache: false,
        success:function(data){
            //0-未发布、1-已发布、2-拍卖开始、3-拍卖结束
            var status=data.data;
            if(status=="2"  && (memberInfo.isCertMerchant || memberInfo.isSpCertMerchant)){
                $('.link_live_room').removeClass("not_allow").find("a");
            }else{
                $('.link_live_room').addClass("not_allow").find("a").css("cursor","default");

                liveRoomFlag=false;
            }
        }
    });
    /*//进入直播室
     $('.live_room').click(function(){
     if(liveRoomFlag)  window.location.href = siteurl + "live_room.html?id=" +localStorage.id ;
     });*/

//时间字符转换
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
    touchScroll("typebox-1");
    touchScroll("typebox-2");
    touchScroll("typebox-3");
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

    function preventScroll(event) {
        event.preventDefault();

    }


});

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

