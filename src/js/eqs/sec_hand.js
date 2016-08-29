
$(function(){
    $('.edit').on('click',function(){
        if($(this).hasClass('gley'))return false;
    })

    window.onload = function(){
        var obj = $('#container')
        topMethod(obj)
    }

    $('.harm_list').on('click','li',function(){
        var _url = $(this).data('photourl')
        $('.pic_show img').attr('src',_url)
        $('.pic_show').show()
        $('#tipbg').show()
    })
    
    $('.pic_show').on('click',function(){
        $(this).hide()
        $('#tipbg').hide()
    })
})

baseInfo()

/*二手车页面nav滚动*/
var myScroll;
myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
var header_h = $('header').height()
var wrap_h = $('#wrapper').height()
var scrollerObj = $('#scroller>ul>li')
var titleObj = $('.car_title')
scrollerObj.on('click',function(){
    $(this).children('a').addClass('cur').end().siblings().children('a').removeClass('cur')
    var _title = $(this).children('a').text()
    titleObj.each(function(){
        if($(this).children('h3').text() == _title){
            var _top = $(this).offset().top - header_h - wrap_h
            $("html,body").animate({scrollTop:_top + 10},300)
            return false;
        }
    })   
})

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
                    myScroll.scrollToElement(scrollerObj.eq(i-1)[0], 1000)
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
                    if(i>0)myScroll.scrollToElement(scrollerObj.eq(i-1)[0], 1000)
                }
            }
            direction = scrollHeight
        }

        if(i>0){
            $('#scroller li').eq(i-1).children('a').addClass('cur').end().siblings().children('a').removeClass('cur')
        }
    })
}




