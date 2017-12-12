define(['deviceReady'], function() {
	'use strict';
window.isTestParam = /test=true/.test(window.location);
window.isKFTest = /192.168.70.239/.test(window.location);
window.isLTTest = /103.8.220.166:40000/.test(window.location.host);
window.isYSTest = /203.187.186.136:7900/.test(window.location.host);
(function(){
	if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
	$$.loadJC('../../script/_lib/eruda/dist/eruda.min.js','js');
})();

var USER_INFO = {},
	APP_INFO  = {"Content-Type":"application/json;charset=utf-8"};
/***** 定义公共参数 *****/
//生产
var Params = {
	WEBSITE_URL: "https://uhome.haieriot.net:7503/"  //全局路径
};
//联调
if(window.isLTTest){
	Params.WEBSITE_URL = "https://uhome.haieriot.net:7503/";
}else
//验收
if(window.isYSTest){
	Params.WEBSITE_URL = "https://uhome.haieriot.net:7503/";
}else
//开发环境
if(window.isKFTest){
	Params.WEBSITE_URL =  "https://uhome.haieriot.net:7503/";
};	
//测试
if(window.isTestParam){
	Params.WEBSITE_URL =  "https://uhome.haieriot.net:7503/";
	USER_INFO = {
	"IsLogin" : "",
	"UserId"  : "100013957366157065",
	"CoSessionId":"116201611021026211226",
	"OffUserId":"48179921",
	"PhoneNumber":"18629019862",
	"SdToken":"57DDD454D8B4784566EE74B709325AAC"
	};
	APP_INFO = {
		timestamp:'20160111141341',
		sign: 'f4e1282e9ae0592a65b2114ae5eafb6a',
	"appId"		  :"MB-UZHSH-0001",
	"appKey"	  :"5dfca8714eb26e3a776e58a8273c8752",
	"accessToken" :"TGT8GV4NGSLK8EC2RTA9PDO3J6FQ00",
	"appVersion"  :"3.0.0",
	"clientId"	  :"0E28347E-146E-44AA-8070-6C4885709AFA",
	"appName"  	  :"upluszhsh"
	};
}; 
/**截取url 指定key value
* @param {Object} name
*/
var getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.href.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	},
	Assign = function(UserInfo,type){
		var UserInfoData = type == 0 ? UserInfo.data : UserInfo;
		//APP信息
		APP_INFO.appId 		  = UserInfoData.appId;
		APP_INFO.appKey		  = UserInfoData.appKey;
		APP_INFO.accessToken  = UserInfoData.accessToken;
		APP_INFO.appVersion   = UserInfoData.appVersion;
		APP_INFO.clientId 	  = UserInfoData.clientId;
		APP_INFO.appName 	  = UserInfoData.appName;
		//用户信息
		USER_INFO.SdToken	  = UserInfoData.sdToken;
		USER_INFO.CoSessionId = UserInfoData.coSessionId;
		USER_INFO.PhoneNumber = UserInfoData.phoneNumber;
		USER_INFO.IsLogin	  = UserInfoData.isLogin;
		USER_INFO.UserId 	  = UserInfoData.userId;
		USER_INFO.UserName 	  = UserInfoData.username;
		USER_INFO.OffUserId	  = UserInfoData.offUserId;
		USER_INFO.Citycode	  = UserInfoData.citycode;
		USER_INFO.Timestamp	  = UserInfoData.timestamp;
		USER_INFO.Lng		  = UserInfoData.lng;
		USER_INFO.Lat		  = UserInfoData.lat;
	},
	IsReady = function(callBack){
		window.initDeviceReady(callBack);
	};

return {
	Params	   : Params,
	USER_INFO  : USER_INFO,
	APP_INFO   : APP_INFO,
	//执行接口程序
	execInterface : function(name, param, callbackfn){
		try {
			var func = upuser[name + ''] || function(){console.log("error--" + name + "接口未定义");};
			func(callbackfn, function(err) {
				console.log("执行" + name + "失败" + err);
				//回调
				callbackfn?callbackfn():'';
			}, param);
		} catch (err) {
			console.log("执行" + name + "失败" + err);
		}
	},
	//获取用户信息
	getUserInfo: function(CallBackFn) {
		//test情况下直接回调
		if (window.isTestParam) {
			CallBackFn();
			return;
		}
		try {
			upuser.getUserInfo(function(_UserData) {
				console.log("getUserInfo success --" + JSON.stringify(_UserData));
				var UserData = null;
				if (Object.prototype.toString.call(_UserData) != '[object Object]') {
					UserData = JSON.parse(_UserData);
				} else {
					UserData = _UserData;
				}
				if (UserData.retCode == "00000") {
					if (UserData.data.isLogin) {
						// UserInfoData = UserData;
						Assign(UserData, 0);
					} else {
						console.log("用户未登录！");
					};
				} else {
					console.log("getUserInfo: UserData.retCode=" + UserData.retCode);
				}
				//回调
				CallBackFn ? CallBackFn() : '';
			}, function(errData) {
				console.log("执行getUserInfo失败" + errData);
				//回调
				CallBackFn ? CallBackFn() : '';
			});
		} catch (err) {
			//回调
			CallBackFn ? CallBackFn() : '';
			console.log("执行getUserInfo失败" + err);
		}
	}
};
});