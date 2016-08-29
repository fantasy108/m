/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function ui_fix(){$("body").addClass("ui_fix"),document.body.addEventListener("touchmove",preventScroll)}function ui_auto(){$("body").removeClass("ui_fix"),document.body.removeEventListener("touchmove",preventScroll)}function preventScroll(o){o.preventDefault()}$(".loginBtn").on("click",function(){ui_fix(),$(".more_sub").addClass("show_more_sub"),$(".ui_mask").addClass("ui_mask_show")}),$(".cancel_login,.ui_mask").on("click",function(){ui_auto(),$(".more_sub").removeClass("show_more_sub"),$(".ui_mask").removeClass("ui_mask_show")});