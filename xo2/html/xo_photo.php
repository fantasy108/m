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

<div class="border2">

    <header>

        <div class="logo clearfix">

            <img src="/img/logo.png" alt="" class="logo">

        </div>

    </header>

    <ul class="photoList">

        <!--data属性为大图地址-->

        <?php foreach($dir as $_v):?>

        <li><img src="<?=$path?>/s/<?=$_v?>" alt="" data="<?=$path?>/b/<?=$_v?>"></li>

        <?php endforeach; ?>



    </ul>

    <div class="clearfix"></div>

    <div class="btn3">

        <a href="/xo" class="back">返回</a>

    </div>

</div>



<!--弹出大图-->

<div class="big_photo">

    <div class="big_img"><img src="" alt=""></div>

</div>



<div class="bg"></div>



</body>

<script src="/js/lib/zepto.min.js"></script>

<script src="/js/main1.js?v=<?php echo time()?>"></script>

</html>