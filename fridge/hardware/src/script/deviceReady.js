(function() {
	window.isTestParam = /test=true/.test(window.location);
	var DeviceIsReady = {
		initialize: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onDeviceReady: function () {
			window.jsDeviceIsReady = true;
			console.log("Device Ready!");			
		}
	};
	DeviceIsReady.initialize();
	//初始化
	window.initDeviceReady = function(CallBackFn){
		var timeOut = 0;
		var deviceReadyTime = setInterval(function(){//开启定时器
			timeOut ++;
			if(window.isTestParam === true || window.jsDeviceIsReady === true || timeOut >= 40){
				clearInterval(deviceReadyTime);//清除定时器
				CallBackFn();
			};
		},100);
		/*/测试回调
		if(window.isTestParam || window.jsDeviceIsReady === true){
			CallBackFn();
		};*/
	};
	//标题
	window.setTitle = function(title){
		document.title = title;
		if(window.jsBridgeIsReady === true) {
			window.WebViewJavascriptBridge.callHandler('setTitle',{"title":title});
		}
	};
}());
