<!DOCTYPE HTML>

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

<meta name="apple-mobile-web-app-capable" content="yes">

<meta name="apple-mobile-web-app-status-bar-style" content="black">

<meta name="format-detection" content="telephone=no">

<meta name="description" content="">

<link rel="stylesheet" href="../css/b.css" type="text/css">

<link rel="stylesheet" href="../css/hf.css" type="text/css">

<script type="text/javascript" src="/js/jquery-1.8.3.min.js" charset="gb2312"></script>

<script type="text/javascript" src="/js/dist/lrz.bundle.js" ></script>  



</head>

<body>



<header>

	<h1>HSBC Experience Centre 2015</h1>

	<p>English Version</p>

</header>

<div class="logo">

	<img src="/img/hs/logo.png" alt="">

</div>



<div class="main_wrap2">

	<img src="/img/hs/photo_pic.png" alt="" class="people">

	<h4 style="letter-spacing:-0.8px">Enjoy your superhero moment!</h4>

	<p>Take your photo and share on WeChat Moments to get a free printed copy at the counter.</p>

	<div class="form" style="margin:0.2rem 0.1rem 0 0.2rem">

		<a href="javascript:;" class="btn" id="photo">Upload</a>

                <a href="javascript:;" class="btn2" style="display:none;">OK</a>

	</div>

	<div class="take_photo" id="box">

	<div class="fileBox"><input onchange="upload(this)" type="file" name="pic" id="aii_file" accept="image/*" capture="camera"><div></div></div>	

	</div>

	<form id="aii_upload_form" action="/hsbc/do_upload" method="POST">

        <input id="f_0" type="hidden" value="" name="img">

        </form>

</div>



</body>



<script>



function upload (a) {

    lrz(a.files[0], {

        width: 768

    })

        .then(function (rst) {

             var img        = new Image(),

            div        = document.createElement('div');

            div.appendChild(img);

            // 处理成功会执行

               img.onload = function () {

                a.parentNode.replaceChild(div,a.parentNode.childNodes[1]);

            };



            img.src = rst.base64;

            img.width =320;

            img.id = 'img1';

            $("#f_0").val(rst.base64.substr(23));

            $(".btn2").show();

            //return rst;

        })

        .catch(function (err) {

            // 处理失败会执行

        })

        .always(function () {

            // 不管是成功失败，都会执行

        })

}



$(function(){

	$('#photo').click(function(){

		$('#aii_file').click()

	});

        $('.btn2').click(function(){

		$('#aii_upload_form').submit()

	})

})

</script>

</html>