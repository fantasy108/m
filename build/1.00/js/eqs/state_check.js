/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
$(function(){window.onload=function(){var t=$("#container");topMethod(t)},$(".other_radio input").live("click",function(){var t=$(this);if($(this).parent().parent().data("state",1),"no"==$(this).val()){("车内是否无水泡痕迹"==$(this).parent().prev().text()||"发动机机油是否无冷却液混入"==$(this).parent().prev().text())&&$(this).parent().parent().addClass("cur");var e=$(this).parent().next();e.hasClass("leak")&&(e.show(),$(".tipbg").show().on("click",function(){return $(".leak,.tipbg").hide(),t.parent().prev().children("i").length?!1:void t.siblings("input").click()}))}else"yes"==$(this).val()&&($(this).parent().parent().removeAttr("data-damagelevelleakage").removeClass("cur"),$(this).parent().parent().children("span").find("i").remove())})}),conditionParam();var topMethod=function(t){t.scrollTop(0);for(var e=$("section").height()+$("#wrapper").height(),i=t.children(".car_title").length,a=new Array,r=0;i>r;r++){var n=t.children(".car_title").eq(r).position(),o=n.top;a.push(o-e);var l=t.children(".car_title");l.eq(r).clone(!0).removeClass("car_title").addClass("car_title2 posi_fixed float_"+r).appendTo(t)}t.children(".float_0").show();var s=$(".car_title").height(),h=0,c=!0,r=0,p=new Array;$(window).scroll(function(){var n=$(window).scrollTop();n>h?(i>r&&(c&&n>=a[r]-s&&n<a[r]&&(t.children(".float_"+(r-1)).css({position:"absolute",top:n+e}),p[r-1]=n+e,c=!1),n>=a[r]&&(t.children(".float_"+r).show().css("top",e),t.children(".float_"+(r-1)).hide(1),c=!0,r++)),h=n):h>n&&(r>0&&(c||n<=p[r-1]-s&&(t.children(".float_"+(r-1)).css({position:"fixed",top:e}).show(1),c=!0),n<=a[r-1]&&(t.children(".float_"+(r-1)).hide(1),t.children(".float_"+(r-2)).show(1),c=!1,r--)),h=n)})};