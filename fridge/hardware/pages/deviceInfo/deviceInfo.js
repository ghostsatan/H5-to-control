//根路径
define(['APP'], function(APP) {
	'use strict';
	APP.controller('deviceInfoController', ['$http', '$rootScope', '$scope', '$q', '$timeout', '$translate', '$state',
		function($http, $rootScope, $scope, $q, $timeout, $translate, $state) {
			
			//获取url参数
			$scope.UrlGet = $$.getUrlParams();
			var _isOwner = $scope.UrlGet.isowner || 0;
			var _devicemac = $scope.UrlGet.devicemac || "";
			var _devicename = $rootScope.devicename || decodeURI($scope.UrlGet.devicename);
			var _lang = $scope.UrlGet.lang;

			//设定语言包
			// _lang?($translate.use(_lang.toUpperCase())):null;

			$scope.isowner = _isOwner==1?true:false;
			$scope.deviceName = (_devicename && _devicename != 'undefined')?_devicename:"";

			$rootScope.devicename = _devicename;
			$rootScope.devicemac = _devicemac;

			$rootScope.$broadcast('deviceNameChanged', $scope.deviceName);
			// $rootScope.lang = _lang;


			// $scope.ifDetailInfo = false;
			//声明
			$scope.Load = {
				// 编辑设备详细信息跳转入口
				editDeviceInfo: function() {
					// 判断是否可编辑
					if ($scope.isowner) {
						$state.go('deviceedit');
					}
				},

				bussiness: function() {
					//绑定事件
					$$.initAccordion(false);
					
				}
			};
			//设备是否已经准备完成
			$scope.Load.bussiness();
		}
	]);
});