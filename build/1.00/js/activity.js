/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function Slider(t,s){var n=function(t,s){for(i in s)t[i]=s[i];return t},e=function(t){this.slider="string"==typeof t?$(t):t,this.w=this.slider.parent().width(),this.li=this.slider.find("li"),this.index=0,this.timer=null,this.SetOptions(s),this.onStart=this.option.onStart,this.onStop=this.option.onStop,this.onFinish=this.option.onFinish,this.count=this.li.length,this.startX=0,this.startY=0,this.initX=0,this.initY=0,this.finishX=0,this.finishY=0,this.moveLi=[],this.posiArr=[],this.startTime=0,this.endTime=0,this.init()};return e.prototype={init:function(){this.resizeWin(),this.setStyle(),this.resizeWin(),this.run(),"ontouchstart"in document&&this.touchEvent()},setStyle:function(){var t=this,i=this.index-1<0?this.count-1:this.index-1;this.li.css({"-webkit-transform":"translate3d("+this.w+"px,0,0)","-webkit-transition":"all 0s"}),this.li.eq(this.index).css({"-webkit-transform":"translate3d(0,0,0)"}),this.li.eq(i).css({"-webkit-transform":"translate3d(-"+this.w+"px,0,0)"}),$.each(this.li,function(i,s){t.li.eq(i).css({left:-i*t.w})}),this.setWidth()},setWidth:function(){this.slider.width(this.count*this.w),this.li.width(this.w)},SetOptions:function(t){this.option={onStart:function(){},onStop:function(){},onFinish:function(){}},n(this.option,t||{})},prev:function(){this.moveTo.call(this,this.index--,"prev")},next:function(){this.moveTo.call(this,this.index++,"next")},run:function(){var t=this;this.timer=setInterval(function(){t.next()},3e3)},moveTo:function(){this.index>=this.count&&(this.index=0),this.index<0&&(this.index=this.count-1),this.move(arguments[1])},move:function(t){var i,s;"next"==t?(i=this.index-1<0?this.count-1:this.index-1,s=0>i-1?this.count-1:i-1,this.li.eq(this.index).css({"-webkit-transition":"all .5s ease-out","-webkit-transform":"translate3d(0,0,0)"}),this.li.eq(i).css({"-webkit-transition":"all .5s  ease-out","-webkit-transform":"translate3d(-"+this.w+"px,0,0)"}),this.li.eq(s).css({"-webkit-transition":"all 0s","-webkit-transform":"translate3d("+this.w+"px,0,0)"})):(i=this.index+1>=this.count?0:this.index+1,s=this.index-1<0?this.count-1:this.index-1,this.li.eq(this.index).css({"-webkit-transition":"all .5s  ease-out","-webkit-transform":"translate3d(0,0,0)"}),this.li.eq(i).css({"-webkit-transition":"all .5s  ease-out","-webkit-transform":"translate3d("+this.w+"px,0,0)"}),this.li.eq(s).css({"-webkit-transition":"all 0s","-webkit-transform":"translate3d(-"+this.w+"px,0,0)"})),setTimeout(this.onFinish(this.index),300)},stop:function(){clearInterval(this.timer),this.onStop()},resizeWin:function(){var t=this,i=null;$(window).resize(function(){i&&clearTimeout(i),i=setTimeout(function(){t.w=t.slider.parent().width(),t.setStyle()},30)})},touchEvent:function(){var t=this;this.slider.bind("touchstart",function(s){t.stop(),t.moveLi=[],t.posiArr=[0,-t.w,t.w],t.startX=s.touches[0].clientX,t.startY=s.touches[0].clientY;var n=t.slider.find("li").eq(i=t.index-1<0?t.count-1:t.index-1),e=t.slider.find("li").eq(j=t.index+1==t.count?0:t.index+1);t.moveLi.push(t.slider.find("li").eq(t.index),n,e),t.initX=t.startX,t.initY=t.startY,t.startTime=Date.now(),s.preventDefault()}),this.slider.bind("touchmove",function(i){var s=i.touches[0].clientX,n=i.touches[0].clientY,e=s-t.startX;for(var o in t.moveLi){var a=t.posiArr[o]+e;t.moveLi[o].css({"-webkit-transition":"all 0s","-webkit-transform":"translate3d("+a+"px,0,0)"})}t.finishX=s,t.finishY=n,i.preventDefault()}),this.slider.bind("touchend",function(i){for(var n in t.moveLi)t.moveLi[n].css({"-webkit-transform":"translate3D("+t.posiArr[n]+"px,0,0)","-webkit-transition":".5s ease-out"});s(t.initX,t.finishX),t.initX=0,t.finishX=0,setTimeout(t.run(),800)});var s=function(){var i=t.finishX-t.initX,s=t.finishY-t.initY;t.endTime=Date.now();var n=t.endTime-t.startTime;0==t.finishX||Math.abs(s)>=Math.abs(i)||n>600&&Math.abs(i)/t.w<.3||(i>0?t.prev():t.next())}}},new e(t,s)}$(function(){Slider("#slider",{onStart:function(){},onStop:function(){},onFinish:function(t){setTimeout(function(){$("#nav li").eq(t).addClass("active").siblings().removeClass("active"),$("#slide_text li").eq(t).addClass("active").siblings().removeClass("active")},300)}});var t="";$.ajax({type:"GET",url:"http://img.autostreetscdn.com/activity/build/1.00/js/cmb_integral.json",dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getaddr",cache:!1,success:function(i){$.each(i,function(i,s){t+="<ul> <li>"+s.name+"</li><li>地址："+s.addr+"</li><li>电话："+s.phone+"</li></ul>"}),$(".activity_rule").append(t)}}),sessionStorage.isapp&&($("header").hide(),$(".app_back_menu").show())});