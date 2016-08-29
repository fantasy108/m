/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
var validate={input:function(t,r){return""!=t.val()?!0:($(".error_txt").text(r),void this.show())},price:function(t,r,i){if(""==t.val())$(".error_txt").text(r),this.show();else{if(this.isDigital(t.val()))return!0;$(".error_txt").text(i),this.show()}},mobile:function(t,r,i){if(""==t.val())$(".error_txt").text(r),this.show();else{if(this.isMobile(t.val()))return!0;$(".error_txt").text(i),this.show()}},mail:function(t,r,i){if(""==t.val())$(".error_txt").text(r),this.show();else{if(this.isEmail(t.val()))return!0;$(".error_txt").text(i),this.show()}},password:function(t,r,i){if(""==t.val())$(".error_txt").text(r),this.show();else{if(this.isPassword(t.val()))return!0;$(".error_txt").text(i),this.show()}},same:function(t,r,i){return t.val()==r.val()?!0:($(".error_txt").text(i),void this.show())},select:function(t,r,i){return t!=r?!0:($(".error_txt").text(i),void this.show())},isDigital:function(t){var r=/^\d+(\.\d+)?$/;return r.exec(t)?!0:!1},isMobile:function(t){var r=/^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;return r.exec(t)?!0:!1},isEmail:function(t){var r=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return r.exec(t)?!0:!1},isPassword:function(t){var r=/^[a-zA-z0-9]{6,}$/g;return r.exec(t)?!0:!1},show:function(){$(window).scrollTop();$(".error_layer").css("position","fixed").show(),$(".tipbg").show()},hide:function(){$(".correct").click(function(){$(".error_layer").hide(),$(".tipbg").hide()})},init:function(){this.hide()}};validate.init();var calculator={current:function(){$(".calculator li").click(function(){$(this).addClass("cur").siblings().removeClass("cur");var t=$(".calculator li").index(this);0==t?($("#calc_0").show(),$("#calc_1").hide()):($("#calc_1").show(),$("#calc_0").hide())})},monthLoan:function(t,r,i){var e=Math.pow(1+r/100,i),s=1e4*t*r/100*e/(e-1);return s.toFixed(2)},_corpus:function(t,r,i){var e=Math.pow(1+r/100,i),s=t/(r/100*e/(e-1))+parseInt($("#calc_1 .first_pay").val());return s.toFixed(2)},figure:function(t){var r="'"+t+"'",r=r.split("").reverse().join("").replace(/(\d{3})/g,"$1,").replace(/\,$/,"").split("").reverse().join("").replace("'","").replace("'","");return","==r.substr(0,1)&&(r=r.replace(",","")),r},init:function(){this.current()}};calculator.init();var repair={selectable:function(){$(".package .baoyang").eq(0).click(function(){$(this).hasClass("cur")?$(this).removeClass("cur"):($(this).addClass("cur"),$(".package .baoyang").eq(1).removeClass("cur"))}),$(".package .baoyang").eq(1).click(function(){$(this).hasClass("cur")?$(this).removeClass("cur"):($(this).addClass("cur"),$(".package .baoyang").eq(0).removeClass("cur"))}),$(".project ul li").click(function(){$(this).hasClass("cur")?$(this).removeClass("cur"):$(this).addClass("cur")})},isProject:function(){return $(".package div").hasClass("cur")||$(".project ul li").hasClass("cur")?!0:($(".error_txt").text("请选择您的保养项目"),validate.show(),!1)},init:function(){this.selectable()}};repair.init();