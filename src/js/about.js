/**
 * Created by xuelei.kong on 2015/4/23.
 */
var imgurl = "http://images.autostreets.com/";

var caelogoimg = "http://img.autostreetscdn.com/";

var baseUrl = "http://wap.autostreets.com/";
if ($('#about').length) {
    var _width = $(window).width();
    $("#about_slide li").width(_width);
    //$("#about_slide").height(Math.ceil(_width / 640 * 453));
    var scro_len = $("#about_slide li").length;
    $("#about_slide").width(_width * scro_len);
    myScroll = new iScroll("about_slide_wrap", {
        snap: true,
        momentum: false,
        hScrollbar: false,
        lockDirection: false,
        vScroll: false,
        fixedScrollbar: true,
        onScrollStart: function (e) {
            e.preventDefault()
        },
        onScrollEnd: function () {
            document.querySelector("#indicator ul > li.active").className = "";
            document.querySelector("#indicator ul> li:nth-child(" + (this.currPageX + 1) + ")").className = "active"
        }
    });




}
if($('#offline').length){
    var current=1;
    var loadFlag=true;
    var loadOffline= function () {
        if(!loadFlag){return}
        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/shop/offline?current="+current,
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            scriptCharset: "GBK",
            jsonpCallback: "getOffline",
            cache: false,
            beforeSend: function () {
                loadFlag=false;
            },
            success: function (data) {
                var result=data.data;
                if(result.length){
                    var html="";
                    $.each(result, function (i,item) {
                        html+=' <li><a href="" data-lat="'+item.latitude+'" data-lng="'+item.longitude+'"><img src="http://images.autostreets.com/'+item.photoUrl+'" alt=""/><h3 class="title">'+item.title+'</h3><span class="addr">'+item.address+'</span><i class="arrow"></i></a></li>';
                    });
                    $('#offline ul').append(html);
                    loadFlag=true;
                }
            }
        });

    };
   loadOffline();
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    window.onscroll = function () {
        var s_t = document.documentElement.scrollTop || document.body.scrollTop;
        var doc_h = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (s_t + winH + 100 >= doc_h && loadFlag) {
            current += 1;
            loadOffline();
        }
    };
}
