
$(function(){
    $('.process2').each(function(){
        $(this).children('li').eq(0).addClass("bold")
        $(this).children('li').eq(1).removeClass("bold")
        $(this).children('li').eq(1).children('span').removeClass("cur")
    })

    $('.group').show()
    $('.personal').hide()
    $('#group').attr('checked',true)

    customerNeeds()

    $('#remark').val().length < 101 ? $('.remark_amount span').text($('#remark').val().length) : $('.remark_amount span').text('100')
    $('#other_remark').val().length < 101 ? $('.other_remark_amount span').text($('#other_remark').val().length) : $('.other_remark_amount span').text('100')

    var remark_amount = 0
    var other_remark_aomout = 0
    $('#remark').bind('input','propertychange',function(){
        if(remark_amount<100){
            var amount = $(this).val().length
            $('.remark_amount span').text(amount)
        }else{
            $('.remark_amount span').text('100')
        }
    })
    $('#other_remark').bind('input','propertychange',function(){
        if(other_remark_aomout<100){
            var amount = $(this).val().length
            $('.other_remark_amount span').text(amount)
        }else{
            $('.other_remark_amount span').text('100')
        }
    })
    $('.other_radio input').on('click',function(){
        if($(this).hasClass('cur')){
            $(this).removeClass('cur').siblings('input').addClass('cur')
        }else{
            $(this).addClass('cur').siblings('input').removeClass('cur')
        }
    })
    $('.from_select input').on('click',function(){
    	if($(this).attr('id') == 'group'){
    		$('.group2').show();$('.personal').hide()
    	}else{
    		$('.group2').hide();$('.personal').show()
    	}
    })

    $('#group_name select').change(function(){
        detail_shop($(this).find('option').not(function(){ return !this.selected }).index())
    })

    $('#province select').change(function(){
        province_selected($(this).find('option').not(function(){ return !this.selected }).text())
    })

    $('#sale_need select').change(function(){
        sale_need_selected($(this).find('option').not(function(){ return !this.selected }).text())
    })

    $('.describe').on('click',function(){
    	popup2('需要更新车辆描述吗(确定后车辆描述将重置)')
    })

    $('.cancel').on('click',function(){
        popdown2()
    })

    $('.correct').on('click',function(){
        popdown2()
        checkItemCollect()
    })

    $('.damagePhoto1,.damagePhoto2,.damagePhoto3').on('click',function(){
        var str = $(this).attr('class')
        var _num = str.substr(str.length-1,1)
        switch(_num){
            case '1':
                $('#file1').click()
                break;
            case '2':
                $('#file2').click()
                break;
            case '3':
                $('#file3').click()
        }
        //document.addEventListener('touchmove',bodyScroll, false);
    })

    $('#file1,#file2,#file3').on('click',function(){
        $('.gesture').show()
        var str = $(this).attr('id')
        var _num = str.substr(str.length-1,1)
        switch(_num){
            case '1':
                $('#clipArea1').show()
                $('#view1,#save1').hide()
                $('#clipBtn1').show()
                $('.clip_pop1 .process2').children('li').eq(1).removeClass("bold").children('span').removeClass('cur')
                break;
            case '2':
                $('#clipArea2').show()
                $('#view2,#save2').hide()
                $('#clipBtn2').show()
                $('.clip_pop2 .process2').children('li').eq(1).removeClass("bold").children('span').removeClass('cur')
                break;
            case '3':
                $('#clipArea3').show()
                $('#view3,#save3').hide()
                $('#clipBtn3').show()
                $('.clip_pop3 .process2').children('li').eq(1).removeClass("bold").children('span').removeClass('cur')
        }
    })
    
    $("#save1,#save2,#save3").on('click',function(){
        $('body').css('position','static')
        $(this).hide()
        var str = $(this).attr('id')
        var _num = str.substr(str.length-1,1)
        switch(_num){
            case '1':
                $('.clip_pop1').removeClass('layer_show2')
                $('#view1').hide()
                var _imgUrl = canvas1.toDataURL('image/jpeg')
                dataUrl.push({photoOrder : 1,photoUrl : _imgUrl})
                $('.damagePhoto1').prop('src',_imgUrl)

                $('#need_photo2').show()
                $('#clipArea1 .photo-clip-rotateLayer img').attr('src','')
                break;
            case '2':
                $('.clip_pop2').removeClass('layer_show2')
                $('#view2').hide()
                var _imgUrl = canvas2.toDataURL('image/jpeg')
                dataUrl.push({photoOrder : 2,photoUrl : _imgUrl})
                $('.damagePhoto2').prop('src',_imgUrl)

                $('#need_photo3').show()
                $('#clipArea2 .photo-clip-rotateLayer img').attr('src','')
                break;
            case '3':
                $('.clip_pop3').removeClass('layer_show2')
                $('#view3').hide()
                var _imgUrl = canvas3.toDataURL('image/jpeg')
                dataUrl.push({photoOrder : 3,photoUrl : _imgUrl})
                $('.damagePhoto3').prop('src',_imgUrl)
                $('#clipArea3 .photo-clip-rotateLayer img').attr('src','')
        }
            
        
    })
    $('.canvas_close').on('click',function(){
        $(this).parent().parent().removeClass('layer_show2')
        $('body').css('position','static')
    })

    $('#sale_pr input,#start_pr input,#bottom_pr input').blur(function(){
        var _val = $(this).val()
        if(_val <=0 || parseInt(_val) != _val){
            alert('价格必须大于零且为整数')
            $(this).val('')
        }else{
            if(_val.toString().length > 13){
                alert('价格不得大于13位')
                $(this).val('')
            }
        }
    })
})

var _width = $('.damagePhoto1').width()
var _height = $('.damagePhoto1').height()
var canvas1 = document.getElementById('myCanvas1');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('myCanvas2');
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById('myCanvas3');
var ctx3 = canvas3.getContext('2d');

$("#clipArea1").photoClip({
    width: _width-20,
    height: _height-20,
    file: "#file1",
    view: "#view1",
    ok: "#clipBtn1",
    loadStart: function() {
        console.log("照片读取中");
    },
    loadComplete: function() {
        console.log("照片读取完成");
        $('.clip_pop1').addClass('layer_show2')
        $('body').css('position','fixed')
    },
    clipFinish: function(dataURL) {
        $('.gesture').hide()
        $('.clip_pop1 .process2').children('li').eq(1).addClass("bold").children('span').addClass('cur')
        $('#clipArea1,#clipBtn1').hide()
        $('#view1').show()
        $('#save1').css('display','inline-block')
        $('#myCanvas1').prop({width:_width,height:_height})

        var imgbox = new Image();
        imgbox.src = dataURL;
        imgbox.onload = function(){
            ctx1.drawImage(imgbox,0,0,_width,_height)
        }
    }
});

$("#clipArea2").photoClip({
    width: _width-20,
    height: _height-20,
    file: "#file2",
    view: "#view2",
    ok: "#clipBtn2",
    loadStart: function() {
        console.log("照片读取中");
    },
    loadComplete: function() {
        console.log("照片读取完成");
        $('.clip_pop2').addClass('layer_show2')
        $('body').css('position','fixed')
    },
    clipFinish: function(dataURL) {
        $('.gesture').hide()
        $('.clip_pop2 .process2').children('li').eq(1).addClass("bold").children('span').addClass('cur')
        $('#clipArea2,#clipBtn2').hide()
        $('#view2').show()
        $('#save2').css('display','inline-block')
        $('#myCanvas2').prop({width:_width,height:_height})

        var imgbox = new Image();
        imgbox.src = dataURL;
        imgbox.onload = function(){
            ctx2.drawImage(imgbox,0,0,_width,_height)
        }
    }
});

$("#clipArea3").photoClip({
    width: _width-20,
    height: _height-20,
    file: "#file3",
    view: "#view3",
    ok: "#clipBtn3",
    loadStart: function() {
        console.log("照片读取中");
    },
    loadComplete: function() {
        console.log("照片读取完成");
        $('.clip_pop3').addClass('layer_show2')
        $('body').css('position','fixed')
    },
    clipFinish: function(dataURL) {
        $('.gesture').hide()
        $('.clip_pop3 .process2').children('li').eq(1).addClass("bold").children('span').addClass('cur')
        $('#clipArea3,#clipBtn3').hide()
        $('#view3').show()
        $('#save3').css('display','inline-block')
        $('#myCanvas3').prop({width:_width,height:_height})

        var imgbox = new Image();
        imgbox.src = dataURL;
        imgbox.onload = function(){
            ctx3.drawImage(imgbox,0,0,_width,_height)
        }
    }
});

var bodyScroll = function(e){ 
    e.preventDefault(); 
}
