/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
function bm_api(){function t(){var t="",e=!0;for(var r in this)e?(t+="?"+r+"="+this[r],e=!1):t+="&"+r+"="+this[r];return t}var e=this,r=arguments[0],i=arguments[1]?e+t.call(arguments[1]):e,a=arguments[2];$.ajax({type:"GET",url:i,dataType:"jsonp",jsonp:"jsoncallback",beforeSend:function(){"undefined"==typeof a&&(loadFlag=!1),loadingIcon.show()},success:function(t){console.log(t.data),"undefined"==typeof a?t.success?t.data.length||isNotEmptyObj(t.data)?(r(t),loadFlag=!0):(1==current&&r(t),loadFlag=!1):(r(t),successPop("warning_icon",t.msg,1e3)):r(t),loadingIcon.hide()}})}function scrollLoading(t){loadFlag=!0,window.onscroll=function(){var e=document.documentElement.scrollTop||document.body.scrollTop,r=document.documentElement.scrollHeight||document.body.scrollHeight;e+winH+150>=r&&loadFlag&&(current++,t())}}function searchHistshow(t){searchBot.show(),searchHistDom.show(),$(".his_list").empty();for(var e=0;e<t.length;e++)$(".his_list").append('<li><a href="javascript:void(0)" >'+t[e]+"</a></li>")}function pushHisSearch(t){""!=t&&(searchHisArr.push(t),localStorage.shopSearchHistory=JSON.stringify(unique(searchHisArr)))}function unique(t){for(var e=[],r={},i=0;i<t.length;i++)r[t[i]]||(e.push(t[i]),r[t[i]]=1);return e}function uiFix(t){t.preventDefault(),$("body").addClass("uiFix")}function uiAuto(){document.body.removeEventListener("touchmove",uiFix),$("body").removeClass("uiFix")}function getConfigParamsList(){function t(t){var e=t.data.maintainLocation,r="adviser"==pageType?t.data.consultantSort:t.data.maintainPackageSort;currentCity=t.extras.currentCity,currentSortTypeTxt=t.extras.sortType,$.each(e,function(t,e){cls=0==t?"condition":"",$(".province_list").append('<li id="province_'+t+'" class="province '+cls+'">'+e.province+"</li>"),0!=t&&citiesArr.push(e.cityList)}),provinceScroll.refresh(),currentCity==allCountry?($(".province").eq(0).addClass("curr sel"),currentProvince=allCountry):$.each(citiesArr,function(t,e){$.each(e,function(e,r){return r==currentCity?(currentCityIdx=t+"_"+e,currProvIdx=t,$(".city_list").empty(),$.each(citiesArr[currProvIdx],function(e,r){$(".city_list").append('<li id="city_'+currProvIdx+"_"+e+'" data-id="'+t+"_"+e+'" class="city condition">'+r+"</li>")}),$("#city_"+currentCityIdx).addClass("curr"),cityScroll.scrollToElement($("#city_"+currentCityIdx)[0],300),provinceScroll.scrollToElement($(".province_list li").eq(currProvIdx)[0],300),$(".province").eq(currProvIdx).addClass("curr").siblings().removeClass("curr"),void(currentProvince=$(".province_list li").eq(currProvIdx).html())):void 0})}),$("#location").html(currentCity),$("#sort_by").html(currentSortTypeTxt),$.each(r,function(t,e){e.value==currentSortTypeTxt?(cls="curr",currentSortTypeVal=t+1):cls="",$(".sort_list").append('<li data-type="'+e.key+'" class="sort_by condition '+cls+'">'+e.value+"</li>")}),doEachSearch()}bm_api.call(maintenancePort.getConfigParams,t,{paramIds:paramIds,lat:lat,lng:lng},!1)}function doEachSearch(){switch($(".data_wrap").empty(),current=1,pageType){case"package":packageFn();break;case"shop":shop();break;case"adviser":consultantList();break;case"sele_shop":organList()}}function scrollMe(t,e){$(t).find(".iScrollVerticalScrollbar").remove();var r,i;return"horizon"==e?(r=!0,i=!1):(r=!1,i=!0),"undefined"!=typeof IScroll?new IScroll(t,{click:scrollClick,scrollX:r,scrollY:i,scrollbars:!0,mouseWheel:!0,interactiveScrollbars:!1,shrinkScrollbars:"scale",fadeScrollbars:!0}):void 0}function successPop(t,e,r){$("body").append('<div class="popUp_wrap"><div class="success_pop UI_animated UI_speed_fast UI_ani_bounceIn"><span class="pop_icon '+t+'"></span><p>'+e+"</p></div></div>"),setTimeout(function(){$(".success_pop").addClass("UI_ani_bounceOut"),setTimeout(function(){$(".popUp_wrap").remove()},300)},r)}function showUiMask(){uiMask.addClass("ui_show")}function hideUiMask(){uiMask.removeClass("ui_show")}function noResult(t){return result='<li id="no_result" class="no_result"><div class="no_result_pic"></div><p>'+t+"</p></li>"}function TransformEnd(t,e){t[0].addEventListener("webkitTransitionEnd",e())}function isNotEmptyObj(t){for(var e in t)return!0;return!1}function GetQueryString(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),r=decodeURIComponent(window.location.search).substr(1).match(e);return null!=r?decodeURI(r[2]):null}function request(){var t=location.search,e=new Object;if(-1!=t.indexOf("?")){var r=t.substr(1);strs=r.split("&");for(var i=0;i<strs.length;i++)e[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1])}return e}function createScore(t){for(var e="",r=/^[0-9]*[1-9][0-9]*$/,i=1;6>i;i++)e+=r.test(t)?t>=i?'<span class="level level_'+i+'"><i class="full"></i></span>':'<span class="level level_'+i+'"><i></i></span>':i<=Math.floor(t)?'<span class="level level_'+i+'"><i class="full"></i></span>':i==Math.ceil(t)?'<span class="level level_'+i+'"><i style="width:'+100*(t-Math.floor(t))+'%"></i></span>':'<span class="level level_'+i+'"><i></i></span>';return e}function getLocal(){var t=localStorage.searchHistory;his=JSON.parse(t);var e="";$.each(his,function(t,r){e+="<li>"+r+"</li>"}),$(".search_main>ul").html(e)}function setLocal(){$(".search_main").hide(),localStorage.searchHistory=JSON.stringify(his)}function isRepeat(t){for(var e=!1,r=his.length,i=0;r>i;i++)his[i]==t&&(e=!0);return e}($(".select_module").length||$("#bm_complete_car").length)&&FastClick.attach(document.body);var host=location.host,uiMask=$(".ui_mask"),sitUrl="http://wx.autostreets.com/",staticUrl=sitUrl+"html/shop_bm/";if("wx.com"==host)var staticUrl="http://wx.com/src/html/shop_bm/";else var staticUrl=sitUrl+"html/shop_bm/";var imgUrl="http://images.autostreets.com/",maintenancePort=maintenancePort||{},headerH=document.querySelectorAll("header")[0].offsetHeight,winW=document.documentElement.clientWidth||document.body.clientWidth,winH=document.documentElement.clientHeight||document.body.clientHeight;maintenancePort.getConfigParams=sitUrl+"common/getConfigParams",maintenancePort.packageList=sitUrl+"maintenPackage/list",maintenancePort.packageDetail=sitUrl+"maintenPackage/detail",maintenancePort.isMatchPackage=sitUrl+"maintenPackage/isMatchPackage",maintenancePort.shopList=sitUrl+"maintainOrganization/list",maintenancePort.shopDetail=sitUrl+"maintainOrganization/detail",maintenancePort.isMatchOrgan=sitUrl+"maintainOrganization/isMatchOrgan",maintenancePort.getMsg=sitUrl+"coupon/getMsg",maintenancePort.couponList=sitUrl+"coupon/list",maintenancePort.carBrands=sitUrl+"customerVehicle/selectBrands",maintenancePort.carSeries=sitUrl+"customerVehicle/selectSeries",maintenancePort.selectModel=sitUrl+"customerVehicle/selectModel",maintenancePort.createMyCar=sitUrl+"customerVehicle/create",maintenancePort.myCarList=sitUrl+"customerVehicle/list",maintenancePort.myCarDetail=sitUrl+"customerVehicle/detail",maintenancePort.orderList=sitUrl+"maintainOrder/list",maintenancePort.orderDetail=sitUrl+"maintainOrder/detail",maintenancePort.getPosition=sitUrl+"/position/selectPositionByIp";var current=1,loadingIcon=$("#loading"),loadFlag,position_option={enableHighAccuracy:!0,maximumAge:3e4,timeout:1e3},lat="",lng="",getCurrentLatLon=function(t){bm_api.call(maintenancePort.getPosition,function(e){lat=e.data.latitude,lng=e.data.longitude,"function"==typeof t&&t()})},searchFlag=!1,hisFlag=!0,searchCount=0,search=search||{},searchDom=$(".search_module"),searchBtn=$(".search_btn"),searchIpt=$(".search_ipt"),searchCancel=$(".cancel_search"),searchHistDom=$(".sea_history"),clearHist=$(".clear_his"),searchTop=$(".sea_top"),searchBot=$(".sea_bot"),searchHisArr=[];searchBtn.on("click",function(){searchDom.show(),searchBot.show(),uiFix(event)}),searchCancel.on("click",function(){searchShopName="",searchFlag&&doEachSearch(),searchDom.hide(),searchHistDom.hide(),$(".his_list").empty(),searchFlag=!1,hisFlag=!0,uiAuto()}),searchIpt.on("focus",function(){localStorage.shopSearchHistory&&searchHistshow(JSON.parse(localStorage.shopSearchHistory)),hisFlag=!1}),searchIpt.on("blur",function(){}),clearHist.on("click",function(){searchHistDom.hide(),$(".his_list").empty(),localStorage.removeItem("shopSearchHistory"),searchHisArr=[]}),searchHistDom.on("click","a",function(){searchShopName=$(this).html(),searchIpt.val(searchShopName),$("#search_form").submit()}),$("#search_form").submit(function(){return searchShopName=$.trim(searchIpt.val()),$(".bm_shop_list").empty(),doEachSearch(),searchBot.hide(),searchIpt.blur(),uiAuto(),pushHisSearch(searchShopName),searchFlag=!0,!1});var allCountry="全国省市",currentProvince="",currentCity="",currentSortTypeTxt="",scviSid=localStorage.defaultVid?localStorage.defaultVid:"",memberSid=sessionStorage.memberSid?sessionStorage.memberSid:"",searchShopName=$.trim(searchIpt.val()),currentSortTypeVal="",currProvIdx=0,currentCityIdx=0;if($(".select_module").length){var provinceScroll=scrollMe(".area_l"),cityScroll=scrollMe(".area_r"),citiesArr=[[]];pageType=$(".select_module").data("type");var paramIds="adviser"==pageType?[401,402,403,404]:[401,402,403];getCurrentLatLon(getConfigParamsList)}var k=0;$(".sm_hd_item").on("click",function(){var t=$(this).index(),e=$(".sm_bd_item").eq(t);if($(".toggle_down").length)if(k==t)e.removeClass("toggle_down"),hideUiMask();else{var r=e.siblings();r.removeClass("toggle_down"),e.toggleClass("toggle_down"),showUiMask()}else e.addClass("toggle_down"),showUiMask();$(this).find(".w_9_arr").toggleClass("toggle_arr"),$(this).siblings().find(".w_9_arr").removeClass("toggle_arr"),$(".city_list").empty(),$.each(citiesArr[currProvIdx],function(t,e){$(".city_list").append('<li id="city_'+currProvIdx+"_"+t+'" data-id="'+currProvIdx+"_"+t+'" class="city condition">'+e+"</li>")}),0!=currentCityIdx&&($("#city_"+currentCityIdx).addClass("curr"),cityScroll.refresh(),cityScroll.scrollTo(0,0,0,IScroll.utils.ease.quadratic),cityScroll.scrollToElement($("#city_"+currentCityIdx)[0],300)),$(".province_list li").eq(currProvIdx).length&&provinceScroll.scrollToElement($(".province_list li").eq(currProvIdx)[0],300),$(".province").eq(currProvIdx).addClass("curr").siblings().removeClass("curr"),k=t}),$(".sm_bd_item").on("click","li",function(){$(this).addClass("curr").siblings().removeClass("curr")}),$(".province_list").on("click",".province",function(){var t=$(this).index();$(this).hasClass("condition")&&(currentProvince=allCountry,currProvIdx=0,currentCity=allCountry,currentCityIdx=0),$(".city_list").empty(),$.each(citiesArr[t],function(e,r){$(".city_list").append('<li id="city_'+t+"_"+e+'" data-id="'+t+"_"+e+'" class="city condition">'+r+"</li>")}),cityScroll.refresh(),$("#city_"+currentCityIdx).length?($("#city_"+currentCityIdx).addClass("curr"),cityScroll.scrollToElement($("#city_"+currentCityIdx)[0],300)):cityScroll.scrollTo(0,0,0,IScroll.utils.ease.quadratic),0==$(this).index()&&($("#location").html($(this).html()),$(this).addClass("sel"),currProvIdx=0,currentCityIdx=0)}),$(".city_list").on("click","li",function(){var t=$(this).html();$(this).addClass("curr"),$("#location").html(t),$(".province_list li").first().removeClass("sel"),currentCity=t,currentCityIdx=$(this).data("id"),currentProvince=$(".province.curr").html(),currProvIdx=$(".province.curr").index()}),$(".sort_list").on("click","li",function(){$(this).addClass("curr"),$("#sort_by").html($(this).html()),currentSortTypeVal=$(this).data("type")}),$(".sm_bd_item").on("click",".condition",function(){doEachSearch(),intiAllStatus()}),$(".top_menu li").last().find("a").on("click",function(){return sessionStorage.scviSid?void 0:(require(["custVehicle"],function(t){t.newVehicle(staticUrl+"bm_maintain.html")}),!1)}),uiMask.on("click",function(){$(".error_layer").hide(),intiAllStatus()});var intiAllStatus=function(){$(".sm_bd_item").removeClass("toggle_down"),hideUiMask(),$(".w_9_arr").removeClass("toggle_arr")},_getScript=function(t,e){var r=document.getElementsByTagName("head")[0],i=document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("src",t),r.appendChild(i);var a=function(){"function"==typeof e&&e()};document.all?i.onreadystatechange=function(){("loaded"==i.readyState||"complete"==i.readyState)&&a()}:i.onload=function(){a()}},scrollClick=!0;if(/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)&&(scrollClick=!1),$("#my_car").length&&/Android/i.test(navigator.userAgent)){var s=navigator.userAgent.substr(navigator.userAgent.indexOf("Android")+8,3);if(5>s){$("#drive_date").attr({readonly:!0,type:"text"});var currYear=(new Date).getFullYear(),opt={preset:"date",theme:"default",display:"modal",mode:"scroller",lang:"zh",dateFormat:"yyyy-mm",setText:"确定",cancelText:"取消",dateOrder:"yyyymm",dayText:"日",monthText:"月",yearText:"年",showNow:!1,nowText:"今",startYear:currYear-50,endYear:currYear};$("#drive_date").mobiscroll(opt)}}var getCookie=function(t){var e,r=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(r))?e[2]:null};Date.prototype.Format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in e)new RegExp("("+r+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[r]:("00"+e[r]).substr((""+e[r]).length)));return t};var his=[];localStorage.searchHistory?getLocal():setLocal();var search={show:function(){$("#search_top>input").focus(function(){localStorage.searchHistory?getLocal():setLocal();var t=$(document).height();$("#search").show(),$(".search_main").css("height",t).show()})},searHistory:function(){$(".search_main").on("click","li",function(){var t=$(this).text();$("#con_name").val(t),search.searPort(t)})},searSubmit:function(){$("#search_top").submit(function(){var t=$("#con_name").val();return search.searPort(t),!1})},clear:function(){$(".clearHis").click(function(){localStorage.removeItem("searchHistory"),his=[],$(".search_main>ul").html(""),$(".search_main").hide()})},searPort:function(t){isRepeat(t)||his.push(t),$("#search").css("height","auto"),setLocal(),$(".search_main").hide(),$("#shop_list").html(""),searchShop(t)},init:function(){this.show(),this.searHistory(),this.searSubmit(),this.clear()}};search.init();