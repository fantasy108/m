/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function is_weixn(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)?!0:!1}function hideWeixinMask(){uiMask.removeClass("ui_mask_show"),document.querySelector(".share_to_img").style.display="none"}function GetQueryString(e){var s=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=decodeURIComponent(window.location.search).substr(1).match(s);return null!=t?decodeURI(t[2]):null}Object.prototype.hasClass=function(e){return this.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))},Object.prototype.addClass=function(e){this.hasClass(e)||(this.className+=" "+e)},Object.prototype.removeClass=function(e){if(this.hasClass(e)){var s=new RegExp("(\\s|^)"+e+"(\\s|$)");this.className=this.className.replace(s,"")}},is_weixn()&&$("header").hide();var CLICK="ontouchstart"in document?"tap":"click",shareBtn=document.querySelector("#share_btn"),uiMask=document.querySelectorAll(".ui_mask")[0],uiPopWrap=document.querySelectorAll(".ui_pop_wrap")[0],uiPop=document.querySelectorAll(".ui_pop")[0],imgurl="http://images.autostreets.com/";shareBtn.addEventListener(CLICK,function(){uiMask.addClass("ui_mask_show"),is_weixn()?document.querySelector(".share_to_img").style.display="block":(uiPop.addClass("zoomIn"),uiPopWrap.style.visibility="visible")}),uiPopWrap.addEventListener(CLICK,function(){var e,s=this;clearTimeout(e),uiPop.removeClass("zoomIn"),uiPop.addClass("zoomOut"),e=setTimeout(function(){uiMask.removeClass("ui_mask_show"),uiPop.removeClass("zoomOut"),s.style.visibility="hidden"},300)}),uiPop.addEventListener(CLICK,function(e){e.stopPropagation()}),uiMask.addEventListener(CLICK,function(){hideWeixinMask()}),document.querySelector(".share_to_img").addEventListener(CLICK,function(){hideWeixinMask()}),sessionStorage.memberSid&&!GetQueryString("referenceId")?window.location.href+="?referenceId="+sessionStorage.memberSid+"&referenceWay=2":sessionStorage.memberSid&&GetQueryString("referenceId")?($("header section").append('<a href="javascript:history.go(-1);" class="back"></a>推荐有礼'),$(".has_login").show(),$.ajax({url:"https://login.autostreets.com/member/share",dataType:"jsonp",jsonp:"jsoncallback",jsonpCallback:"getImg",data:{memberSid:sessionStorage.memberSid,referenceWay:2},success:function(e){function s(){var e=JSON.parse(sessionStorage.member_info).cellphone;return e.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")}e.success&&($(".qrcode").prop("src",imgurl+e.data.shareImg),$(".user_name").html(s()))}})):GetQueryString("referenceId")&&!sessionStorage.memberSid&&$(".un_login").show();