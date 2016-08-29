$(function(){
    var item, str = localStorage.maintainitem;
    item = JSON.parse(str);
    var html = ''
    $.each(item,function(i,item){
            html += '<li><i class="select"></i><p id="'+item.id+'">'+item.name+'</p>'
    })
    $('#maintain_item').append(html)
    
    var param = request();
    packageList(param.orgSid)

    // if(param.brandLogo){
    //     var item = {
    //         orgSid: param.orgSid,
    //         src: imgUrl+param.brandLogo,
    //         name: param.orgNameAbbr,
    //         addr: param.address
    //     }
    //     sessionStorage.shopInfo = JSON.stringify(item)
    // }
    // if(!sessionStorage.shopInfo){
    //     alert(1)
    //     var item = {
    //         orgSid: param.orgSid,
    //         src: imgUrl+param.brandLogo,
    //         name: param.orgNameAbbr,
    //         addr: param.address
    //     }
    //     sessionStorage.shopInfo = JSON.stringify(item)
    // }
    $('.form_order').find('a').click(function(){
        var items = []
        $('#packageList ul li').each(function(){
            if( $(this).find('i').hasClass('select') ){
                var obj = {id:$(this).find('h4').attr('id'),name: $(this).find('h4').text(),old_price:$(this).find('.old').text(),new_price:$(this).find('.new').text()}
                items.push(obj)
            }
        })
        console.log(items)
        localStorage.packageitem = JSON.stringify(items);

        var url = 'http://wx.autostreets.com/html/shop_bm/bm_confirm.html?orgSid='+param.orgSid
        require(["userUtils"], function () {
            userUtils.login(url);
        });
    })

    $(".correct").click(function(){
        popdown()
    })
    
    $(".remm_packageList").on("click","blockquote",function(){
        if($(this).children("i").hasClass("unselect")){
            $(this).children("i").removeClass("unselect").addClass("select")
            $(this).find("ins").removeClass("arrow-down").addClass("arrow-up")
            $(this).siblings("section").show()
        }else{
            $(this).children("i").removeClass("select").addClass("unselect")
            $(this).find("ins").removeClass("arrow-up").addClass("arrow-down")
            $(this).siblings("section").hide()
        }
        
    })
})