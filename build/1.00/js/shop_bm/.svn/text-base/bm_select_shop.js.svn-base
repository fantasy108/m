/**
 * binqing.liu
 * @version v1.00
 * Modify-Date:2015-9-28 14:49:11
 */
$(function(){$("#shop_list").on("click",".unselect_img",function(){$(this).hasClass("unselect_img")?($(this).removeClass("unselect_img").addClass("select_img"),$(this).parent().siblings().children("i").removeClass("select_img").addClass("unselect_img")):$(this).removeClass("select_img").addClass("unselect_img")}),$(".confirm_sele").on("click",function(){$("#shop_list li").each(function(){if($(this).children("i").hasClass("select_img")){var i=$(this).find(".logoList").children("li").eq(0).children("img").attr("data"),s=$(this).find("h3").text(),e=$(this).find("p.shop").eq(1).text(),t=$(this).find("h3").attr("id");window.location.href="bm_by_order.html?orgSid="+t;var l={orgSid:t,src:imgUrl+i,name:s,addr:e};localStorage.shopInfo=JSON.stringify(l)}})})});