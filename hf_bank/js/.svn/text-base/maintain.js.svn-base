$(function(){
	maintenItems();

	$('.maintain_item>li').live('click',function(){
		var obj = $(this).children('i')
		if(obj.hasClass('unselect')){
			obj.removeClass('unselect').addClass('select')
		}else{
			obj.removeClass('select').addClass('unselect')
		}
		var obj2 = $('.maintain_item>li')
		var _index = obj2.index(this)
		if(_index != 0){
			var flag = false;
			obj2.each(function(){
				if($(this).children('i').hasClass('select'))flag = true
			})
			if(!flag){
				obj2.eq(0).children('i').removeClass('unselect').addClass('select')
			}else{
				obj2.eq(0).children('i').removeClass('select').addClass('unselect')
			}
		}else{
			obj2.eq(0).children('i').removeClass('unselect').addClass('select').parent().siblings().children('i').removeClass('select').addClass('unselect')
		}
	})
	
	$('.want_maintain').find('a').click(function(){
		var items = []
		$('#maintain_item li').each(function(){
			if( $(this).children('i').hasClass('select') ){
				var obj = {id: $(this).children('p').attr('id'),name: $(this).children('p').text()}
				items.push(obj)
			}
		})
		// console.log(items)
		localStorage.maintainitem = JSON.stringify(items); 
		var obj = request();
		if(obj.consultSid && obj.orgSid){
			$(this).attr('href','bm_by_order.html?consultSid='+obj.consultSid+'&orgSid='+obj.orgSid)
		}else if(obj.orgSid){
			$(this).attr('href','bm_by_order.html?orgSid='+obj.orgSid)
		}else{
			$(this).attr('href','bm_select_shop.html')
		}
	})

	$('.change').live('click',function(){
		require(["custVehicle"], function(custVehicle) {
			custVehicle.changeVehicle();
		});
	})
})