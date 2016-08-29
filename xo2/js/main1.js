/*Javascript*/

$(function () {
    var w_height = $(window).height()
    $('.border').css('height',w_height)
    window.onresize=function(){
        $('.border').css('height',w_height)
    }
    $('.code').bind('input', function () {
        if ($('.mobile').val() && $('.code').val()) {
            $('.btn .enter').addClass('cur')
        } else {
            $('.btn .enter').removeClass('cur')
        }
    })
    $('.btn .enter').bind('click', function () {
        var code = $('.code').val();
        $.post("/index.php/xo/chkCode",
                {code: code},
                function (data) {
                    if (data == 'true') {
                        $('#photo').addClass('cur');
                        $('#menu').addClass('cur');
                        $(".login_content").hide();
                        $(".btn2").show()
                    } else {
                        popup(data);
                    }
                }
        );
    })
    var flag = true;
    var obj = $('.get_code');
    var mobile = $('.mobile').val();
    obj.bind('click', function () {
        if (flag) {
            var mobile = $('.mobile').val();
            if (checkMobile(mobile)) {
                flag = false;
                $.post("/index.php/xo/sendCode",
                        {mobile: mobile},
                function (data) {
                    if (data == 'true') {
                    } else {
                        popup('验证码发送失败！');
                    }
                }
                );
                var second = 60
                obj.text('等待 ' + second + ' s...')
                var time = setInterval(function () {
                    if (second == 0) {
                        clearInterval(time)
                        obj.text('重新发送')
                        flag = true
                    } else {
                        second--
                        obj.text('等待 ' + second + ' s...')
                    }
                }, 1000)
            } else {
                popup('请输入正确的手机号！');
                return false;
            }

        }
    })

    var photo = $('.photoList li')
    var len = photo.length
    photo.each(function () {
        var index = photo.index(this)
        if ((index + 1) % 4 == 0)
            $(this).css('margin-right', '0')
    })
    photo.bind('click', function () {
        var _height = $('.border2').height()
        $('.bg').css('height', _height)
        var src = $(this).children('img').attr('data')
        $('.big_photo img').attr('src', src)
        $('.big_photo,.bg').show()
        var img = new Image(); 
        img.src = src; 
        img.onload = function () {
            var big_height = $('.big_photo img').height()
            $('.big_photo').css('margin-top',-(big_height/2)).css('height',big_height)
            $('.big_img').css('height',big_height)
        }  
    })
    $('.bg').live('click',function(){
        $('.big_photo,.bg').hide()
        $('.big_photo').css('margin-top',-80)
    })  
    $('.big_photo').on('click',function(e){
        if(event.target==this){
            $('.big_photo,.bg').hide()
            $('.big_photo').css('margin-top',-80)
        }
    })

    /*menu*/
    var img_height = w_height - $('header').height() - $('.arrow_down').height() - $('.txt').height()-30
    $('.menu').css('margin-top',img_height)
    $('.arrow_down').on('click','img',function(){
        $('html,body').animate({scrollTop:w_height},1000)
        //$(window).scrollTop(w_height,5000)
        //console.log(w_height)
    })

    $('.correct').click(function(){
        popdown()
    })
})
function checkMobile(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}
$('a#photo.cur').live('click', function () {
    window.location.href = "/xo/xo_photo";
})
$('a#menu.cur').live('click', function () {
    window.location.href = "/xo/xo_menu";
})

/*禁止微信共享*/
function onBridgeReady(){
 WeixinJSBridge.call('hideOptionMenu');
}

if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
}else{
    onBridgeReady();
}

/*弹出框*/
function popup(txt){
    $('.error_txt').text(txt);
    $('.error_layer').show();
    $('#tipbg').show()
}

function popdown(){
    $('.error_layer').hide();
    $('#tipbg').hide()
}
