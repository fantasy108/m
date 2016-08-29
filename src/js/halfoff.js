$(function(){
    // 
    var _url ='http://img.autostreetscdn.com/m/build/1.00/js/discount.json'

    $.ajax({type: "GET",url:_url,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getlist",cache:false,
        success:function(data){
            $("#halflist").empty();
            //循环数据列表
            //alert(data);
            $.each(data,function(i,item){
                var _carlist = "<li><div class='li_inner'><a href='javascript:void(0)'><div><img src='"+item.src+"'><h3>"+item.name+"</h3><p>"+item.intro+"</p><strong>&yen;"+item.n_price+"万</strong><del>&yen;"+item.o_price+"万</del></div></a></div></li>";
                if(item.sold==1){
                    _carlist = "<li><div class='li_inner'><a href='javascript:void(0)'><div><img src='"+item.src+"'><h3>"+item.name+"</h3><p>"+item.intro+"</p><strong>&yen;"+item.n_price+"万</strong><del>&yen;"+item.o_price+"万</del><img src='http://img.autostreetscdn.com/m/build/1.00/images/sold.png' class='sold'/></div></a></div></li>";
                }

                //carlist.click(function(){
                //  //alert('123');
                //window.location.href=item.url;
                //});

                $("#halflist").append(_carlist);


            })
        }
    });
    //http://wap.autostreets.com/html/halfoff.html?source=app  隐藏header
    var appUrl="http://wap.autostreets.com/html/halfoff.html?source=app";
    /* function getUrlVars()
     {
     var vars = {}, hash;
     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
     for(var i = 0; i < hashes.length; i++)
     {
     hash = hashes[i].split('=');
     vars[hash[0]] = hash[1];
     }
     return vars;
     }

     if(getUrlVars()["source"]=="app"){
     $('header').hide();


     }*/
    if(sessionStorage.isapp){
        $('header').hide();
        $('.app_back_menu').show();
    }



});