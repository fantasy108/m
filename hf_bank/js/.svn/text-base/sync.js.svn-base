var siteurl = "/html/usedcar/sync/";
$(function () {
    var w_h = document.body.clientHeight || document.body.clientHeight;
    var length = 10;
    var current = 1;
    var loadingIcon = $('#loading');
    var loadFlag = true;

    function getSyncList() {
        var reqUrl = "http://wap.autostreets.com/auction/find" + "&length=" + length + "&current=" + current;
        if (!loadFlag) return;
        loadFlag = false;
        $.ajax({
            url: reqUrl,
            type: "GET",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getSyncList",
            cache: false,
            beforeSend: function () {
                loadingIcon.show();
            },
            success: function (data) {
                var data = data.data;
                loadingIcon.hide();
                if (!data.length) {
                    loadFlag = false;
                    return;
                }
                var listHtml = "";
                $.each(data, function (i, item) {
                    var cls = '';
                    var modelDesc = item.acutionModelDesc;
                    var id = item.sid;
                    modelDesc = modelDesc ? '<p class="modelDesc">' + modelDesc + '</p>' : '';
                    item.status == 3 ? cls = "status_end" : null;
                    listHtml += '<div id="' + id + '" class="sync_list_item"><h2 class="title">' + item.title + '</h2>' + modelDesc + '<p class="time">' + new Date(item.startTimestamp).Format("yyyy年M月d日 hh:mm") + ' - ' + new Date(item.endTimestamp).Format("yyyy年M月d日 hh:mm") + '</p>' +
                        '<div class="sub_info"><ul><li class="address">' + item.city + '</li><li>|</li><li class="quantity">' + item.vehicleQuantity + ' 辆</li><li>|</li><li>' + item.auctionMargin + '</li></ul></div><span class="status ' + cls + '" data-status="' + item.status + '">' + item.statusDesc + '</span></div>';
                });

                $('.sync_list').append(listHtml);
                $('.sync_list_item').click(function () {
                    //本地存储 所在门店信息
                    if (window.localStorage) {
                        localStorage.id = $(this).prop('id');//拍卖会ID
                        localStorage.title = $(this).find(".title").html();//拍卖会名称
                        localStorage.time = $(this).find(".time").html();//拍卖会时间
                        localStorage.address = $(this).find(".address").html();//拍卖会地址
                        localStorage.quantity = $(this).find(".quantity").html();//拍卖会车辆数量
                        localStorage.modelDesc = $(this).find(".modelDesc").html();//拍卖会描述
                    }

                    window.location.href = siteurl + "sync_info.html?id=" + $(this).prop("id");
                });
                loadFlag = true;
            }
        });
    }

    //滚动加载
    window.onscroll = function () {
        var s_t = document.body.scrollTop || document.documentElement.scrollTop;
        var doc_h = document.body.scrollHeight || document.documentElement.scrollHeight;
        if (s_t + w_h + 50 >= doc_h && loadFlag) {
            current += 1;
            getSyncList();
        }
    };
    getSyncList();
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