/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function touchScroll(t){if("ontouchstart"in document){var e=(document.getElementById(t),0);document.getElementById(t).addEventListener("touchstart",function(t){e=this.scrollTop+t.touches[0].pageY},!1),document.getElementById(t).addEventListener("touchmove",function(t){this.scrollTop=e-t.touches[0].pageY},!1)}}function preventScroll(t){t.preventDefault()}var siteurl="/html/usedcar/sync/";$(function(){function t(){var t="http://wap.autostreets.com/auction/find&length="+s+"&current="+i;l&&(l=!1,$.ajax({url:t,type:"GET",dataType:"jsonp",jsonp:"jsoncallback",scriptCharset:"GBK",jsonpCallback:"getSyncList",cache:!1,beforeSend:function(){n.show()},success:function(t){var t=t.data;if(n.hide(),!t.length)return void(l=!1);var e="";$.each(t,function(t,s){var i="",n=s.acutionModelDesc,l=s.sid;n=n?'<p class="modelDesc">'+n+"</p>":"",3==s.status?i="status_end":null,e+='<div id="'+l+'" class="sync_list_item"><h2 class="title">'+s.title+"</h2>"+n+'<p class="time">'+new Date(s.startTimestamp).Format("yyyy年M月d日 hh:mm")+" - "+new Date(s.endTimestamp).Format("yyyy年M月d日 hh:mm")+'</p><div class="sub_info"><ul><li class="address">'+s.city+'</li><li>|</li><li class="quantity">'+s.vehicleQuantity+" 辆</li><li>|</li><li>"+s.auctionMargin+'</li></ul></div><span class="status '+i+'" data-status="'+s.status+'">'+s.statusDesc+"</span></div>"}),$(".sync_list").append(e),$(".sync_list_item").click(function(){window.localStorage&&(localStorage.id=$(this).prop("id"),localStorage.title=$(this).find(".title").html(),localStorage.time=$(this).find(".time").html(),localStorage.address=$(this).find(".address").html(),localStorage.quantity=$(this).find(".quantity").html(),localStorage.modelDesc=$(this).find(".modelDesc").html()),window.location.href=siteurl+"sync_info.html?id="+$(this).prop("id")}),l=!0}}))}var e=document.body.clientHeight||document.body.clientHeight,s=10,i=1,n=$("#loading"),l=!0;window.onscroll=function(){var s=document.body.scrollTop||document.documentElement.scrollTop,n=document.body.scrollHeight||document.documentElement.scrollHeight;s+e+50>=n&&l&&(i+=1,t())},t()}),Date.prototype.Format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t};