(function($) {
    $.imageFileVisible = function(options) {
        var defaults = {
            wrapSelector: null,
            fileSelector:  null ,
            width : '100%',
            height: 'auto',
            errorMessage: "不是图片"
        };
        var opts = $.extend(defaults, options);
        var maxW=$(opts.fileSelector).width();
        var maxH=$(opts.fileSelector).height();
        $(opts.fileSelector).on("change",function(){
            var ImgWrap=$(this).next(opts.wrapSelector);
            ImgWrap.empty();
            var file = this.files[0];
            var imageType = /image.*/;
            if (file.type.match(imageType)) {
                var reader = new FileReader();
                reader.onload = function(){
                    var img = new Image();
                    img.src = reader.result;
                    resizeImg(img);
                    ImgWrap.append(img);
                };
                reader.readAsDataURL(file);
            }else{
                alert(opts.errorMessage);
            }
        });

        function resizeImg(img){
            img.onload= function () {
                var w=img.offsetWidth;
                var h=img.offsetHeight;
                if(w/h>1){
                    img.style.width="100%";
                    img.style.height="auto";
                    img.style.marginTop=(maxH- maxW*h/w)/2+"px";
                }
            }
        }
    };
})(Zepto);

$.imageFileVisible({
    wrapSelector: ".image_wrap",
    fileSelector: ".file"
});





