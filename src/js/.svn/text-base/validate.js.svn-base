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
        }else if( !this.isPassword(obj.val()) || obj.val().length<6){
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
        if (!regex.exec(s)) return false;
        return true
    },
    //手机号验证
    isMobile:function(s){
        var regex = /^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
        if (!regex.exec(s)) return false;
        return true
    },
    //邮箱验证
    isEmail:function(s){
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.exec(s)) return false;
        return true
    },
    isPassword:function(s){
        var regex = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
        if (!regex.exec(s)) return false;
        return true
    },
    show:function(){
        $(".error_layer").show();
        $(".tipbg").show()
    },
    hide:function(){
        $(".correct").click(function(){
            $(".error_layer").hide();
            $(".tipbg").hide()
        })
    },
    init:function(){
        this.hide();
    }
};
validate.init();
