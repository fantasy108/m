var CLICK=("ontouchstart" in document)?"tap":"click";

$('.coupon_tab li').on(CLICK,function () {
    var idx=$(this).index();
    $(this).addClass("curr").siblings().removeClass("curr");
    $('.item_list').eq(idx).show().siblings().hide();
});