/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
var CLICK="ontouchstart"in document?"tap":"click",imgurl="http://images.autostreets.com/";$.ajax({type:"GET",url:"http://wap.autostreets.com/activity/findAdvertise",dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getActivityList",cache:!1,success:function(a){var t="";$.each(a.data,function(a,o){t+='<li><a href="'+o.clickUrl+"\" onClick=\"_traceEvent('Wap焦点图','点击','"+o.name+"','10','false')\"\" ><img class=\"index_ad\" src=\""+imgurl+o.photoUrl+'" alt=""/></a></li>'}),$(".slider ul").empty().append(t),$(".slider").swipeSlide({speed:4e3,trigger:".trigger",continuousScroll:!0,lazyLoad:!0})}}),localStorage.downapp||$(".app_download").show(),$("#close_app_download").on(CLICK,function(){$(".app_download").addClass("hide_app_download"),localStorage.downapp=2});