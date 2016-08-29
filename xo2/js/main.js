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
                        alert(data);
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
                        alert('验证码发送失败！');
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
                alert('请输入正确的手机号！');
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
    })
    $('.bg').live('click',function(){
        $('.big_photo,.bg').hide()
    })  

})
function
        checkMobile(str) {
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


