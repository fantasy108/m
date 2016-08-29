var car = {};
var avStatus = 1;
var auctionAgain=true;//再次上架
var siteurl = "http://wap.autostreets.com/html/";
var imgurl = "http://images.autostreets.com/";
$(function () {
    var currentInfoUrl = "http://wap.autostreets.com/auction/showCurrentAuctionInfo&auctionSid=" + GetQueryString("id");//拍品信息
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    }
    var bidBtn=$('.bid_btn');
    //$('.highest').css("visibility","visible") ;
    bidBtn.addClass('bid_not_allow').find("a").css("cursor","default");

    var isAv=false;
    //显示当前拍卖的拍品信息
    function getCurrentInfo(){
        $.ajax({
            url: currentInfoUrl,
            type: "GET",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getCurrentInfo",
            cache: false,
            success: function (data) {
                var result = data.data;
                console.log(result);
                if(result.source=="av"){
                    isAv==true;
                }
                if(avStatus==1){
                    car.avid = result.auctionVehicleSid;//拍品ID
                    car.vehicleSid = result.vehicleSid;//拍卖会标识
                    car.firstPhotoUrl = result.firstPhotoUrl;//车辆图片
                    car.plusRange = result.plusRange;//加价幅度
                    car.videoUrl = result.plusRange;//视频地址
                    car.vehicleDesc = result.vehicleDesc;//车辆名称
                    car.licenseCode = result.licenseCode;//车牌号
                    car.startPrice = result.startPrice;//起拍价
                    $('.highest').css("visibility","hidden");
                    var num = result.auctionVehicleOrder < 100 ? completeLen(result.auctionVehicleOrder) : result.auctionVehicleOrder;
                    $('#thelist').empty().append('<li><img src="' + imgurl + car.firstPhotoUrl + '"></li>');
                    $('.auction_num').html(num);
                    setPrice(result.startPrice);
                    $('#wrapper').width(w);
                    $('#thelist li').width(w);
                    $('#scroller').width(w * $('#thelist li').length);
                    var myScroll;
                    myScroll = new iScroll('wrapper', {
                        snap: true,
                        momentum: false,
                        hScrollbar: false,
                        fixedScrollbar: true,
                        onBeforeScrollStart: function (e) {
                            e.preventDefault();
                        },
                        onScrollEnd: function () {
                            //document.querySelector('#indicator > li.active').className = '';
                            //document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                        }
                    });
                }else if(avStatus==5){
                    car.plusRange = result.plusRange;//加价幅度
                }

//                !isFir &&  setPrice(currentPrice+result.plusRange);

                //车辆图片


                //补全三位
                function completeLen(val) {
                    if (val < 10) {
                        val = "00" + val;
                    } else {
                        val = "0" + val;
                    }
                    return val;
                }

            }
        });
    }
    getCurrentInfo();



    var price = $('.price');
    var refreshPriceFlag=true;
    var isFir=$('.curr_price').html()=="0"?true:false;
    function returnNum(type) {
        var priceNum = price.html().replace(/,/g, "") * 1;
        type == "plus" ? priceNum += car.plusRange : priceNum -= car.plusRange;
        if(priceNum<=currentPrice || priceNum<car.startPrice){return};//出价小于当前价
        setPrice(priceNum);
    }
    function setPrice(price){
        var arr=[];
        var str = price.toString();
        for (var i = str.length - 1; i > -1; i--) {
            arr.push(str[i])
        }
        for (var i = 0; i < arr.length; i++) {
            if ((i + 1) % 3 == 0 && i + 1 != arr.length) {
                arr[i] = "," + arr[i]
            }
        }
        $('.price').html(arr.reverse().join(""));
    }


    //显示直播室的出价情况
    var currentPrice;
    var myBidPrice;
    var memberSid = sessionStorage.memberSid;

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
    function liveRoomInfo(){
        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/auction/showCurrentAuctionWithFixPrice",
            data: {memberSid: memberSid, auctionSid:localStorage.id},
            dataType: 'json',
            success: function (data) {
                var result=data.data;
                avStatus = result.avStatus; //当前状态
                currentPrice=result.currentPrice;//当前价
                myBidPrice=result.myBidPrice;//我的出价
                $('.auction_flow ul').empty();
//                console.log(result.seconds)//倒计时
//                console.log(result.bidActive)//拍卖是否进行中

                var avsid=result.avSid;
//                console.log(avsid)
//                console.log(car.avid)
                if(avsid!=car.avid){
                    getCurrentInfo();
                }
                if(result.avStatus=="5"){
                    if (memberInfo.isSpCertMerchant){
                        bidBtn.addClass('bid_not_allow').find("a").css("cursor","pointer");
                        $(".plus").addClass('disable');
                        $(".minus").addClass('disable');
                    }else if (memberInfo.isCertMerchant){
                        if(myBidPrice>=currentPrice && $('.curr_price').html()!="0"){
                            $('.highest').css("visibility","visible") ;
                            bidBtn.addClass('bid_not_allow').find("a").css("cursor","default");
                        }else{
                            $('.highest').css("visibility","hidden");
                            bidBtn.removeClass('bid_not_allow').find("a").css("cursor","pointer");
                        }
                        auctionAgain=true;
                    }else{
                        clearInterval(timer);
                        $('.price_box,.auction_flow').remove();
                        $('.bid_box').css("position","relative").html('<div class="not_merchant"><p>该车成交价只有认证商户可见</p><p>您可以拨打客服热线<a href="tel:4008218889">400-821-8889</a></p><p>申请成为商家用户</p></div>');
                    }


//                    bidBtn.removeClass('bid_not_allow'). find("a").css("cursor","pointer");
                }else if(result.avStatus=="1" && auctionAgain ){
                    getCurrentInfo();
                    auctionAgain=false;
                }else{
                    bidBtn.addClass('bid_not_allow').find("a").css("cursor","default");
                }
                if(!result.bidActive){bidBtn.addClass('bid_not_allow').find("a").css("cursor","default")}

                if(result.seconds>=0){
                    $('.count_down').show().html(result.seconds);
//                    getDeltaT();
                }else{
                    $('.count_down').hide().html('');
                }
                $('.curr_price').html(currentPrice);
                $('.price_box .my_bid').html(myBidPrice);
                if(currentPrice>=price.html().replace(/,/g, "") * 1 && $('.curr_price').html()!="0"){
                    setPrice(currentPrice+car.plusRange);
                }

                if( currentPrice!=0 && result.avStatus=='5'){
                    if (currentPrice+car.plusRange > price.html().replace(/,/g, "") * 1) {
                        setPrice(currentPrice+car.plusRange)
                    }
                }
                createBidList(result.bidList);
                function createBidList(arr){
                    $.each(arr,function(i,item){
                        $('.auction_flow ul').append('<li>'+(new Date((item.bidTimestamp)).toTimeString().replace("GMT+0800 (中国标准时间)","")).replace('GMT+0800 (CST)','')+'  '+item.content+'</li>')
                    })
                }
                $('.auction_flow ul li').first().css("color",'#D80000');
                getCurrentInfo()


            }
        });
    }

    liveRoomInfo();
    var timer=setInterval(liveRoomInfo,1000);








//显示倒计时
    var timeInterval; //时间倒计时
    var getDeltaT = function(s) { //根据秒获取时间差
        if (timeInterval) {
            clearInterval(timeInterval);
        }
        timeInterval = self.setInterval(function(){
            if (s == 0) {
                clearInterval(timeInterval);
            }
            s --;
            setLastTime(s);
        }, 1000);
    };
//
    function setLastTime(s){
        $('.count_down').show().html(s);
    }
//竞拍操作

    //加
    $(".plus").click(function () {
        if(!$(this).hasClass('disable')){
            returnNum.call(this, "plus");
            refreshPriceFlag=false;
        }

    });

    //减
    $(".minus").click(function () {
        if(!$(this).hasClass('disable')){
            returnNum.call(this, "minus");
            refreshPriceFlag=false;
        }
    });
//    setTimeout(loadCurrentPrice, 1000);

//关闭侧滑拍卖列表
    /*$('.auction_list').click(function (e) {
     $('.auction_list_page').animate({"left": 0}, 300);//展开
     document.body.addEventListener('touchmove', preventScroll);
     $('body').css("overflow","hidden");
     });
     $('.close_auction_list_page').click(function () {
     $('.auction_list_page').animate({"left": 100 + "%"}, 300);//缩进
     document.body.removeEventListener('touchmove', preventScroll);
     $('body').css("overflow-y","auto");
     });
     $('.auction_list_page').css("min-height", h);
     $('#auction_list').height(h - $('header').height());
     touchScroll("auction_list");*/





//显示拍品的收费明细
    $('.fee_info').click(function () {
        window.location.href = siteurl + "charge_detail.html?id=" + car.avid;//收费明细
        return false;
    });
    //车辆检测信息
    $('.car_detail_btn').click(function () {

        if(!isAv){
            window.location.href = siteurl + "competitive_detail_info.html?vehicleSid=" + car.vehicleSid;//车辆检测信息
        }
        return false;
    });


    $(document).click(function () {
        $('.pop_menu').hide();
    });
    $('.pop_menu').click(function (e) {
        e.stopPropagation();
    });
    $('.top_menu').click(function (e) {
        $('.pop_menu').toggle();
        e.stopPropagation();
    });





//    //出价
//    var bidBtn = $('.bid_btn');
//    bidBtn.click(function () {
//

//        $(".error_txt").text("出价慢了，请重新出价");
//        validate.show();


//    });

});
var validate = {
    //输入框验证
    input: function (obj, txt) {
        if (obj.val() == "") {
            $(".error_txt").text(txt);
            this.show();
        } else {
            return true
        }
    },
    price: function (obj, txt, txt2) {
        if (obj.val() == "") {
            $(".error_txt").text(txt);
            this.show();
        } else if (!this.isDigital(obj.val())) {
            $(".error_txt").text(txt2);
            this.show();
        } else {
            return true
        }
    },
    mobile: function (obj, txt, txt2) {
        if (obj.val() == "") {
            $(".error_txt").text(txt);
            this.show();
        } else if (!this.isMobile(obj.val())) {
            $(".error_txt").text(txt2);
            this.show();
        } else {
            return true
        }
    },
    mail: function (obj, txt, txt2) {
        if (obj.val() == "") {
            $(".error_txt").text(txt);
            this.show();
        } else if (!this.isEmail(obj.val())) {
            $(".error_txt").text(txt2);
            this.show();
        } else {
            return true
        }
    },
    password: function (obj, txt, txt2) {
        if (obj.val() == "") {
            $(".error_txt").text(txt);
            this.show();
        } else if (!this.isPassword(obj.val())) {
            $(".error_txt").text(txt2);
            this.show();
        } else {
            return true
        }
    },
    same: function (obj, obj2, txt) {
        if (obj.val() != obj2.val()) {
            $(".error_txt").text(txt);
            this.show();
        } else {
            return true
        }
    },
    //选择框验证
    select: function (obj, val, txt) {
        if (obj == val) {
            $(".error_txt").text(txt);
            this.show();
        } else {
            return true;
        }
    },
    //数值验证
    isDigital: function (s) {
        var regex = /^\d+(\.\d+)?$/;
        if (!regex.exec(s)) return false
        return true
    },
    //手机号验证
    isMobile: function (s) {
        var regex = /^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
        if (!regex.exec(s)) return false
        return true
    },
    //邮箱验证
    isEmail: function (s) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.exec(s)) return false
        return true
    },
    isPassword: function (s) {
        var regex = /^[a-zA-z0-9]{6,}$/g;
        if (!regex.exec(s)) return false
        return true
    },
    show: function () {
        var _height = $(window).scrollTop();
//		$(".error_layer").css("top",_height/88.8889+2.2499+"rem")
        $(".error_layer").css("position", "fixed").show();
        $(".tipbg").show()
    },
    hide: function () {
        $(".correct").click(function () {
            $(".error_layer").hide();
            $(".tipbg").hide()
        })
    },
    init: function () {
        this.hide();
    }
};
validate.init();

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