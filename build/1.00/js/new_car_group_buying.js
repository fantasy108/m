/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function showUiMask(){uiMask.addClass("ui_show")}function hideUiMask(){uiMask.removeClass("ui_show")}function popup(n){$(".error_txt").text(n),$(".error_layer").show(),$(".mask_bg").show()}function popdown(){$(".error_layer").hide(),$(".mask_bg").hide()}function popup2(){$(".error_layer2").show(),$(".mask_bg").show()}function popdown2(){$(".error_layer2").hide(),$(".mask_bg").hide()}function checkMobile(n){var o=/^1\d{10}$/;return o.test(n)?!0:!1}$(function(){var n=$(".ui_mask"),o=location.host;if("mwap.com"==o);else;if(n.on("click",function(){$(".zdy-option").removeClass("popShow"),$(".gift_pop").removeClass("popShow"),hideUiMask()}),$(".list_wrap").length){var a=$(".list"),s=a.find("ul");$.ajax({type:"GET",url:"http://wap.autostreets.com/newCarGroupBuying/list",dataType:"jsonp",jsonp:"jsoncallback",jsonpCallback:"drawList",success:function(n){n.length&&$.each(n,function(n,o){s.append("<li><span>"+o.tel+"</span><span>"+o.draw+"</span><span>"+o.date+"</span>&nbsp<span>"+o.time+"</span></li>")});var o=s.find("li").height();a.height(10*o),n.length>10&&setInterval(function(){s.animate({marginTop:-o},function(){s.find("li").first().appendTo(s),s.css("marginTop",0)})},2e3)}})}});