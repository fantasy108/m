/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
$(function(){var i=request();consultantDetail(i.consultSid),$(".checkmore").live("click",function(){$(this).hide(),$("#packageList ul li").show()}),$(".find_him a").live("click",function(){if(sessionStorage.scviSid){var i=$(".go_shop").attr("id"),e=$(".addr .wrap"),c=e.children("img").attr("src"),t=e.children("h3").text(),n=e.children("p").text(),r={orgSid:i,src:c,name:t,addr:n};sessionStorage.shopInfo=JSON.stringify(r),isMatchOrgan(i)}else require(["custVehicle"],function(i){i.newVehicle()})}),$(".correct").click(function(){popdown()})});