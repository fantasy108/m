var url = "http://wap.autostreets.com/memberVehicle/getFavoriteVehiclesByMember?memberSid="+userUtils.getMemberSid(true);

var imgurl = "http://images.autostreets.com/";

var caelogoimg = "http://img.autostreetscdn.com/";

var siteurl = "http://wap.autostreets.com/html/";

var page = 1;

var isload = '0';

var power = '0';//0允许 1不允许 ＋1
//$('#loading').hide();
$(function () {
    loadpro();
});
var loadFlag=true;
var loading=$('#loading');
function loadpro() {
    var select_url = url + "&current=" + page;
    //$('.back').html(page);
    //alert('select_url')
    if(loadFlag){
        $.ajax({
            type: "GET",
            url: select_url,
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getlist",
            cache: false,
            beforeSend: function () {
                loading.show();
            },
            success: function (data) {
                //$("#pro_list").empty();
                //循环数据列表
                //alert(data.data.length);
                if(!data.data.length){
                    loadFlag=false;
                    loading.hide();
                    return;
                }
                if (data.data.length > 0) {

                    if (page == 1) {
                        $("#competitive_list").empty();
                    }

                    $.each(data.data, function (i, item) {

                        //0 - 现场拍  1-在线拍


                        var auctionId = item.auctionSid ? item.auctionSid : "";
                        var type = item.type;
                        var vehicle = item.vehicle;

                        var returnPrice= function (p) {
                            if (p > 100) {
                                p =  p / 10000;
                            }
                            return p;
                        };

                        var tax= function (tax) {
                            if(tax!=0){
                                return ("+"+returnPrice(tax)+"万（购置税）");
                            }else{
                                return "";
                            }

                        };

                        var newCarPrice= function (p) {
                            if(typeof p !=="undefined"){
                                return "新车价："+returnPrice(p)+"万";
                            }else{
                                return " ";
                            }

                        };
                        var stratPrice= function (p) {
                            if(p==0){
                                return "0元起拍"
                            }else{
                                return returnPrice(p)+"万元起拍"

                            }
                        };

                        var endTime= function (time) {
                            return (new Date(time).format("MM-dd hh:mm"));
                        };

                        var link=(type == "0" && siteurl+"new_mall/shops.html?modelSid="+item.sid) || (type == "1" && siteurl+"usedcar/competitive_detail.html?id="+item.sid) || (type=="2" && item.auctionType=="0" && siteurl+"usedcar/sync/sync_auction_detail.html?id="+item.sid) ||(type=="2" && item.auctionType=="1" && siteurl+"usedcar/online/online_detail.html?id="+item.sid);



                        var liCls = (type == "0" && "new_car_li") || (type == "1" && "used_car_li") || (type=="2" && item.auctionType=="0" && "sync_li") ||(type=="2" && item.auctionType=="1" && "online_li");
                        //var title=item.vehicle?item.vehicle.vehicleTitle:item.selledName;
                        //console.log(title);
                        //var name=(type!="2" && title) || (type=="2" && item.vehicle.selledName);
                        if(type=="1"){
                            name=item.vehicleTitle
                        }else if(type=="2"){
                            name=item.vehicle.vehicleTitle
                        }else if(type=="0"){
                            name=item.selledName
                        }
                        var typeText = (type == "0" && "新车") || (type == "1" && "二手车") || (type == "2" && item.auctionType=="0" && "现场拍") ||(type == "2" && item.auctionType=="2" && "即时拍") ||(type=="2" && item.auctionType=="1" && "在线拍");

                        var pic=(type == "2" &&  item.vehicle.firstPhotoUrl )|| (type == "0" && item.seriesUrl) || (type == "1" && item.firstPhotoUrl);

                        var price = (type == "0" && returnPrice(item.modelPrice)+"万元") || (type == "1" && returnPrice(item.price)+"万元") ||(type=="2"  && stratPrice(item.startPrice));

                        var right_info = (type == "0" && " ") || (type == "1" && newCarPrice(item.priceNewcar)+tax(item.taxBuy)) || (type=="2" && item.auctionType=="0" && "结束时间："+endTime(item.planEndTime)) ||(type=="2" && item.auctionType=="1" && "结束时间："+endTime(item.planEndTime))||(type=="2" && item.auctionType=="2" && "结束时间："+endTime(item.planEndTime));



                        var html = '';
                        html += '<li data-sid="'+item.sid+'" class="' + liCls + '"><a href="'+link+'"><img src="' + imgurl + pic + '">' +
                            '<h3>' + name + '</h3>';

                        if (type != "0") {
                            if(type=="1"){
                                html += '<p>' + item.currentCity + '<ins>|</ins>' + new Date(item.registerLicenseDate).format("yyyy年M月") + '<ins>|</ins>' + Number(item.displayMileage).toFixed(2) + '万公里<ins>|</ins>' + item.licenseCode + '</p>';
                            }else{
                                html += '<p>' + item.city + '<ins>|</ins>' + new Date(item.vehicle.registerLicenseDate).format("yyyy年M月") + '<ins>|</ins>' + Number(item.vehicle.displayMileage).toFixed(2) + '万公里<ins>|</ins>' + item.vehicle.licenseCode + '</p>';
                            }

                        }

                        if (type == "2" ) {
                            var cls="";
                            if(item.statusDesc=="竞拍中"){cls="pai_ing"}
                            html += '<span class="status '+cls+'">' + item.statusDesc + '</span>';
                        }

                        html += '<div class="sub">';
                        if(type!=0){
                            html+='';
                        }
                        html+='<strong>' + price + '</strong>' +
                            '<span class="right_info">' + right_info + '</span>' +
                            '</div>' +
                            '<i>' + typeText + '</i></a>' +
                            '</li>';

                        $("#pro_list").append(html);
                    });

                }
                else {
                    if (page == 1) {
                        $("#pro_list").empty();
                        $("#pro_list").append("<li class='nodata'>抱歉，没有符合条件的车辆</li>");
                    }
                }
                loading.hide();
                loadFlag=true;
            }
        });

    }
}

loadpro();
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
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
    if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
        page++;
        loadpro();
    }
};