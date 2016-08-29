$(function(){
    var _width = $(window).width()
    var _height = $(window).height()
    $('.wrap,.wrap2').width(_width).height(_height) 
    $('.wrap').css('background-size',_width)   
    $('#house_big').css('-webkit-transform','scale(5)').css('-moz-transform','scale(5)').css('-o-transform','scale(5)').css('-ms-transform','scale(5)').css('transform:scale(3)','scale(5)')
    //$('#house_big').animate({'top':'1rem'},1000)
})