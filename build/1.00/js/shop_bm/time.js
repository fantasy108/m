/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
$(function(){var i;i=new IScroll("#wrapper",{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1});var t=request();if("undefined"==t.consultSid||!t.consultSid)var c="";if(t.consultSid)var c=t.consultSid;schedules(t.orgSid,c);var s="",e="",n="";$("#scroller").on("click","li",function(){$(this).addClass("cur").siblings().removeClass("cur");var i=$("#scroller>ul>li").index(this);$(".time_list").eq(i).show().siblings().hide()}),$(".schedules").on("click",'ul[id^="time_list_"]>li',function(){return $(this).hasClass("none")?!1:($(this).addClass("cur").siblings().removeClass("cur"),void $(this).parent().siblings().children("li").removeClass("cur"))});var r=!1;$(".find_him a").click(function(){$("#scroller>ul>li").each(function(){return $(this).hasClass("cur")?(s=$(this).children("p").attr("id"),!1):void 0}),$('.schedules>ul[id^="time_list_"]>li').each(function(){return $(this).hasClass("cur")?(e=$(this).children("p").text(),n=$(this).children("span").text(),r=!0,!1):void 0}),r?t.date||t.time?t.packageId?$(this).attr("href","bm_confirm.html?orgSid="+t.orgSid+"&date="+s+"&time="+e+"&discount="+n+"&conSwitch="+t.conSwitch+"&consultSid="+t.consultSid+"&conName="+t.conName+"&packageId="+t.packageId):t.consultSid?$(this).attr("href","bm_confirm.html?orgSid="+t.orgSid+"&date="+s+"&time="+e+"&discount="+n+"&conSwitch="+t.conSwitch+"&consultSid="+t.consultSid+"&conName="+t.conName):$(this).attr("href","bm_confirm.html?orgSid="+t.orgSid+"&date="+s+"&time="+e+"&discount="+n+"&conSwitch="+t.conSwitch+"&conName="+t.conName):$(this).attr("href","bm_confirm.html"+location.search+"&date="+s+"&time="+e+"&discount="+n):popup("请选择保养时间")}),$(".correct").click(function(){popdown()}),$("#more").click(function(){$(".active_calendar").show(),$("#tipbg").show()}),$(".calendar_date .row").on("click","p",function(){if($(this).hasClass("enable")||$(this).hasClass("today")){$(this).addClass("cur").siblings().removeClass("cur").parent().siblings(".row").children("p").removeClass("cur");var t=dateTrans($(this).attr("id")),c=$("#scroller>ul>li");c.each(function(){if($(this).children("p").text()==t){var s=c.index(this);return i.scrollToElement(c.eq(s)[0],1e3),c.eq(s).click(),!1}}),$(".active_calendar").hide(),$("#tipbg").hide()}})});