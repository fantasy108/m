
$(function(){
    window.onload = function(){
        var obj = $('#container')
        topMethod(obj)
    }
    $('.other_radio input').live('click',function(){
        var _this = $(this)
        $(this).parent().parent().data('state',1)
        if($(this).val() == 'no'){
            if($(this).parent().prev().text() == '车内是否无水泡痕迹' || $(this).parent().prev().text() == '发动机机油是否无冷却液混入'){
                $(this).parent().parent().addClass('cur')
            }
            var obj = $(this).parent().next()
            if(obj.hasClass('leak')){
                obj.show()
                $('.tipbg').show().on('click',function(){
                    $('.leak,.tipbg').hide()
                    if(_this.parent().prev().children('i').length){
                        return false;
                    }else{
                        _this.siblings('input').click()
                    }
                })
            }
        }else if($(this).val() == 'yes'){
            $(this).parent().parent().removeAttr('data-damagelevelleakage').removeClass('cur')
            $(this).parent().parent().children('span').find('i').remove()
        }
    })
})

conditionParam()

/*title置顶滚动*/
var topMethod = function(obj){
    obj.scrollTop(0)
    var _topHeight = $('section').height() + $('#wrapper').height()
    var len = obj.children('.car_title').length
    var _array = new Array()
    for(var i=0;i<len;i++){
        var topPosi = obj.children('.car_title').eq(i).position()
        var topHeight = topPosi.top
        _array.push(topHeight - _topHeight)
        var _child = obj.children('.car_title')
        _child.eq(i).clone(true).removeClass('car_title').addClass('car_title2 posi_fixed float_'+i).appendTo(obj)
    }
    obj.children('.float_0').show()

    var eleHeight = $('.car_title').height()
    var direction = 0;
    var flag = true;
    var i = 0;
    var float_array = new Array()
    $(window).scroll(function(){
        var scrollHeight = $(window).scrollTop()
        if(scrollHeight>direction){
            if(i<len){
                if(flag){
                    if(scrollHeight>=_array[i]-eleHeight && scrollHeight<_array[i]){
                        obj.children('.float_'+(i-1)).css({position:'absolute',top:scrollHeight+_topHeight})
                        float_array[i-1] = scrollHeight+_topHeight
                        flag = false;
                    }
                }
                if(scrollHeight >= _array[i]){
                    obj.children('.float_'+i).show().css('top',_topHeight)
                    obj.children('.float_'+(i-1)).hide(1)
                    flag = true
                    i++
                }
            }
            direction = scrollHeight
        }else if(scrollHeight<direction){
            if(i>0){
                if(!flag){
                    if(scrollHeight<= float_array[i-1]-eleHeight){
                        obj.children('.float_'+(i-1)).css({position:'fixed',top:_topHeight}).show(1)
                        flag = true;
                    }
                }
                if(scrollHeight <= _array[i-1]){
                    obj.children('.float_'+(i-1)).hide(1)
                    obj.children('.float_'+(i-2)).show(1)
                    flag = false
                    i--
                }
            }
            direction = scrollHeight
        }
    })
}

