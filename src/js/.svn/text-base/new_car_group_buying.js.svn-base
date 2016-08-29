/**
 * Created by xuelei.kong on 2015/9/2.
 */
$(function () {
    var uiMask = $('.ui_mask');//渐变遮罩
    var sitUrl = "http://img.autostreetscdn.com/";
    var host = location.host;
    if (host == "mwap.com") {
        var staticUrl = "http://mwap.com/src/html/new_car_group_buying/";
    } else {
        var staticUrl = sitUrl + "m/build/1.00/html/new_car_group_buying/";

    }
    
/*

    function uiFix(event) {
        event.preventDefault();
        $('body').addClass("uiFix");
    }
    function uiAuto() {
        document.body.removeEventListener('touchmove', uiFix);
        $('body').removeClass("uiFix");
    }
*/



    /*遮罩点击*/
    uiMask.on("click", function () {
        $('.zdy-option').removeClass('popShow');
        $('.gift_pop').removeClass('popShow');
        hideUiMask();
    })
   /* $(".zdy-option").on("click","li",function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var val=$(this).html();
        $('.zdy-option').removeClass('popShow');
        hideUiMask();
        uiAuto();
        $('.showspan').html(val)
    })*/
    /*var timer;
    $("#goBtn").click(function () {
        $('.success').addClass('popShow');
        clearTimeout(timer);
        timer=setTimeout(function () {
           window.location.href=staticUrl+"choujiang.html";
       },1000)

    })*/

    /*抽奖*/
    /*$("#ljcj").click(function () {
       $('.gift_img').addClass("gift_move");
        setTimeout(function () {
            $('.gift_img').remove();
            $("h1").html("恭喜您，获得");
            $("h2").html("1000元加油卡！");
            $("h3").show();
            $('.gift_wrap').addClass('has');
            $('.has_gift').addClass("show");
            $("#ljcj").addClass('goIdx').html('确定');
            $('.goIdx').click(function () {
                window.location.href=staticUrl+"ind.html";
            })
        },800)


        //$('.gift_pop').addClass('popShow');
        //showUiMask();
        //uiFix(event);
    })*/





    if($('.list_wrap').length){
        var list=$('.list');
        var ul=list.find("ul");
        $.ajax({
            type: "GET",
            url: "http://wap.autostreets.com/newCarGroupBuying/list",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            jsonpCallback:'drawList',
            success: function (data) {
                if(data.length){
                    $.each(data, function (i, item) {
                        ul.append('<li><span>'+item.tel+'</span><span>'+item.draw+'</span><span>'+item.date+'</span>&nbsp<span>'+item.time+'</span></li>')
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
})

function showUiMask() {
    uiMask.addClass("ui_show");
}

function hideUiMask() {
    uiMask.removeClass("ui_show");
}

/*弹出框*/
function popup(txt){
    $('.error_txt').text(txt);
    $('.error_layer').show();
    $('.mask_bg').show()
}

function popdown(){
    $('.error_layer').hide();
    $('.mask_bg').hide()
}

function popup2(){
    $('.error_layer2').show();
    $('.mask_bg').show()
}

function popdown2(){
    $('.error_layer2').hide();
    $('.mask_bg').hide()
}

function checkMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}



