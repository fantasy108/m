/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t);return null!=a?a[2]:null}function insertTitle(e){var t=document.createElement("title");t.innerHTML=e;var a=document.getElementsByTagName("link")[0];a.parentNode.insertBefore(t,a),_daq.push(["_setAccount","wap"]),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://da":"http://da")+".autostreets.com/da.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()}var _infourl="http://wap.autostreets.com/noHaggle/loadVehicleBySid?&fpSid="+GetQueryString("id"),_usedcar_pay_url="http://wap.autostreets.com/html/usedcar/pay.html",imgurl="http://images.autostreets.com/";$(function(){var e=document.documentElement.clientWidth||document.body.clientWidth;$.ajax({type:"GET",url:_infourl,dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getinfo",cache:!1,success:function(t){if(console.dirxml(t.data),sessionStorage.vehicleDetails=JSON.stringify(t.data),window.sessionStorage&&(sessionStorage.storeName=t.data.orgStore,sessionStorage.storeAdd=t.data.orgStoreAddr,sessionStorage.storeTime=t.data.orgServiceTime,sessionStorage.storeTel=t.data.orgPhone,sessionStorage.vehicleTitle=t.data.vehicleTitle),$(".storeName").html(t.data.orgStore),$("#id_title").html(t.data.vehicleTitle),insertTitle(t.data.vehicleTitle),$("#infodetail_price").html(t.data.hidden?"面议":t.data.price/1e4+" <ins>万元</ins>"),$("#newCar_price").html((t.data.suggestionPrice/1e4).toFixed(2)),$("#detaillink").attr("href","competitive_detail_info.html?vehicleSid="+t.data.vehicleSid),$.each(t.data.vehicleAttribute,function(e,t){"表显里程"==t.key&&(t.value=t.value+"万公里"),"首次上牌"==t.key&&(t.value=new Date(t.value).Format("yyyy年M月")),"原车牌号"==t.key&&(t.value=t.value.substr(0,2));var a="<li><span>"+t.key+"</span>："+(t.value||"")+"</li>";$("#vehicleAttribute").append(a)}),$("#scroller").width(e*t.data.vehiclePhotoList.length),3!=t.data.fpStatus)$(".tel_400_body").empty().append("<span class='no_status'>"+t.data.fpStatusDesc+"</span>");else{if(t.data.canOrder)var a='<a class="tel_400" href="javascript:;" id="prePay">在线预订</a><a class="tel_400-1" href="tel:400-821-8889">预约看车</a>';else var a='<a class="tel_400-1 only_tel" href="tel:400-821-8889">预约看车</a>';$(".tel_400_body").append(a),$("#prePay").click(function(){require(["userUtils"],function(){userUtils.login(_usedcar_pay_url)})})}var i;i=new iScroll("scroller_wrap",{snap:!0,momentum:!1,hScrollbar:!1,lockDirection:!1,vScroll:!1,fixedScrollbar:!0,onScrollStart:function(e){e.preventDefault()},onScrollEnd:function(){}}),$.each(t.data.vehiclePhotoList,function(t,a){var i="<li style='width:"+e+"px'><img src='"+imgurl+a+"'></li>";$("#thelist").append(i)}),$("#scroller").width(e*t.data.vehiclePhotoList.length);{var l=$(window).width(),r=$("#scroller li").length;$("#indicator li").length}if($("#scroller li").width(l),$("#scroller li img").width(l),$("#nav").width(l),$("#scroller").height(Math.ceil(l/640*453)),r>1)for(var o="",n=1;r>n;n++)1==n&&(o+='<li class="active"></li>'),o+="<li></li>";$("#indicator").append(o);var i;i=new iScroll("scroller_wrap",{snap:!0,momentum:!1,hScrollbar:!1,lockDirection:!1,vScroll:!1,fixedScrollbar:!0,onScrollStart:function(e){e.preventDefault()},onScrollEnd:function(){document.querySelector("#indicator > li.active").className="",document.querySelector("#indicator > li:nth-child("+(this.currPageX+1)+")").className="active"}}),$("#vehicleDesc").html(t.data.vehicleDesc)}})}),Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in t)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[a]:("00"+t[a]).substr((""+t[a]).length)));return e};var _daq=_daq||[];