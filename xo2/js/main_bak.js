/*Javascript*/

$(function(){
	$('.code').bind('input',function(){
		if($('.mobile').val() && $('.code').val()){
			$('.btn .enter').addClass('cur')
		}else{
			$('.btn .enter').removeClass('cur')
		}
	})

	var flag = true;
	var obj = $('.get_code');
	obj.bind('click',function(){
		if(flag){
			flag = false;
			var second = 60
			obj.text('等待 '+ second +' s...')
			var time = setInterval(function(){
				if(second==0){
					clearInterval(time)
					obj.text('重新发送')
					flag = true
				}else{
					second--
					obj.text('等待 '+ second +' s...')
				}
			},1000)
		}
	})

	var photo = $('.photoList li')
	var len = photo.length
	photo.each(function(){
		var index = photo.index(this)
		if((index+1)%4==0)$(this).css('margin-right','0')
	})	
	photo.bind('click',function(){
		var _height = $(document).height()
		$('.bg').css('height',_height)
		var src = $(this).children('img').attr('data')
		$('.big_photo img').attr('src',src)
		$('.big_photo,.bg').show()
	})
	$('.big_photo img').bind('click',function(){
		$('.big_photo,.bg').hide()
	})

})



