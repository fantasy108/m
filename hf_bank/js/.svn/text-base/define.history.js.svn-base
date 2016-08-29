define(function(){
 	var _me = this;
	this.key = "I_HISTORY_STACK";
	
	_me.addHistory = function(history) {
		var __history = _me.getHistory();
		__history.push(history);
		_me.setHistory(__history);
	};
	_me.setHistory = function(history) {
		localStorage.setItem(_me.key, JSON.stringify(history));
	};
	_me.getHistory = function() {
		var __history;
	    try {
	    	__history = JSON.parse(localStorage.getItem(_me.key));
	        if (!__history) {
	        	__history = [];
	        }
	    } catch (e) {
	    	__history = [];
	    }
	    return __history;
	};
	_me.cleanHistory = function() {
		localStorage.removeItem(_me.key);
	};
	_me.back = function() {
		var __history = _me.getHistory();
		var __copyPage = __history[__history.length - 1];
		if (__history && __history.length) {
			for (var i = (__history.length - 2); i >= 0; i--) {
				if (((__copyPage.type && __history[i].type != __copyPage.type) || !__copyPage.type) && __copyPage.id != __history[i].id) {
					__history.splice(i + 1);
					_me.setHistory(__history);
					location.href = __history[i].url;
					return false;
				}
			}
			window.history.back();
		}
	};
	_me.home = function(){
		_me.cleanHistory();
		location.href = _def_host;
	};
	return {
		addHistory : _me.addHistory,
		back : _me.back,
		home : _me.home
	};
});