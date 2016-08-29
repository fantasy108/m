
$(function(){
    interiorParam()

    

    var itemId;
    $('.harm_list,#checked_point').on('click','li',function(){
        $('.detail_list').height(list_height())
        $('body').css('position','fixed')
        if($(this).parent().hasClass('harm_list')){
            if($(this).find('span').text() == '是'){
                $('#input_icon').addClass('cur')
                clear_data()
            }else{
                $('#input_icon').removeClass('cur')
            }
        }else{
            if(!$(this).hasClass('cur')){
                $('#input_icon').addClass('cur')
                clear_data()
            }else{
                $('#input_icon').removeClass('cur')
            }
        }
        $('.detail_head .save').attr('id',$(this).attr('id'))
        if($(this).attr('data-photourl')){
            $('.damagePhoto').attr('src',$(this).attr('data-photourl'))
        }else{
            $('.damagePhoto').attr('src','http://img.autostreetscdn.com/m/build/1.00/images/eqs/driver_card.png')
        }
        if($(this).attr('data-showdamagestatus') == 'true'){
            $('.detail_title,.detail_list').show()
        }else{
            $('.detail_title,.detail_list').hide()
        }
        if($(this).attr('data-showdamagelevel') == 'true'){
            $('.driver_card input,.driver_card label').show()
        }else{
            $('.driver_card input,.driver_card label').hide()
        }

        var dl = $(this).attr('data-damagelevelselected')
        switch(dl){
            case '轻微':
                $('#small').prop('checked',true)
                break;
            case '一般':
                $('#normal').prop('checked',true)
                break;
            case '严重':
                $('#big').prop('checked',true)
        }
        //var ds = $(this).data('damagestatusoption')

        var len = damageStatus_4.length
        var obj = $('.detail_list')
        var html = ''
        for(var i=0;i<len;i++){
            html += '<li><p>'+damageStatus_4[i]+'</p><i></i></li>'
        }
        obj.empty().append(html)
        
        var dss = $(this).attr('data-damagestatusselected')
        if(dss){
            var _dss = dss.split(',')
            var len = _dss.length
            for(var k=0;k<len;k++){
                console.log(_dss[k])
                $('.detail_list li').each(function(){
                    if($(this).children('p').text() == _dss[k]){
                        $(this).addClass('cur')
                    }
                })
            }
        }
    	$('.harm_detail').addClass('layer_show')
    })

    $('.detail_head .save').on('click',function(){
        $('body').css('position','static')
        //$('p.harm_notice').css('z-index','-1')
        var _dls,_flag,_dss = new Array()
        var _url = $('.damagePhoto').attr('src')
        var _photourl = $('.damagePhoto').attr('data-photourl')
        if($('.driver_card input').css('display') == 'none'){
            _flag = true;
        }else{
            $('.driver_card input').each(function(){
                if($(this).prop('checked') == true){
                    _dls = $(this).next().text()
                    _flag = true;
                    return false;
                }else{
                    _flag = false;
                }
            })
        }
        if($('.detail_list').css('display') == 'none'){
            _dss = ' '
        }else{
            $('.detail_list li').each(function(){
                if($(this).hasClass('cur')){
                    _dss.push($(this).children('p').text())
                }
            })
        }
        //console.log(_flag,_dss)
        var _good;
        if(!$('#input_icon').hasClass('cur')){
            _good = false;
            if(_url == 'http://img.autostreetscdn.com/m/build/1.00/images/eqs/driver_card.png'){
                popup('请拍摄损伤照片')
                return false;
            }else if(_dss == ''){
                popup('请选择损伤状况')
                return false;
            }else if(!_flag){
                popup('请选择损伤等级')
                return false;
            }
        }else{
            _good = true;
        }
        var _id = $(this).attr('id')
        $('.harm_list li').each(function(){
            if($(this).attr('id') == _id){
                $(this).attr('data-state',1)
                $(this).attr('data-photourl',_url || _photourl)
                _dls ? _dls = _dls : _dls = '';
                _dss ? _dss = _dss : _dss = '';
                $(this).attr('data-damagelevelselected',_dls)
                $(this).attr('data-damagestatusselected',_dss)
                $(this).find('.txt').text(_dss)

                if($('#input_icon').hasClass('cur')){
                    $(this).find('span').text('是').removeClass('non')
                }else{
                    $(this).find('span').text('否').addClass('non')
                }
            }
        })
        $('#checked_point li').each(function(){
            if($(this).attr('id') == _id){
                if(!_good){
                    $(this).attr('data-state',1)
                    $(this).attr('data-photourl',_url || _photourl)
                    _flag ? _dls = _dls : _dls = '';
                    $(this).attr('data-damagelevelselected',_dls)
                    $(this).attr('data-damagestatusselected',_dss)
                    $(this).find('.txt').text(_dss)
                    $(this).addClass('cur')
                }else{
                    $(this).attr('data-state',0)
                    $(this).attr('data-photourl',_url || _photourl)
                    _flag ? _dls = _dls : _dls = '';
                    $(this).attr('data-damagelevelselected',_dls)
                    $(this).attr('data-damagestatusselected',_dss)
                    $(this).find('.txt').text(_dss)
                    $(this).removeClass('cur')
                }
            }
        })
        $('.harm_detail').removeClass('layer_show')

        var pU = _photourl ? _photourl : ''
        if(_dss == ' '){
            _dss = '';
        }else{
            _dss = _dss.join(',')
        }
        _form(parseInt(_id),_good,pU,_dss,_dls)
        $('.damagePhoto').attr('data-photourl','')
        $('.damagePhoto').attr('src','')
    })
    
    $('.detail_list').on('click','li',function(){
        if($(this).hasClass('cur')){
            $(this).removeClass('cur')
        }else{
            $(this).addClass('cur')
        }
        $('#input_icon').removeClass('cur')
    })
    $('.driver_card input').on('click',function(){
        $('#input_icon').removeClass('cur')
    })
    $('.clear_data').on('click',function(){
        if($(this).children('#input_icon').hasClass('cur')){
            $('#input_icon').removeClass('cur')
        }else{
            $('#input_icon').addClass('cur')
            itemId = $('.detail_head .save').attr('id')
            popup2('该部位是否完好（该操作会清空数据）')
        }
    })

    $('.close').on('click',function(){
        $('.harm_detail').removeClass('layer_show')
        $('body').css('position','static')
        //$('p.harm_notice').css('z-index','-1')
    })
    $('.hidden').on('click',function(){
        $('.harm_list').css('margin','0.45rem 0 0 0')
        $('.car_content').css('padding','0.1125rem')
        $('.spread').show()
        $('.harm').hide()
        $(this).hide()
    })
    $('.spread').on('click',function(){
        $('.harm_list').css('margin',0)
        $('.car_content').css('padding','3.375rem 0.1125rem 0.1125rem 0.1125rem')
        $('.hidden').show()
        $('.harm').show()
        $(this).hide()
    })
    $('.cancel').on('click',function(){
        $('.error_layer2').hide()
        $('#input_icon').removeClass('cur')
        $('#tipbg').hide()
    })

    $('.error_layer .correct').on('click',function(){
        $('.error_layer').hide()
        $('.tipbg').hide()
    })
    $('.error_layer2 .correct').on('click',function(){
        clear_data()
        $('.error_layer2').hide()
        $('#tipbg').hide()
        $('.harm_list li').each(function(){
            if($(this).attr('id') == itemId){
                $(this).attr('data-state',1)
                $(this).removeAttr('data-damagelevelselected')
                $(this).removeAttr('data-damagestatusselected')
                $(this).removeAttr('data-photourl')
                $(this).find('span').text('是').removeClass('non')
                $(this).find('.txt').text('')
                return false;
            }
        })
        $('#checked_point li').each(function(){
            if($(this).attr('id') == itemId){
                $(this).removeClass('cur')
            }
        })
    })

    /*照片上传*/
    $('.damagePhoto').on('click',function(){
        $('#file').click()
    })
    $('#file').on('click',function(){
        $('#myCanvas,.canvas_save').hide()
        $('#clipArea').show()
        $('#clipBtn').css('display','inline-block')
        $('#clear').css('display','none')
        reset()
    })
    $(".canvas_save").on('click',function(){
        init()
        dataUrl = canvas.toDataURL('image/jpeg')
        $('.damagePhoto').attr('src','').attr('src',dataUrl).attr('data-photourl',dataUrl)
        $('#input_icon').removeClass('cur')
        $('.photo-clip-rotateLayer img').attr('src','')
        document.removeEventListener('touchmove', bodyScroll, false);
    })
    $(".canvas_close").on('click',function(){
        init()
        document.removeEventListener('touchmove', bodyScroll, false);
    })
})

function clear_data(){
    $('.damagePhoto').attr('src','http://img.autostreetscdn.com/m/build/1.00/images/eqs/driver_card.png')
    $('.driver_card input').prop("checked", false)
    $('.detail_list li').each(function(){
        $(this).removeClass('cur')
    })
}

/*照片上传*/
var _winWidth = $(window).width()
$('.damagePhoto').css('width',_winWidth)
var _width = $('.damagePhoto').width()
var _height = $('.damagePhoto').height()
var os = {x:0,y:0}
var dataUrl;

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('touchstart',onMouseDown,false);
canvas.addEventListener('touchmove',onMouseMove,false);
canvas.addEventListener('touchend',onMouseUp,false);

$("#clipArea").photoClip({
    width: _width-20,
    height: _height-20,
    file: "#file",
    view: "#view",
    ok: "#clipBtn",
    loadStart: function() {
        console.log("照片读取中");
    },
    loadComplete: function() {
        console.log("照片读取完成");
        $('.canvas_pop').addClass('layer_show2');
        $('#clipBtn').show()
        $('.process li:eq(0)').addClass("bold")
        $('.process li:eq(1) span').removeClass("cur")
    },
    clipFinish: function(dataURL) {
        $('.process li:eq(1) span').addClass("cur")
        $('.process li:eq(0)').removeClass("bold")
        $('.process li:eq(1)').addClass("bold")
        $('.process_notice').text('框出损伤处')
        $('.gesture img').attr('src','http://img.autostreetscdn.com/m/build/1.00/images/eqs/gesture2b.png')
        $('#clipArea,#clipBtn').hide()
        $('#clear,.canvas_save').css('display','inline-block')
        $('.upload,#fileBtn,#file').css('width','1.2rem')

        $('#myCanvas').prop({width:_width,height:_height}).show()
        os.x = $('#myCanvas').offset().left
        os.y = $('#myCanvas').offset().top
        
        var imgbox = new Image();
        imgbox.src = dataURL;
        imgbox.onload = function(){
            ctx.drawImage(imgbox,0,0,_width,_height)
        }
        $("#clear").on('click',function(){
            $('.process li:eq(2) span').removeClass("cur")
            $('.process li:eq(1)').addClass("bold")
            $('.process li:eq(2)').removeClass("bold")
            ctx.clearRect(0,0,500,300)
            ctx.drawImage(imgbox,0,0,_width,_height)
        })
    }
});

var flag = false;
var startPos,currentPos;
function onMouseMove(evt){
    evt.preventDefault();
    if (flag){
        currentPos = pos(evt);
    }
}

function onMouseDown(evt)
{
    evt.preventDefault();
    startPos = currentPos = pos(evt);
    console.log(startPos.x,startPos.y)
    flag = true;
}

 
function onMouseUp(evt){
    evt.preventDefault();
    var width = currentPos.x - startPos.x;
    var height = currentPos.y - startPos.y;
    ctx.strokeStyle = "#ff0000"
    ctx.linewidth = 10
    ctx.strokeRect(startPos.x,startPos.y,width,height)
    $('#clear').css('display','inline-block')
    flag = false;
    $('.process li:eq(2) span').addClass("cur")
    $('.process li:eq(1)').removeClass("bold")
    $('.process li:eq(2)').addClass("bold")
}

function pos(event){
    var x,y;
    if(isTouch(event)){
        x = event.touches[0].pageX - os.x;
        y = event.touches[0].pageY - os.y;
        }else{
        x = event.layerX - os.x;
        y = event.layerY - os.y;
    }
    return {x:x,y:y};
}
 
function isTouch(event){
    var type = event.type;
    if(type.indexOf('touch')>=0){
        return true;
        }else{
        return false;
    }
}

function init(){
    $('#myCanvas,#clear,.canvas_save').hide()
    $('.canvas_pop').removeClass('layer_show2')
    $('.upload').css('display','inline-block')
    $('.upload,#fileBtn,#file').css('width','1.63125rem')
    reset()
}

function reset(){
    $('.process li:eq(2) span').removeClass("cur")
    $('.process li:eq(1)').removeClass("bold")
    $('.process li:eq(2)').removeClass("bold")
    $('.process_notice').text('你可以移动、缩放、旋转图片，以保证所要拍摄的内容在虚框内显示')
    $('.gesture img').attr('src','http://img.autostreetscdn.com/m/build/1.00/images/eqs/gesture2.png')
}

var bodyScroll = function(e){ 
    e.preventDefault(); 
}
