require(["http://img.autostreetscdn.com/m/src/js/config.js"], function(){
    require(['zepto'], function () {
        if ($("a[data-page]").is("A")) {
            require([
                    "define.history"
                ], function (config) {
                    var a = $("a[data-page]");
                    var _history = {url: location.href};
                    if (a.attr("data-tab")) {
                        _history.type = a.attr("data-tab");
                    }
                    if (a.attr("data-page")) {
                        _history.id = a.attr("data-page");
                    }
                    config.addHistory(_history);
                    if (a.attr("data-role") == "back") {
                        a.on("click", function () {
                            config.back();
                        });
                    } else if (a.attr("data-role") == "home") {
                        a.on("click", function () {
                            config.home();
                        });
                    }
                }
            );
        }
        if ($("a.back").length > 0) {
            $("a.back").after('<div class="top_nav">'
                +'<span></span>'
                +'<span></span>'
                +'<span></span>'
                +'</div>'
                +'<div class="top_pop">'
                +'<a href="http://wap.autostreets.com/" class="home_icon"><span>首页</span></a>'
                +'<a href="http://wap.autostreets.com/html/user_center/uc-info-1.html" class="userCenter_icon"><span>个人中心</span></a>'
                +'<i></i>'
                +'</div>');
            $("a.userCenter_icon").on("click", function(e) {
                var _me = this;
                require(['http://wap.autostreets.com/js/userUtils.js'], function() {
                    userUtils.login(_me.href);
                });
                return false;
            });
            $(document).bind("touchstart", function() {
                $('.top_pop').removeClass("show_pop");
            });
            $('.top_nav').bind("touchstart", function(e) {
                $('.top_pop').toggleClass("show_pop");
                e.stopPropagation();
            });
            $('.top_pop').bind("touchstart", function(e) {
                e.stopPropagation();
            });
        }

    });

    require(['bi'], function (moduleA) {
        moduleA.init();
    });

});

