/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
var imgurl="http://images.autostreets.com/";$.ajax({type:"GET",url:"http://wap.autostreets.com/auctionVehicle/findAdvertise",dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getActivityList",cache:!1,success:function(e){var t="",a="";$.each(e.data,function(e,i){t+='<li><a href="'+i.clickUrl+"\" onClick=\"_traceEvent('Wap拍卖大厅焦点图','点击','"+i.name+"','10','false')\"\" ><img class=\"index_ad\" src=\""+imgurl+i.photoUrl+'" alt=""/></a></li>',a+="<li>"+i.name+"</li>"}),$(".slider>ul").empty().append(t),$(".slider .text ul").empty().append(a),$(".slider").swipeSlide({speed:4e3,trigger:".trigger",continuousScroll:!0,lazyLoad:!0,callback:function(e,t,a){$(".text li").eq(e).show().siblings().hide()}})}});