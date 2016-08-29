$(function(){
	var myScroll;
	myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });

	var obj = request();
	if(obj.consultSid == 'undefined' || !obj.consultSid){
		var consultSid = '';
	}
	if(obj.consultSid){
		var consultSid = obj.consultSid;
	}
	//var consultSid = obj.consultSid != 'undefined' ? obj.consultSid : '';
	schedules(obj.orgSid,consultSid)

	var date = '',time = '',discount = '';
	$('#scroller>ul>li').live('click',function(){
		$(this).addClass('cur').siblings().removeClass('cur')
		var _index = $('#scroller>ul>li').index(this)
		$('.time_list').eq(_index).show().siblings().hide();
	})

	$('.schedules>ul[id^="time_list_"]>li').live('click',function(){
		if($(this).hasClass('none')){
			return false;
		}else{
			$(this).addClass('cur').siblings().removeClass('cur')
			$(this).parent().siblings().children('li').removeClass('cur')
		}
	})
	
	var flag = false;
	$('.find_him a').click(function(){
		$('#scroller>ul>li').each(function(){
			if($(this).hasClass('cur')){
				date = $(this).children('p').attr("id")
				return false;
			}
		})
		$('.schedules>ul[id^="time_list_"]>li').each(function(){
			if($(this).hasClass('cur')){
				time = $(this).children('p').text()
				discount = $(this).children('span').text()
				flag = true;
				return false;
			}
		})
		if(!flag){
			popup('请选择保养时间')
		}else{
			if(obj.date || obj.time){
				if(obj.packageId){
					$(this).attr('href','bm_confirm.html?orgSid='+obj.orgSid+ '&date=' +date+ '&time=' +time+'&discount='+discount+'&conSwitch='+obj.conSwitch+'&consultSid='+obj.consultSid+'&conName='+obj.conName+'&packageId='+obj.packageId)
				}else if(obj.consultSid){
					$(this).attr('href','bm_confirm.html?orgSid='+obj.orgSid+ '&date=' +date+ '&time=' +time+'&discount='+discount+'&conSwitch='+obj.conSwitch+'&consultSid='+obj.consultSid+'&conName='+obj.conName)
				}else{
					$(this).attr('href','bm_confirm.html?orgSid='+obj.orgSid+ '&date=' +date+ '&time=' +time+'&discount='+discount+'&conSwitch='+obj.conSwitch+'&conName='+obj.conName)
				}
			}else{
				$(this).attr('href','bm_confirm.html'+location.search+ '&date=' +date+ '&time=' +time+'&discount='+discount)
			}
		}
	})

	$('.correct').click(function(){
		popdown()
	})

	$('#more').click(function(){
		$('.active_calendar').show()
		$('#tipbg').show()
	})

	$('.calendar_date .row p').live("click",function(){
		if($(this).hasClass('enable') || $(this).hasClass('today')){
		
		$(this).addClass('cur').siblings().removeClass('cur').parent().siblings(".row").children('p').removeClass('cur');
			var selectTime = dateTrans($(this).attr('id'))
			var scrollerObj = $('#scroller>ul>li')
			scrollerObj.each(function(){
				if($(this).children('p').text() == selectTime){
					var _index = scrollerObj.index(this)
					//console.log(selectTime,_index)
					myScroll.scrollToElement(scrollerObj.eq(_index)[0], 1000)
					scrollerObj.eq(_index).click()
					return false;
				}
			})
			$('.active_calendar').hide()
			$('#tipbg').hide()
		}
	})
});