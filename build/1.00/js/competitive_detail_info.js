/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t);return null!=a?a[2]:null}function insertTitle(e){var t=document.createElement("title");t.innerHTML=e;var a=document.getElementsByTagName("link")[0];a.parentNode.insertBefore(t,a),_daq.push(["_setAccount","wap"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://da":"http://da")+".autostreets.com/da.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()}var _infourl="http://wap.autostreets.com/webApp/getVehicleBaseInfo?vehicleSid="+GetQueryString("vehicleSid"),_getCarFrameListurl="http://wap.autostreets.com/webApp/getCarFrameList?vehicleSid="+GetQueryString("vehicleSid"),_getCarAppearanceListurl="http://wap.autostreets.com/webApp/getCarAppearanceList?vehicleSid="+GetQueryString("vehicleSid"),_getCarCockpitList="http://wap.autostreets.com/webApp/getCarCockpitList?vehicleSid="+GetQueryString("vehicleSid"),_getCarAttachment="http://wap.autostreets.com/webApp/getCarAttachment?vehicleSid="+GetQueryString("vehicleSid"),imgurl="http://images.autostreets.com/",w=document.documentElement.clientWidth||document.body.clientWidth,bigW=w/522;$(function(){function e(e,t,a,i){$.ajax({type:"GET",url:e,dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:a,cache:!1,success:function(e){$.each(e.data,function(e,a){if(!a.good){""==a.damageStatusSelected&&(a.damageStatusSelected="有损伤");var n=a.damagePhoto.split(",",1),r="<li><a href='"+imgurl+n+"' class='right openimg'>"+a.damageStatusSelected+"</a>"+a.itemOrder+". "+a.itemName+"</li>";$("#"+t).append(r);var c="<span class='frameico' style='left:"+a.axisy*bigW+"px;top:"+a.axisx*bigW+"px'>"+a.itemOrder+"<span>";$("#"+i).append(c)}}),0==$("#"+t+" li").length&&($("#"+t).append("<li style='text-align:center; border:0px;'>该车辆此检测项完好无损伤</li>"),$("#"+t).parent().css("border","0px"))}})}$.ajax({type:"GET",url:_infourl,dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getinfo",cache:!1,success:function(e){e.data.certified&&$("#eqs").show(),$("#conditionGrade").html(e.data.conditionGrade),$("#frameScore").html(e.data.frameScore),$("#zhijian").html("质检时间："+new Date(e.data.assessmentDatetime).Format("yyyy年M月d日")),$.each(e.data.vehicleDetailInfo,function(e,t){"排气量"==t.key&&(t.value=t.value+"L");var a="<li><span class='right'>"+t.value+"</span>"+t.key+"</li>";$("#vehicleDetailInfo").append(a)}),$.each(e.data.featureItem,function(e,t){var a="<li class='dateon'>"+t+"</li>";$("#featureItem").append(a)})}}),$.ajax({type:"GET",url:_getCarAttachment,dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getCarAttachment",cache:!1,success:function(e){$.each(e.data,function(e,t){var a="<li><span class='right'>"+t.value+"</span>"+t.key+"</li>";$("#getCarAttachment").append(a)})}}),e(_getCarFrameListurl,"getCarFrameListurl","getCarFrameListurl","getCarFrameListbox"),e(_getCarAppearanceListurl,"getCarAppearanceListurl","getCarAppearanceListurl","getCarAppearanceListbox"),e(_getCarCockpitList,"getCarCockpitList","getCarCockpitList","getCarCockpitListbox"),$(".right").live("click",function(){function e(e,t){if(!(a-20>e&&t<i-$("header").height()-20)){var n=Math.min((a-20)/e,(i-$("header").height()-20)/t);$(".viewImg").css({width:n*e,height:n*t,marginTop:(i-n*t)/2})}}var t=document.createElement("div"),a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,i=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,n=$(this).prop("href"),r=new Image;return t.className="winBg",document.body.appendChild(t),r.src=n,r.className="viewImg",document.body.appendChild(r),$(".winBg,.viewImg").click(function(){$(".viewImg").hide().remove(),$(".winBg").hide().remove()}),r.complete?e(r.width,r.height):r.onload=function(){e(r.width,r.height)},!1}),$("#tab li").click(function(){$("#tab li").removeClass("on"),$("#tab1box,#tab2box,#tab3box,#tab4box,#tab5box").hide(),$(this).addClass("on"),$("#"+$(this).attr("id")+"box").show()})}),Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in t)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[a]:("00"+t[a]).substr((""+t[a]).length)));return e};var _daq=_daq||[];insertTitle(sessionStorage.vehicleTitle);