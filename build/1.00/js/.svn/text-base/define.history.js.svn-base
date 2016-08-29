/*
 * Build by xuelei.kong@autostreets.com
 * Date: 2016-04-07 10:30:42
 * Version: 1.00
 */
define(function(){var t=this;return this.key="I_HISTORY_STACK",t.addHistory=function(e){var o=t.getHistory();o.push(e),t.setHistory(o)},t.setHistory=function(e){localStorage.setItem(t.key,JSON.stringify(e))},t.getHistory=function(){var e;try{e=JSON.parse(localStorage.getItem(t.key)),e||(e=[])}catch(o){e=[]}return e},t.cleanHistory=function(){localStorage.removeItem(t.key)},t.back=function(){var e=t.getHistory(),o=e[e.length-1];if(e&&e.length){for(var r=e.length-2;r>=0;r--)if((o.type&&e[r].type!=o.type||!o.type)&&o.id!=e[r].id)return e.splice(r+1),t.setHistory(e),location.href=e[r].url,!1;window.history.back()}},t.home=function(){t.cleanHistory(),location.href=_def_host},{addHistory:t.addHistory,back:t.back,home:t.home}});