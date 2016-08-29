/*Javascript*/

var validate = {
	//输入框验证
	input:function(obj,txt){
		if(obj.val() == ""){
			$(".error_txt").text(txt);this.show();
		}else{
			return true
		}
	},
	price:function(obj,txt,txt2){
		if(obj.val() == ""){
			$(".error_txt").text(txt);this.show();
		}else if( !this.isDigital(obj.val()) ){
			$(".error_txt").text(txt2);this.show();
		}else{
			return true
		}
	},
	mobile:function(obj,txt,txt2){
		if(obj.val() == ""){
			$(".error_txt").text(txt);this.show();
		}else if( !this.isMobile(obj.val()) ){
			$(".error_txt").text(txt2);this.show();
		}else{
			return true
		}
	},
	mail:function(obj,txt,txt2){
		if(obj.val() == ""){
			$(".error_txt").text(txt);this.show();
		}else if( !this.isEmail(obj.val()) ){
			$(".error_txt").text(txt2);this.show();
		}else{
			return true
		}
	},
	password:function(obj,txt,txt2){
		if(obj.val() == ""){
			$(".error_txt").text(txt);this.show();
		}else if( !this.isPassword(obj.val()) ){
			$(".error_txt").text(txt2);this.show();
		}else{
			return true
		}
	},
	same:function(obj,obj2,txt){
		if(obj.val() != obj2.val()){
			$(".error_txt").text(txt);this.show();
		}else{
			return true
		}
	},
	//选择框验证
	select:function(obj,val,txt){
		if(obj == val){
			$(".error_txt").text(txt);this.show();
		}else{
			return true;
		}
	},
	//数值验证
	isDigital:function(s){
		var regex = /^\d+(\.\d+)?$/;
	    if (!regex.exec(s)) return false
	    return true
	},
	//手机号验证
	isMobile:function(s){
		var regex = /^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
	    if (!regex.exec(s)) return false
	    return true
	},
	//邮箱验证
	isEmail:function(s){
		var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (!regex.exec(s)) return false
	    return true
	},
	isPassword:function(s){
		var regex = /^[a-zA-z0-9]{6,}$/g;
		if (!regex.exec(s)) return false
	    return true
	},
	show:function(){
		var _height = $(window).scrollTop();
//		$(".error_layer").css("top",_height/88.8889+2.2499+"rem")
        $(".error_layer").css("position","fixed").show();
		$(".tipbg").show()
	},
	hide:function(){
		$(".correct").click(function(){
			$(".error_layer").hide()
			$(".tipbg").hide()
		})
	},
	init:function(){
		this.hide();
	}
}
validate.init();

var calculator = {
	current:function(){
		$(".calculator li").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			var index = $(".calculator li").index(this);
			if(index==0){
				$("#calc_0").show();$("#calc_1").hide()
			}else{
				$("#calc_1").show();$("#calc_0").hide()
			}
		})
	},
	/*月供计算器*/
	monthLoan:function(corpus,rate,month){
		var pow = Math.pow((1+rate/100),month);
	    var loan = corpus*10000*rate/100*pow/(pow-1);
	    return loan.toFixed(2);
	},
	/*可承受车价计算器*/
	_corpus:function(loan,rate,month){
		var pow = Math.pow((1+rate/100),month);
	    var corpus = loan/(rate/100*pow/(pow-1)) + parseInt($("#calc_1 .first_pay").val());
	    //var corpus = loan*(pow-1)/(pow*rate/100) + parseInt($("#calcu2 .first").val())
	    return corpus.toFixed(2);
	},
	/*三位逗号方法*/
	figure:function(obj){
		var str= "'"+obj+"'";
	    var str= str.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('').replace("\'","").replace("\'","");
	    if(str.substr(0,1) == ",")str = str.replace("\,","")
	    return str;
	},
	init:function(){
		this.current()
	}
}
calculator.init();

var repair = {
	selectable:function(){
		/*多选套餐*/
	    $(".package .baoyang").eq(0).click(function(){
	        if(!$(this).hasClass("cur")){
	            $(this).addClass("cur")
	            $(".package .baoyang").eq(1).removeClass("cur")
	        }else{
	            $(this).removeClass("cur")
	        }
	    })
	    $(".package .baoyang").eq(1).click(function(){
	        if(!$(this).hasClass("cur")){
	            $(this).addClass("cur")
	            $(".package .baoyang").eq(0).removeClass("cur")
	        }else{
	            $(this).removeClass("cur")
	        }
	    })
	    $(".project ul li").click(function(){
	        if(!$(this).hasClass("cur")){
	            $(this).addClass("cur")
	        }else{
	            $(this).removeClass("cur")
	        }
	    })
	},
	isProject:function(){
		var flag = false;
	    if( !$(".package div").hasClass("cur") && !$(".project ul li").hasClass("cur") ){
	    	$(".error_txt").text("请选择您的保养项目");validate.show();
	        return false;
	    }else{
	        return true;
	    }
	},
	init:function(){
		this.selectable();
	}
}
repair.init();


