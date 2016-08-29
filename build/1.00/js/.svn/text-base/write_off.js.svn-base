/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
!function(e){e.imageFileVisible=function(t){function i(e){e.onload=function(){var t=e.offsetWidth,i=e.offsetHeight;t/i>1&&(e.style.width="100%",e.style.height="auto",e.style.marginTop=(o-r*i/t)/2+"px")}}var l={wrapSelector:null,fileSelector:null,width:"100%",height:"auto",errorMessage:"不是图片"},a=e.extend(l,t),r=e(a.fileSelector).width(),o=e(a.fileSelector).height();e(a.fileSelector).on("change",function(){var t=e(this).next(a.wrapSelector);t.empty();var l=this.files[0],r=/image.*/;if(l.type.match(r)){var o=new FileReader;o.onload=function(){var e=new Image;e.src=o.result,i(e),t.append(e)},o.readAsDataURL(l)}else alert(a.errorMessage)})}}(Zepto),$.imageFileVisible({wrapSelector:".image_wrap",fileSelector:".file"});