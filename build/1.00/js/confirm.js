/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
$(function(){var e=request(),t=!1;if(localStorage.maintainitem){var a=localStorage.maintainitem,i=JSON.parse(a),o="";$.each(i,function(e,t){o+='<li><i class="select"></i><p id="'+t.id+'">'+t.name+"</p>"}),$("#maintain_item").append(o);var n=$("#maintain_item li").eq(0).children("p");-1==n.attr("id")&&n.text("未选择，需要到店确认")}else $(".maintain_tit").eq(0).hide();if(e.packageId)packageDetail(e.packageId);else if(localStorage.packageitem){var c=localStorage.packageitem,r=JSON.parse(c);if(r&&r.length>0){var s="";$.each(r,function(e,t){var a=t.old_price.replace("￥",""),i=t.new_price.replace("￥","");s+='<li><p id="'+t.id+'">'+t.name+'</p><i>¥<span data-oldPrice="'+a+'">'+i+"</span></i></li>"}),$(".discount").append(s),priceAmount()}else r.length<=0&&($(".dc_package").hide(),$(".payment").hide(),$(".confirm_pay .wrap p").hide(),$(".confirm_pay .wrap a").text("预约确认"));$(".booking_time a").attr("href","bm_time.html?orgSid="+e.orgSid)}var d=$(".shop_info .wrap");if(sessionStorage.shopInfo){var l,m=sessionStorage.shopInfo;l=JSON.parse(m),d.children("h3").text(l.name),d.children("img").attr("src",l.src),d.children("p").text(l.addr),d.children("p").attr("id",l.orgSid)}else d.children("h3").text(e.orgNameAbbr),d.children("p").attr("id",e.orgSid),d.children("img").attr("src",imgUrl+e.brandLogo),d.children("p").text(e.address);if(e.payment?$(".payment").find("p").text(e.payment):!1,e.date||e.time){if(e.discount&&""!=e.discount&&"null"!=e.discount){var o="";o='<span class="off">'+e.discount+"</span>",$(".detail").prepend(o)}$(".booking_time .txt").text(e.date+" "+e.time)}if("false"==e.conSwitch&&e.packageId?(e.date&&e.time&&autoSeleCon(e.orgSid,e.date+" "+e.time),t=!1,$(".has_con").removeClass("open_icon").addClass("close_icon")):e.consultSid?(consultantDetail2(e.consultSid),t=!0,$(".has_con").removeClass("close_icon").addClass("open_icon")):"true"==e.conSwitch?($(".has_con").removeClass("close_icon").addClass("open_icon"),$(".con_name").text(e.conName),$(".con_name").attr("id",e.consultSid),t=!0):("false"==e.conSwitch||"undefined"==e.conSwitch)&&(e.date&&e.time&&autoSeleCon(e.orgSid,e.date+" "+e.time),t=!1,$(".has_con").removeClass("open_icon").addClass("close_icon")),sessionStorage.my_cust_vehicle_info){var h=sessionStorage.my_cust_vehicle_info,p=JSON.parse(h),o="<li><p>"+p.selledName+"</p></li>";$(".maintain_car").append(o)}if(sessionStorage.member_info){var _=sessionStorage.member_info,S=JSON.parse(_);$("#name").val(void 0==S.name?"":S.name),$("#mobile").val(void 0==S.cellphone?"":S.cellphone)}$(".payment a").attr("href","bm_payment.html"+location.search+"&conSwitch="+t),$(".maintain_tit").live("click",function(){var e=$(this).children("ins");e.hasClass("arrow-down")?(e.removeClass("arrow-down").addClass("arrow-up"),$(this).next("ul").hide()):(e.removeClass("arrow-up").addClass("arrow-down"),$(this).next("ul").show())}),$(".has_con").live("click",function(){$(this).hasClass("open_icon")?($(this).removeClass("open_icon").addClass("close_icon"),t=!1,$(".off").hide(),$(".detail .txt").text(""),$(".con_name").text("")):$(this).hasClass("close_icon")&&(e.packageId?(t=!0,window.location.href="bm_sele_consultant.html"+location.search+"&conSwitch="+t+"&orgSid="+$(".shop_info>.wrap>p").attr("id")):(t=!0,window.location.href="bm_sele_consultant.html"+location.search+"&conSwitch="+t))}),$(".confirm_pay .wrap").children("a").click(function(){return""==$("#name").val()||""==$("#mobile").val()?(popup("请完善您的订单信息"),!1):mobile($("#mobile").val())?(popup("手机号格式错误"),!1):void((""==$(".detail .txt").text()||""==$(".con_name").text())&&popup("请完善您的订单信息"))}),$(".correct").click(function(){popdown()}),$(".booking_time a").live("click",function(){var a=$(this).attr("href");if(e.packageId&&0==t)e.date||e.time?$(this).attr("href",a+"&packageId="+e.packageId+"&conSwitch="+t+"&date="+e.date+"&time="+e.time):$(this).attr("href",a+"&packageId="+e.packageId+"&conSwitch="+t);else if(e.packageId){var i=$(".con_name").text();""==i?e.date||e.time?$(this).attr("href","bm_time.html"+location.search+"&conSwitch="+t):$(this).attr("href",a+"&packageId="+e.packageId):e.date||e.time?$(this).attr("href","bm_time.html"+location.search+"&conSwitch="+t+"&conName="+i+"&consultSid="+$(".con_name").attr("id")):$(this).attr("href",a+"&packageId="+e.packageId+"&conName="+i+"&consultSid="+$(".con_name").attr("id"))}else e.consultSid?0==t?e.date||e.time?$(this).attr("href","bm_time.html?orgSid="+e.orgSid+"&date="+e.date+"&time="+e.time+"&conSwitch="+t):$(this).attr("href","bm_time.html?orgSid="+e.orgSid+"&conSwitch="+t):1==t&&(e.date||e.time?$(this).attr("href","bm_time.html?orgSid="+e.orgSid+"&consultSid="+e.consultSid+"&date="+e.date+"&time="+e.time+"&conSwitch="+t):$(this).attr("href","bm_time.html?orgSid="+e.orgSid+"&consultSid="+e.consultSid+"&conSwitch="+t)):e.date||e.time?$(this).attr("href",a+"&conSwitch="+t+"&date="+e.date+"&time="+e.time):$(this).attr("href",a+"&conSwitch="+t)})});