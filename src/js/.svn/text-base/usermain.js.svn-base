$(".loginBtn").on("click", function() {
    //if (!userUtils.checkLogin()) {
        ui_fix();
        $(".more_sub").addClass("show_more_sub");
        $(".ui_mask").addClass("ui_mask_show");

    //} else {
    //    location.href = siteurl + "/user_center/uc-info-1.html";
    //}

});
$(".cancel_login,.ui_mask").on("click", function() {
    ui_auto();
    $(".more_sub").removeClass("show_more_sub");
    $(".ui_mask").removeClass("ui_mask_show");

});


function ui_fix() {
    $("body").addClass('ui_fix');
    document.body.addEventListener("touchmove", preventScroll);
}

function ui_auto() {
    $("body").removeClass('ui_fix');
    document.body.removeEventListener("touchmove", preventScroll)
}

function preventScroll(event) {
    event.preventDefault();

}
