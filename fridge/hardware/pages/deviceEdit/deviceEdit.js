//根路径
define(['APP', 'Service'], function(APP, Service) {
	'use strict';
	APP.controller('deviceEditController', ['$scope', '$q', '$http', '$rootScope', '$translate', '$location',
		function($scope, $q, $http, $rootScope, $translate, $location) {
			//获取url参数
			// $scope.UrlGet = $location.search();
			
			// 返回顶部
			$$('html,body').scrollTop(0,100);
			
			var _devicemac = $rootScope.devicemac || "";
			var _devicename = $rootScope.devicename || '';
			
			$scope.devicename = _devicename;
			var timestamp = +(new Date());

			$scope.renameConfirm = function(){
				if(window.isTestParam){
					
					$rootScope.devicename = $scope.devicename;
					$rootScope.$broadcast('deviceNameChanged', $scope.devicename);
				}else{
					window.initDeviceReady(function(){
						Service.getUserInfo(function(){
							// 编辑名称
							var bodyData = {
                                "deviceName": $scope.devicename,
								"deviceId": _devicemac
							};
							$scope.getMallSign(JSON.stringify(bodyData), "/uplus/device/v1/rename").then(function(sign) {
								if (sign) {
									Service.APP_INFO.sign = sign;
									Service.APP_INFO.timestamp = String(timestamp);

									// rename
									$scope.deviceRenameFn(bodyData);
								}else{
									console.log("sign 为空："+JSON.stringify(sign));
								};
							});
						});
					});
				}
			};
			//rename
			$scope.deviceRenameFn = function(bodyData) {
				var rec_url = Service.Params.WEBSITE_URL + "uplus/device/v1/rename",
					app_info = Service.APP_INFO;
				// 查询推荐信息
				$http({
					method: 'POST',
					url: rec_url,
					headers: app_info,
					data: bodyData
				}).success(function(response) {
					if ("00000" == response.retCode) {
						$rootScope.devicename = $scope.devicename;
						$rootScope.$broadcast('deviceNameChanged', $scope.devicename);
						console.log("rename success !");
					}
				}).error(function(e) {
					console.log("rename error !!!" + JSON.stringify(e));
				});
			};
			//获取签名
			$scope.getMallSign = function(deviceData, url) {
				var deferred = $q.defer();
				
				Service.execInterface('getSignCode', {
					"data": deviceData,
					"url": url,
					"timestamp": String(timestamp)
				}, function(_ResultData) {
					// ResultData = (new Function("return " + ResultDataResponse))();
					var ResultData = null;
					if(Object.prototype.toString.call(_ResultData) != '[object Object]'){
						ResultData = JSON.parse(ResultData);
					}else{
						ResultData = _ResultData;
					}
					if (ResultData.retCode == "00000") {
						deferred.resolve(ResultData.data.sign);
					}else{
						console.log("获取签名失败："+JSON.stringify(ResultData));
					}
				});
				return deferred.promise;
			};
		}
	]);
});