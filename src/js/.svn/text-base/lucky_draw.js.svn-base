/**
 * Created by xuelei.kong on 2015/7/15.
 */
FastClick.attach(document.body);

var uiMask = $('.ui_mask');//渐变遮罩

function showUiMask() {
    uiMask.addClass("ui_show");
}

function hideUiMask() {
    uiMask.removeClass("ui_show");
}

var wH=document.documentElement.clientHeight || document.body.clientHeight;

function hidePopWrap(){
    $('.gift_pop').removeClass('UI_ani_bounceIn').addClass('UI_ani_bounceOut');
    setTimeout(function () {
        $('.gift_pop').css({"visibility":"hidden","z-index":-1});

    },100)

    hideUiMask();
}
function showPopWrap(){
    $('.gift_pop').css({"visibility":"visible","z-index":"999"});
    $('.gift_pop').removeClass('UI_ani_bounceOut').addClass('UI_ani_bounceIn');
    showUiMask();

}
$('.open_gift').on('click', function () {
    var s_t = document.documentElement.scrollTop || document.body.scrollTop;
    $('.gift_pop').css("top",s_t+(wH-$('.gift_pop').height())/2)
    showPopWrap();
})

$('.close').on('click', function () {
    hidePopWrap();
})


if($('.list_wrap').length){
    var list=$('.list_wrap');
    var ul=list.find("ul");

    $.ajax({
        type: "GET",
        url: "http://wap.autostreets.com/lucky/list",
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        jsonpCallback:'drawList',
        success: function (data) {
            if(data.length){
                $.each(data, function (i, item) {
                    ul.append('<li><span>'+item.tel+'</span><span>'+item.draw+'</span><span>'+item.date+'</span><span>'+item.time+'</span></li>')
                })
            }

            var liH=ul.find('li').height();
            list.height(liH*10);
            if(data.length>10){
                setInterval(function () {
                    ul.animate({
                        "marginTop":-liH,
                    }, function () {
                        ul.find('li').first().appendTo(ul);
                        ul.css("marginTop",0)
                    })
                },2000)
            }


        }
    });


}

