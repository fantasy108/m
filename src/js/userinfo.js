var _infourl = "http://wap.autostreets.com/member/loadMemberInfo?memberSid="+userUtils.getMemberSid(true);
//_infourl = "http://img.autostreetscdn.com/m/src/js/user.json"


$(function(){
    $.ajax({type: "GET",url:_infourl,dataType: "jsonp",jsonp: 'jsoncallback',scriptCharset:"GBK",jsonpCallback:"getinfo",cache:false,
        success:function(data){
            $("#u-name").html(data.data.name);
            $("#u-sex").html(data.data.gender);
            $("#u-tel").html(data.data.cellphone);
            $("#u-idcard").html(data.data.idCardNum);
            $("#u-vipid").html(data.data.memberCode);
            $("#u-viplv").html(data.data.memberLevel);
            $("#u-vipcate").html(data.data.memberCategory);

            $("#uc-name").html(data.data.username);
            $("#uc-viplv").html(data.data.memberLevel);

            $("#money-1").html(data.data.cash);
            $("#money-2").html(data.data.cashFreeze);


            $("#b-name").html(data.data.corpName);
            if(typeof data.data.province !="undefined" &&
                typeof data.data.city !="undefined"){
                $("#b-area").html(data.data.province.toString()+data.data.city.toString());
            }else{
                $("#b-area").html("");
            }

            $("#b-addr").html(data.data.address);
            $("#b-phone").html(data.data.telephone);
            $("#b-mail").html(data.data.email);
            $("#b-wechat").html(data.data.weixin);
        }
    });

});