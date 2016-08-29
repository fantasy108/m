$(function(){
	var obj = request()
	consultantDetail(obj.consultSid)
	
	$(".checkmore").live('click',function(){
		$(this).hide()
		$("#packageList ul li").show()
	})

	$('.find_him a').live('click',function(){
	    if(!sessionStorage.scviSid){
	    	require(["custVehicle"], function(e) {
	    	e.newVehicle()
	    	});
	    }else{
	    	var _orgSid = $('.go_shop').attr('id')
			var _shop = $('.addr .wrap')
			var _src = _shop.children('img').attr('src')
			var _name = _shop.children('h3').text()
			var _addr = _shop.children('p').text()
			
			var item = {orgSid:_orgSid,src:_src,name:_name,addr:_addr}
			sessionStorage.shopInfo = JSON.stringify(item)

			isMatchOrgan(_orgSid)
	    }

		
	})

	$(".correct").click(function(){
		popdown()
	})
})