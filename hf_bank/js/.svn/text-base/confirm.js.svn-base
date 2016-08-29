$(function(){
	/*获取数据*/
	var obj = request();
	
	var conSwitch = false;
	if(localStorage.maintainitem){
		var str = localStorage.maintainitem
		var maintainitem = JSON.parse(str)
		var html = ''
	    $.each(maintainitem,function(i,item){
	    	html += '<li><i class="select"></i><p id="'+item.id+'">'+item.name+'</p>'
	    })
	    $('#maintain_item').append(html)
	    var item_name = $('#maintain_item li').eq(0).children('p')
	    if(item_name.attr('id') == -1){
	    	item_name.text('未选择，需要到店确认')
	    }
	}else{
		$('.maintain_tit').eq(0).hide()
	}
    
    if(obj.packageId){
    	packageDetail(obj.packageId)
    }else if(localStorage.packageitem){
    	var str2 = localStorage.packageitem
		var packageitem = JSON.parse(str2)
		if(packageitem && packageitem.length > 0){
	    	var html2 = ''
		    $.each(packageitem,function(i,item){
		    		var oPrice = item.old_price.replace('￥','')
		    		var nPrice = item.new_price.replace('￥','')
		    		html2 += '<li><p id="'+item.id+'">'+item.name+'</p><i>¥<span data-oldPrice="'+oPrice+'">'+nPrice+'</span></i></li>'
		    })
		    $('.discount').append(html2)
		    priceAmount()
	    }else if(packageitem.length <= 0){
	    	$('.dc_package').hide()
	    	$('.payment').hide()
	    	$('.confirm_pay .wrap p').hide()
	    	$('.confirm_pay .wrap a').text('预约确认')
	    }
	    $('.booking_time a').attr('href','bm_time.html?orgSid='+ obj.orgSid)
    }

	var _info = $('.shop_info .wrap')
	if(sessionStorage.shopInfo){
		var item,str3 = sessionStorage.shopInfo;
    		item = JSON.parse(str3);
    		_info.children('h3').text(item.name)
		_info.children('img').attr('src',item.src)
		_info.children('p').text(item.addr)
		_info.children('p').attr('id',item.orgSid)
	}else{
		_info.children('h3').text(obj.orgNameAbbr)
		_info.children('p').attr('id',obj.orgSid)
		_info.children('img').attr('src',imgUrl+obj.brandLogo)
		_info.children('p').text(obj.address)
	}
	
	obj.payment ? $('.payment').find('p').text(obj.payment) : false;
	
	if(obj.date || obj.time){
		if( obj.discount && obj.discount != '' && obj.discount != "null"){
			var html = ''
			html = '<span class="off">'+obj.discount+'</span>'
			$('.detail').prepend(html)
		}
		$('.booking_time .txt').text(obj.date+' '+obj.time)
	}

	if(obj.conSwitch == 'false' && obj.packageId){
		if(obj.date && obj.time){
			autoSeleCon(obj.orgSid,obj.date+' '+obj.time)
		}
		conSwitch = false;
		$('.has_con').removeClass('open_icon').addClass('close_icon')
	}else if(obj.consultSid){
		consultantDetail2(obj.consultSid)
		conSwitch = true
		$('.has_con').removeClass('close_icon').addClass('open_icon')
	}else if(obj.conSwitch=='true'){
		$('.has_con').removeClass('close_icon').addClass('open_icon')
		$('.con_name').text(obj.conName)
		$('.con_name').attr("id",obj.consultSid)
		conSwitch = true
	}else if(obj.conSwitch == 'false' || obj.conSwitch == 'undefined'){
		if(obj.date && obj.time){
			autoSeleCon(obj.orgSid,obj.date+' '+obj.time)
		}
		conSwitch = false;
		$('.has_con').removeClass('open_icon').addClass('close_icon')
	}

	if(sessionStorage.my_cust_vehicle_info){
		var str4 = sessionStorage.my_cust_vehicle_info;
		var poi = JSON.parse(str4)
		var html = '<li><p>'+poi.selledName+'</p></li>'
		$('.maintain_car').append(html)
	}
	
	if(sessionStorage.member_info){
		var str5 = sessionStorage.member_info;
		var member = JSON.parse(str5)
		member.name == undefined ? $('#name').val('') : $('#name').val(member.name)
		member.cellphone == undefined ? $('#mobile').val('') : $('#mobile').val(member.cellphone)
	}
	
	$('.payment a').attr('href','bm_payment.html'+ location.search + '&conSwitch='+conSwitch)
	/*点击事件*/

	$('.maintain_tit').live('click',function(){
		var ins = $(this).children('ins')
		if(ins.hasClass('arrow-down')){
			ins.removeClass('arrow-down').addClass('arrow-up')
			$(this).next('ul').hide()
		}else{
			ins.removeClass('arrow-up').addClass('arrow-down')
			$(this).next('ul').show()
		}
	})
	$('.has_con').live('click',function(){
		if($(this).hasClass('open_icon')){
			$(this).removeClass('open_icon').addClass('close_icon')
			conSwitch = false;
			$('.off').hide()
			$('.detail .txt').text('')
			$('.con_name').text('')
		}else if($(this).hasClass('close_icon')){
			if(obj.packageId){
				conSwitch = true;
				window.location.href = 'bm_sele_consultant.html'+ location.search + '&conSwitch='+conSwitch + '&orgSid=' + $('.shop_info>.wrap>p').attr('id')
			}else{
				conSwitch = true;
				window.location.href = 'bm_sele_consultant.html'+ location.search + '&conSwitch='+conSwitch
			} 
		}
	})


	
	$('.confirm_pay .wrap').children('a').click(function(){
		if($('#name').val() == '' || $('#mobile').val() == ''){
			popup('请完善您的订单信息');
			return false;
		}else if(mobile($('#mobile').val())){
			popup('手机号格式错误');
			return false;
		}else if( $('.detail .txt').text() == '' ||  $('.con_name').text() == ''){
			popup('请完善您的订单信息');
		}else{
			//alert('ok')
		}
	})
	
	$(".correct").click(function(){
		popdown()
	})

	$('.booking_time a').live('click',function(){
		var _this = $(this).attr('href')
		if(obj.packageId && conSwitch == false){
			if(obj.date || obj.time){
				$(this).attr('href',_this+'&packageId='+obj.packageId + '&conSwitch='+conSwitch+'&date='+obj.date+'&time='+obj.time)
			}else{
				$(this).attr('href',_this+'&packageId='+obj.packageId + '&conSwitch='+conSwitch)
			}
		}else if(obj.packageId){
			var _con_name = $('.con_name').text();
			if( _con_name == ''){
				if(obj.date || obj.time){
					$(this).attr('href','bm_time.html' +location.search + '&conSwitch='+conSwitch)
				}else{
					$(this).attr('href',_this+'&packageId='+obj.packageId)
				}
			}else{
				if(obj.date || obj.time){
					$(this).attr('href','bm_time.html'+location.search + '&conSwitch='+conSwitch + '&conName=' + _con_name+'&consultSid='+$('.con_name').attr('id'))
				}else{
					$(this).attr('href',_this+'&packageId='+obj.packageId + '&conName=' + _con_name+'&consultSid='+$('.con_name').attr('id'))
				}
			}
		}else if(obj.consultSid){
			if(conSwitch == false){
				if(obj.date || obj.time){
					$(this).attr('href','bm_time.html?orgSid='+ obj.orgSid + '&date='+obj.date+'&time='+obj.time + "&conSwitch=" + conSwitch)
				}else{
					$(this).attr('href','bm_time.html?orgSid='+ obj.orgSid + '&conSwitch=' + conSwitch)
				}
			}else if(conSwitch == true){
				if(obj.date || obj.time){
					$(this).attr('href','bm_time.html?orgSid='+ obj.orgSid + '&consultSid=' + obj.consultSid + '&date='+obj.date+'&time='+obj.time + "&conSwitch=" + conSwitch)
				}else{
					$(this).attr('href','bm_time.html?orgSid='+ obj.orgSid + '&consultSid=' + obj.consultSid + "&conSwitch=" + conSwitch)
				}
			}
		}else{
			if(obj.date || obj.time){
				$(this).attr('href',_this + "&conSwitch=" + conSwitch+'&date='+obj.date+'&time='+obj.time)
			}else{
				$(this).attr('href',_this + "&conSwitch=" + conSwitch)
			}
			
		}
	})
})
