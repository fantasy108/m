function Slider(selector, opt) {

    var extend = function (j, k) {
        for (i in k) {
            j[i] = k[i]
        }
        return j;
    };

    var slider = function (selector) {
        this.slider = typeof  selector === "string" ? $(selector) : selector;
        this.w = this.slider.parent().width();
        this.li = this.slider.find("li");
        this.index = 0;
        this.timer = null;
        this.SetOptions(opt);
        this.onStart = this.option.onStart;
        this.onStop = this.option.onStop;
        this.onFinish = this.option.onFinish;
        this.count = this.li.length;
        this.startX = 0;
        this.startY = 0;
        this.initX = 0;
        this.initY = 0;
        this.finishX = 0;
        this.finishY = 0;
        this.moveLi = [];
        this.posiArr = [];
        this.startTime = 0;
        this.endTime = 0;
        this.init();
    };
    slider.prototype = {
        init: function () {
            this.resizeWin();
            this.setStyle();
            this.resizeWin();
            this.run();
            ("ontouchstart" in document) && this.touchEvent();


        },
        setStyle: function () {
            var t = this;
            var l_idx = this.index - 1 < 0 ? this.count - 1 : this.index - 1;
            this.li.css({"-webkit-transform": "translate3d(" + this.w + "px,0,0)", "-webkit-transition": "all 0s"});
            this.li.eq(this.index).css({"-webkit-transform": "translate3d(0,0,0)"});
            this.li.eq(l_idx).css({"-webkit-transform": "translate3d(-" + this.w + "px,0,0)"});

            $.each(this.li, function (i, item) {
                t.li.eq(i).css({"left": -i * t.w});
            });
            this.setWidth();

        },
        setWidth: function () {
            this.slider.width(this.count * this.w);
            this.li.width(this.w);
        },
        SetOptions: function (opt) {
            this.option = {
                onStart: function () {
                },
                onStop: function () {
                },
                onFinish: function () {

                }
            };
            extend(this.option, opt || {});
        },
        prev: function () {
            this.moveTo.call(this, this.index--, "prev")
        },
        next: function () {
            this.moveTo.call(this, this.index++, "next")

        },
        run: function () {
            var t = this;
            this.timer = setInterval(function () {
                t.next()
            }, 3000)
        },
        moveTo: function () {
            this.index >= this.count && (this.index = 0);
            this.index < 0 && (this.index = this.count - 1);
            this.move(arguments[1]);
        },
        move: function (dir) {
            var l_idx, l_l_idx;
            if (dir == "next") {
                l_idx = this.index - 1 < 0 ? this.count - 1 : this.index - 1;
                l_l_idx = l_idx - 1 < 0 ? this.count - 1 : l_idx - 1;
                this.li.eq(this.index).css({
                    "-webkit-transition": "all .5s ease-out",
                    "-webkit-transform": "translate3d(0,0,0)"
                });

                this.li.eq(l_idx).css({
                    "-webkit-transition": "all .5s  ease-out",
                    "-webkit-transform": "translate3d(-" + this.w + "px,0,0)"
                });

                this.li.eq(l_l_idx).css({
                    "-webkit-transition": "all 0s",
                    "-webkit-transform": "translate3d(" + this.w + "px,0,0)"
                });
            } else {
                l_idx = this.index + 1 >= this.count ? 0 : this.index + 1;
                l_l_idx = this.index - 1 < 0 ? this.count - 1 : this.index - 1;
                this.li.eq(this.index).css({
                    "-webkit-transition": "all .5s  ease-out",
                    "-webkit-transform": "translate3d(0,0,0)"
                });

                this.li.eq(l_idx).css({
                    "-webkit-transition": "all .5s  ease-out",
                    "-webkit-transform": "translate3d(" + this.w + "px,0,0)"
                });

                this.li.eq(l_l_idx).css({
                    "-webkit-transition": "all 0s",
                    "-webkit-transform": "translate3d(-" + this.w + "px,0,0)"
                });
            }
            setTimeout(this.onFinish(this.index), 300)

        },
        stop: function () {
            clearInterval(this.timer);
            this.onStop();
        },
        resizeWin: function () {
            var t = this;
            var resizeTimer = null;
            $(window).resize(function () {
                if (resizeTimer) {
                    clearTimeout(resizeTimer)
                }
                resizeTimer = setTimeout(function () {
                    t.w = t.slider.parent().width();
                    t.setStyle();
                }, 30);
            });

        },
        touchEvent: function () {
            var t = this;
            this.slider.bind("touchstart", function (event) {
                t.stop();
                t.moveLi = [];
                t.posiArr = [0, -t.w, t.w];
                t.startX = event.touches[0].clientX;
                t.startY = event.touches[0].clientY;
                var prev_li = t.slider.find("li").eq(i = t.index - 1 < 0 ? t.count - 1 : t.index - 1);
                var next_li = t.slider.find("li").eq(j = t.index + 1 == t.count ? 0 : t.index + 1);
                t.moveLi.push(t.slider.find("li").eq(t.index), prev_li, next_li);
//                console.log(posiArr)
                t.initX = t.startX;
                t.initY = t.startY;
                t.startTime = Date.now();
                event.preventDefault();
            });

            this.slider.bind("touchmove", function (event) {
                var endX = event.touches[0].clientX;
                var endY = event.touches[0].clientY;
//                if (Math.abs(endY - startY) > Math.abs(endX - startX) ) return false;
                var absX = endX - t.startX;
//                console.log(absX)
                for (var i in t.moveLi) {
                    var pos = t.posiArr[i] + absX;
                    t.moveLi[i].css({
                        "-webkit-transition": "all 0s",
                        "-webkit-transform": "translate3d(" + pos + "px,0,0)"
                    })
                }

                t.finishX = endX;
                t.finishY = endY;
                event.preventDefault();

            });
            this.slider.bind("touchend", function (event) {
                for (var i in t.moveLi) {
                    t.moveLi[i].css({
                        "-webkit-transform": "translate3D(" + t.posiArr[i] + "px,0,0)",
                        "-webkit-transition": ".5s ease-out"
                    });
                }
                bindEvent(t.initX, t.finishX);
                t.initX = 0;
                t.finishX = 0;
                setTimeout(t.run(), 800)
            });

            var bindEvent = function () {
                var disX = t.finishX - t.initX;
                var disY = t.finishY - t.initY;
                t.endTime = Date.now();
                var disTime = t.endTime - t.startTime;
//                console.log( disTime)
//                console.log( Math.abs(disX)/w)
                if (t.finishX == 0 || Math.abs(disY) >= Math.abs(disX) || (disTime > 600 && Math.abs(disX) / t.w < 0.3)) return;
                disX > 0 ? t.prev() : t.next();
            }
        }
    };


    return new slider(selector, opt);
}
$(function () {

    Slider('#slider', {
        onStart: function () {
        },
        onStop: function () {
        },
        onFinish: function (i) {
            setTimeout(function () {
                $('#nav li').eq(i).addClass("active").siblings().removeClass('active');
                $('#slide_text li').eq(i).addClass("active").siblings().removeClass('active');
            },300)

        }
    });

    var list="";
    /*门店解析*/
    $.ajax({
        type: "GET",
        url: "http://img.autostreetscdn.com/activity/build/1.00/js/cmb_integral.json",
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        scriptCharset: "GBK",
        jsonpCallback: "getaddr",
        cache: false,
        success: function (data) {
            $.each(data,function(i,item){
                list+="<ul> <li>"+item.name+"</li><li>地址："+item.addr+"</li><li>电话："+item.phone+"</li></ul>";
            });
            $('.activity_rule').append(list)
        }
    });
    if(sessionStorage.isapp){
        $('header').hide();
        $('.app_back_menu').show();
    }
});