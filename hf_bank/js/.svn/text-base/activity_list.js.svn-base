var imgurl = "http://images.autostreets.com/";
var _daq = _daq || [];
_daq.push(['_setAccount', 'wap']);
(function() {
    var da = document.createElement('script');
    da.type = 'text/javascript';
    da.async = true;
    da.src = ('https:' == document.location.protocol ? 'https://da' : 'http://da') + '.autostreets.com/da.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(da, s);
})();
$.ajax({
    type: "GET",
    url: "http://wap.autostreets.com/activity/findAdvertise",
    dataType: "jsonp",
    jsonp: 'jsoncallback',
    scriptCharset: "GBK",
    jsonpCallback: "getActivityList",
    cache: false,
    success: function (data) {
        var html="";
        $.each(data.data, function (i,item) {

            html+='<li><a href="'+item.clickUrl+'" onClick="_traceEvent(\'\活动\',\'点击\',\''+i+'\',\'6\',\'false\')" ><img src="'+imgurl+item.photoUrl+'" alt=""/></a></li>';
        });
        $('.activity_list ul').empty().append(html);
    }
});
function getUrlVars()
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
    sessionStorage.isapp=true;
}


