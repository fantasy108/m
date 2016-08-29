/**
 * Created by xuelei.kong on 2015/5/7.
 */
/**
 * Created with JetBrains WebStorm.
 * User: bruce.kong
 * Date: 14-3-4
 * Time: 下午3:43
 * To change this template use File | Settings | File Templates.
 */

function Calendar(container,options){
    this.Container = $(container);
    this.Days = [];
    this.setOptions(options);
    this.tipBox=$('.active_tip');
//    this.reqUrl="js/testJson.js";
    this.Year = this.options.Year || new Date().getFullYear();
    this.Month = this.options.Month || new Date().getMonth() + 1;
    this.SelectDay = this.options.SelectDay ? new Date(this.options.SelectDay) : null;
    this.onSelectDay = this.options.onSelectDay;
    this.onToday = this.options.onToday;
    this.onFinish = this.options.onFinish;
    //this.MonthArr=["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.MonthArr=["01","02","03","04","05","06","07","08","09","10","11","12"];
    this.timer=null;
    this.minDateId=new Date().getFullYear()+'_'+(new Date().getMonth()+1)+'_'+new Date().getDate();
    this.init();
}


Calendar.prototype={
    /*初始化日历*/
    init:function(){
        this.draw();
    },
    setOptions: function(options) {
        this.options = {//默认值
            Year: 0,
            Month: 0,
            SelectDay: null,
            onSelectDay: function(){},
            onToday: function(){},
            onFinish: function(){}
        };
        $.extend(this.options, options || {});
    },
    preMonth: function() {
        this.PreDraw(new Date(this.Year, this.Month - 2, 1));
    },
    nextMonth: function() {
        this.PreDraw(new Date(this.Year, this.Month, 1));
    },
    PreDraw: function(date) {
        this.Year = date.getFullYear(); this.Month = date.getMonth() + 1;
        this.draw();
        //this.getActives();
    },
    /*绘制日历*/
    draw: function() {
        var t=this;
        var arr = [];
        this.pM=new Date(this.Year,this.Month-1,0).getMonth()+1;
        this.nM=new Date(this.Year,this.Month+1,0).getMonth()+1;
        this.firstDay = new Date(this.Year, this.Month - 1, 7).getDay();
        this.prevMonthDays=new Date(this.Year,this.Month-1,0).getDate();
        for(var i=this.prevMonthDays-this.firstDay+1;i<=this.prevMonthDays;i++){
            arr.push({"prevMonth":{
                day:i,
                month:this.pM
            }});
        }
        for(var i = 1, monthDay = new Date(this.Year, this.Month,0).getDate(); i <= monthDay; i++){
            arr.push({"currMonth":{
                day:i,
                month:this.Month
            }});
        }

        for(var i=1;i<=42-monthDay-this.firstDay;i++){
            arr.push({"nextMonth":{
                day:i,
                month:this.nM
            }});
        }
        $.each(arr, function (i, item) {

        })
        this.Days = [];
        var frag = document.createDocumentFragment();
        while(arr.length){
            var row = document.createElement("div");
            row.className="row";
            for(var i = 1; i <= 7; i++){
                var cell = document.createElement("p");
                var cellInner=document.createElement("span");
                cellInner.innerHTML = " ";
                cell.appendChild(cellInner);
                if(arr.length){
                    var d = arr.shift();
                    for(var property in d){
                        if(property=="currMonth"){
                            cell.className+="day currMonth";
                            cellInner.innerHTML = d[property]["day"];
                            cell.setAttribute("id","day_"+this.Year+'_'+d[property]["month"]+'_'+d[property]["day"]);
                        }
                    }

                    this.Days[d[property]["day"]] = cell;
                    var day = new Date(this.Year, d[property]["month"]-1,d[property]["day"]);

                    if($(cell).hasClass("currMonth") && this.checkDay(day)){
                            cell.className+=" nextDay"
                        if(day.getTime()<=this.theNextDays(14) ){
                            cell.className+=" enable";
                        }
                    }
                    this.IsSame(day, new Date()) && cell.className=="day currMonth" && this.onToday(cell);

                    this.SelectDay && this.IsSame(day, this.SelectDay) && this.onSelectDay(cell);

                }
                row.appendChild(cell);
            }
            frag.appendChild(row);
        }
        this.Container.empty();
        this.Container.append(frag);
        this.onFinish();
    },

    checkDay:function (checkDay) {
        if(new Date().getTime()>checkDay.getTime()) {
            return false;
        }else{
            return true;
        }
    },
    theNextDays: function (days) {
        var now=new Date()
        var nextDay=now.setDate(now.getDate()+days-1)
        this.maxDateId=new Date(nextDay).getFullYear()+'_'+(new Date(nextDay).getMonth()+1)+'_'+new Date(nextDay).getDate();
        return (new Date(nextDay).getTime());
    },
    IsSame: function(d1, d2) {
        return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
    }

};

var calendar=new Calendar(".calendar_date",
    {
        onToday: function(obj){
            $(obj).addClass('today').find('span').html('今天')
        },
        onFinish: function(){
            $(".year").html(this.Year+"年");
            $(".month").html(this.MonthArr[this.Month-1]+"月");
        }
    });
$('.calendar_hd .prevBtn').click(function(){
    if(!$("#day_"+calendar.minDateId).length){
        calendar.preMonth();
    }

});
$('.calendar_hd .nextBtn').click(function(){
    if(!$("#day_"+calendar.maxDateId).length){
        calendar.nextMonth();
    }
});



