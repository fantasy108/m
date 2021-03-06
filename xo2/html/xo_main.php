<!DOCTYPE HTML>

<html>

    <head>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

        <meta name="apple-mobile-web-app-capable" content="yes">

        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <meta name="format-detection" content="telephone=no">

        <meta name="description" content="">

        <link rel="stylesheet" href="/css/b.css" type="text/css">

        <link rel="stylesheet" href="/css/xo.css?v=<?php echo time()?>" type="text/css">

    </head>

    <body>

        <div class="border">

            <header>

                <div class="logo">

                    <img src="/img/logo.png" alt="" class="logo">

                </div>

                <div class="house">

                    <img src="/img/house.png" alt="">

                </div>

            </header>

            <div class="login_content">

            <?php if (empty($date)): ?>

                <div class="login">

                    <input type="text" class="mobile" placeholder='请输入您的手机号码'>

                    <input type="text" class="code" placeholder='验证码'>

                    <a href="javascript:;" class="get_code">获取验证码</a>

                </div>

                <div class="clearfix"></div>

                <div class="btn">

                    <a href="javascript:;" class="enter">进入</a>

                </div>



            <?php endif; ?>  

            </div>

            <div class="btn2"> 

                <ul>

                    <li><a href="javascript:;" id='photo'>活动照片</a></li>

                    <li><a href="javascript:;" id='menu'>晚宴菜单</a></li>

                </ul>

            </div>



            <div class="clearfix"></div>

        </div>

        <div class="error_layer">
            <p class="error_txt"></p>
            <a href="javascript:;" class="correct">确定</a>
        </div>
        <div class="tipbg hide" id="tipbg"></div>

    </body>

    <script src="/js/lib/zepto.min.js?v=<?php echo time()?>"></script>

    <script src="/js/main1.js"></script>

    <?php if ($date): ?>

        <script>



            $(function () {

$(".login_content").hide();

                $(".btn2").show();

                $('#photo').addClass('cur');

                $('#menu').addClass('cur');

            });

        </script>

    <?php endif; ?>

</html>