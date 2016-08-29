/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
$(function(){var i="http://img.autostreetscdn.com/m/build/1.00/js/discount.json";$.ajax({type:"GET",url:i,dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getlist",cache:!1,success:function(i){$("#halflist").empty(),$.each(i,function(i,s){var e="<li><div class='li_inner'><a href='javascript:void(0)'><div><img src='"+s.src+"'><h3>"+s.name+"</h3><p>"+s.intro+"</p><strong>&yen;"+s.n_price+"万</strong><del>&yen;"+s.o_price+"万</del></div></a></div></li>";1==s.sold&&(e="<li><div class='li_inner'><a href='javascript:void(0)'><div><img src='"+s.src+"'><h3>"+s.name+"</h3><p>"+s.intro+"</p><strong>&yen;"+s.n_price+"万</strong><del>&yen;"+s.o_price+"万</del><img src='http://img.autostreetscdn.com/m/build/1.00/images/sold.png' class='sold'/></div></a></div></li>"),$("#halflist").append(e)})}});sessionStorage.isapp&&($("header").hide(),$(".app_back_menu").show())});