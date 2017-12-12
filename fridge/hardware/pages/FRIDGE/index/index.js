//根路径
window.isTestParam = /test=true/.test(window.location);
define(['APP', 'LANG', 'deviceReady', 'deviceAPI', 'deviceModel'], function(APP, LANG) {
	'use strict';

	APP.controller('IndexController', ['title', '$scope', '$timeout', '$interval', '$translate',
		function(title, $scope, $timeout, $interval, $translate) {
			// 蒙版 localStorage存储device_fridge_initialLoad值 true不弹出蒙版 false弹出！
			if(localStorage && 'true' != localStorage.getItem('device_fridge_initialLoad')){
				// $$(".modaltotal").css("height",($$("body").height()+50) +"px");
				$$(".modaltotal").css("height","600px");
				// 打开蒙版
                $scope.initialLoading = true;
            }
            $scope.closePopup = function(){
            	// 关闭蒙版
            	$timeout(function(){
                	$scope.initialLoading = false;
            	},10);
                if(localStorage){
                	localStorage.setItem('device_fridge_initialLoad','true');

                }
            };
			// initValue
			$scope.wifiSwitch = "离线";
			$scope.isSwitch = false;
			$scope.refrigeratorTemperature = '-/';
			$scope.freezerTemperature = '-/';
			$scope.freezerDoorStatus = '';
			$scope.vtRoomTemperature = '-/-';
			$scope.refrigeratorTargetTemperature = '-/-';
			$scope.refrigeratorTargetTemperature_Writeable = true;
			$scope.vtRoomTargetTemperature = '-/-';
			$scope.vtRoomTargetTemperature_Writeble= true;
			$scope.freezerTargetTemperature = '-/-';
			$scope.freezerTargetTemperature_Writeable = true;
			//速冷
			$scope.quickRefrigeratingMode = false;
			$scope.quickRefrigeratingMode_Writeable = true;
			//速冻
			$scope.quickFreezingMode = false;
			$scope.quickFreezingMode_Writeable = true;
			//珍品
			$scope.freshMode = false;
			$scope.freshMode_Writeable = true;
			//制冰
			$scope.icemakeMode = false;
			$scope.icemakeMode_Writeable = true;
            //急冻
            $scope.supercoolMode = false;
			$scope.supercoolMode_Writeable = true;
			//人工智慧
			$scope.intelligenceMode = false;
			$scope.intelligenceMode_Writeable = true;
			$scope.runningStatus = '';
			$scope.alarmsInfo = '';
			$scope.alarmsArr = [];
			$scope.alarmsInfoNum = 0;

			//获取url参数
			var UrlGet = $$.getUrlParams(), FRIDGE = null, TempInterval = null;
			
			//设定语言包
			var langType = UrlGet.lang || '';
			for(var key in LANG){
	            if(key == langType.toUpperCase()){
	            	$translate.use(key);
	            	break;
	            }
	        }
			
			//设置页面标签
			// window.setTitle(title);
			
			//设备准备就绪
			window.initDeviceReady(function(){
				
				//定义接口 
				FRIDGE = new DeviceAPI.createDevice(deviceParam.GLOBE_DEVICEID , UrlGet.devicemac, function(changeData){
					$scope.refreshDeviceInfo(changeData);
				},function(initData){
					//初始化接口
					$scope.refreshDeviceInfo(initData);
				});
			});
			
			//
			$scope.refreshDeviceInfo = function(RefreshData){
				$timeout(function(RefreshData){
					if(RefreshData.retCode === '00000'){
						RefreshData = RefreshData.data;
						//处理布尔类型
						for(var key in RefreshData){
							var __KEY__ = RefreshData[key];
							if(__KEY__['class'] == 'boolean' && key != 'getAllAlarm'){
								__KEY__['value'] = (__KEY__['value'] == 'true' || __KEY__['value'] == true)? true : false;
							};
						};
						$scope.DeviceData = RefreshData;
						//wifi
						$scope.wifiSwitch = RefreshData.online.value;

						if($scope.wifiSwitch){

							$scope.wifiSwitch = '在线';

						}
						//开机状态
						$scope.isSwitch =  $scope.wifiSwitch;
						if(!$scope.isSwitch){
							$$('.ModalBlank.ModalBlankVisibleIn').tap().click();
							if($$('.ModalWarnBox').length == 0){
								$translate(['lang_deviceStatus','lang_wifiStatus_on','lang_wifiStatus_off']).then(function(translations) {
									debugger
									$$.warn(translations.lang_deviceStatus + (RefreshData.online.value?translations.lang_wifiStatus_on:translations.lang_wifiStatus_off));
								});
							}
							return ;
						}
						// 显示温度
						$scope.refrigeratorTemperature = RefreshData.refrigeratorTemperature.value;
						$scope.freezerTemperature = RefreshData.freezerTemperature.value;
						$scope.vtRoomTemperature = RefreshData.vtRoomTemperature.value;
						$scope.freezerDoorStatus = RefreshData.freezerDoorStatus.value;
						if($scope.freezerDoorStatus){

							$scope.freezerDoorStatus = '开启';
						}else{

							$scope.freezerDoorStatus = '关闭';
						}
						// 设置温度
						$scope.refrigeratorTargetTemperature = Number(RefreshData.refrigeratorTargetTemperature.value);
						$scope.refrigeratorTargetTemperature_Writeable = RefreshData.refrigeratorTargetTemperature.logic.writeable;
						$scope.freezerTargetTemperature = Number(RefreshData.freezerTargetTemperature.value);
						$scope.freezerTargetTemperature_Writeable = RefreshData.freezerTargetTemperature.logic.writeable;

						$scope.vtRoomTargetTemperature = Number(RefreshData.vtRoomTargetTemperature.value);
						$scope.vtRoomTargetTemperature_Writeable = RefreshData.vtRoomTargetTemperature.logic.writeable;
						// 速冷
						$scope.quickRefrigeratingMode = RefreshData.quickRefrigeratingMode.value;
						$scope.quickRefrigeratingMode_Writeable = RefreshData.quickRefrigeratingMode.logic.writeable;
						// 速冻
						$scope.quickFreezingMode = RefreshData.quickFreezingMode.value;
						$scope.quickFreezingMode_Writeable = RefreshData.quickFreezingMode.logic.writeable;
						// 珍品
						$scope.freshMode = RefreshData.freshMode.value;
						$scope.freshMode_Writeable = RefreshData.freshMode.logic.writeable;
						//制冰
						$scope.icemakeMode = RefreshData.icemakeMode.value;
						$scope.icemakeMode_Writeable = RefreshData.icemakeMode.logic.writeable;
						//急冻
						$scope.supercoolMode = RefreshData.supercoolMode.value;
						$scope.supercoolMode_Writeable = RefreshData.supercoolMode.logic.writeable;
						// 智能
						$scope.intelligenceMode = RefreshData.intelligenceMode.value;
						$scope.intelligenceMode_Writeable = RefreshData.intelligenceMode.logic.writeable;

						// 运行状态
						if($scope.quickRefrigeratingMode && $scope.quickFreezingMode){
							$scope.runningStatus = 'lang_quickRefrigeratingMode_quickFreezingMode_status';
						}else if($scope.quickFreezingMode && $scope.freshMode){
							$scope.runningStatus = 'lang_quickFreezingMode_freshMode_status';
						}else if($scope.quickRefrigeratingMode){
							$scope.runningStatus = 'lang_quickRefrigeratingMode_status';
						}else if($scope.quickFreezingMode){
							$scope.runningStatus = 'lang_quickFreezingMode_status';
						}else if($scope.freshMode){
							$scope.runningStatus = 'lang_holidayMode_status';
						}else if($scope.intelligenceMode){
							$scope.runningStatus = 'lang_intelligenceMode_status';
						}

						// 告警
						$scope.alarmsArr = RefreshData.getAllAlarm.value;
						if($scope.alarmsArr && $scope.alarmsArr.length){
							$scope.alarmsInfo = "." + $scope.alarmsArr[0].name;
							$scope.alarmsInfoNum = $scope.alarmsArr.length;
						}
					}
				}.bind(null, RefreshData),100);
			};
			// 报警警告弹出窗
			$scope.openModeWin = function(){
				var domString = $$("#alarms_info")[0].innerHTML;
				$$.alert(domString, function(){});
				// 最大宽度
				// $$(".ModalBox").css("max-width",($$('body').width()-20)+"px");
				// 居中
				var width = $$(".ModalBox").width();
				// $$(".ModalBox").css("margin-left",-(width/2)+'px');
				// 按钮
				$translate('lang_buttonText').then(function(translation) {
					$$(".ModalButton").text(translation);
				});
			};
			//加温度
			$scope.plusTemp = function(type){
				if (type == 1) {
					if ($scope.refrigeratorTargetTemperature >= $scope.DeviceData.refrigeratorTargetTemperature.logic.range.maxValue) {
						if ($$(".ModalPromptBox").length === 0) {
							$translate(['lang_maxTem','lang_cannotHigh']).then(function(translations) {
								$$.warn(translations.lang_maxTem + " " + $scope.DeviceData.refrigeratorTargetTemperature.logic.range.maxValue + translations.lang_cannotHigh);
							});
						}
					} else {
						$scope.refrigeratorTargetTemperature === "-/-" ? 0 : $scope.refrigeratorTargetTemperature;
						$scope.refrigeratorTargetTemperature += $scope.DeviceData.refrigeratorTargetTemperature.logic.range.step;
						$scope.settingTemp({
							'refrigeratorTargetTemperature': $scope.refrigeratorTargetTemperature
						});
					}
				} 
				else if (type == 3) {


					if ($scope.vtRoomTargetTemperature +21 >= $scope.DeviceData.vtRoomTargetTemperature.logic.range.maxValue) {
						if ($$(".ModalPromptBox").length === 0) {
							$translate(['lang_maxTem','lang_cannotHigh']).then(function(translations) {
								$$.warn(translations.lang_maxTem + " " + ($scope.DeviceData.vtRoomTargetTemperature.logic.range.maxValue -21)+ translations.lang_cannotHigh);
							});
						}
					} else {
						$scope.vtRoomTargetTemperature === "-/-" ? 0 : $scope.vtRoomTargetTemperature;
						$scope.vtRoomTargetTemperature += $scope.DeviceData.vtRoomTargetTemperature.logic.range.step;
						$scope.settingTemp({
							'vtRoomTargetTemperature': $scope.vtRoomTargetTemperature
						});
					}


				} 
				else {
					if (($scope.freezerTargetTemperature+26) >= $scope.DeviceData.freezerTargetTemperature.logic.range.maxValue) {
						if ($$(".ModalPromptBox").length === 0) {
							$translate(['lang_maxTem','lang_cannotHigh']).then(function(translations) {
								$$.warn(translations.lang_maxTem+ " " + ($scope.DeviceData.freezerTargetTemperature.logic.range.maxValue -26) + translations.lang_cannotHigh);
							});
						}
					} else {
						$scope.freezerTargetTemperature === "-/-" ? 0 : $scope.freezerTargetTemperature;
						$scope.freezerTargetTemperature += $scope.DeviceData.freezerTargetTemperature.logic.range.step;
						$scope.settingTemp({
							'freezerTargetTemperature': $scope.freezerTargetTemperature
						});
					}
				}
				
			};
			//减温度
			$scope.minusTemp = function(type){
				if (type == 1) {
					if ($scope.refrigeratorTargetTemperature <= $scope.DeviceData.refrigeratorTargetTemperature.logic.range.minValue) {
						if ($$(".ModalPromptBox").length === 0) {
							$translate(['lang_minTem','lang_cannotLow']).then(function(translations) {
								$$.warn(translations.lang_minTem + " " + $scope.DeviceData.refrigeratorTargetTemperature.logic.range.minValue + translations.lang_cannotLow);
							});
						}
					} else {
						$scope.refrigeratorTargetTemperature === "-/-" ? 0 : $scope.refrigeratorTargetTemperature;
						$scope.refrigeratorTargetTemperature -= $scope.DeviceData.refrigeratorTargetTemperature.logic.range.step;
						$scope.settingTemp({
							'refrigeratorTargetTemperature': $scope.refrigeratorTargetTemperature
						});
					}
				} 
				else if (type == 3){
					if (($scope.vtRoomTargetTemperature +21 ) <= $scope.DeviceData.vtRoomTargetTemperature.logic.range.minValue) {
						if ($$(".ModalPromptBox").length === 0) {
							$translate(['lang_minTem','lang_cannotLow']).then(function(translations) {
								$$.warn(translations.lang_minTem + " " + ($scope.DeviceData.vtRoomTargetTemperature.logic.range.minValue -21) + translations.lang_cannotLow);
							});
						}
					} else {
						$scope.vtRoomTargetTemperature === "-/-" ? 0 : $scope.vtRoomTargetTemperature;
						$scope.vtRoomTargetTemperature -= $scope.DeviceData.vtRoomTargetTemperature.logic.range.step;
						$scope.settingTemp({
							'vtRoomTargetTemperature': $scope.vtRoomTargetTemperature
						});
					}
				} else {
					if (($scope.freezerTargetTemperature+26) <= $scope.DeviceData.freezerTargetTemperature.logic.range.minValue) {
						if ($$(".ModalPromptBox").length === 0) {
							$translate(['lang_minTem','lang_cannotLow']).then(function(translations) {
								$$.warn(translations.lang_minTem + " " + ($scope.DeviceData.freezerTargetTemperature.logic.range.minValue -26) + translations.lang_cannotLow);
							});
						}
					} else {
						$scope.freezerTargetTemperature === "-/-" ? 0 : $scope.freezerTargetTemperature;
						$scope.freezerTargetTemperature -= $scope.DeviceData.freezerTargetTemperature.logic.range.step;
						$scope.settingTemp({
							'freezerTargetTemperature': $scope.freezerTargetTemperature
						});
					}
				}

			};
			//设置温度
			$scope.settingTemp = function(params){
				$interval.cancel(TempInterval);
				TempInterval = null;
				TempInterval = $interval(function(){
					FRIDGE.setAttr([params],function(){},function(){});
					FRIDGE.operation();
					$interval.cancel(TempInterval);
				},300);
			};
			//设置模式
			$scope.setMode = function(type){
				$scope[type] = !$scope[type];
				var param = {};
				param[type] = $scope[type];
				FRIDGE.setAttr([param],function(data){
					$scope.refreshDeviceInfo(data);
				},function(){});
				FRIDGE.operation();
			};
		}
	]);
});