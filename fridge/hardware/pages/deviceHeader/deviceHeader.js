//根路径
define(['APP', 'deviceReady'], function(APP, deviceReady) {
  'use strict';
  APP.controller('deviceHeaderController', ['$scope', '$timeout', '$location', '$state', '$rootScope',
    function($scope, $timeout, $location, $state, $rootScope) {
      //获取url参数
      $scope.UrlGet = $$.getUrlParams();
      // title
      $scope.HeaderTitle = $rootScope.devicename || '';
      var _devicemac = $rootScope.devicemac || $scope.UrlGet.devicemac;
      
      $scope.backButtonClick = function() {
        var nav = navigator || window.navigator;
        var his = history || window.history;

        if ($state.current && $state.current.name != 'parent') {
          // 后退
          his.go(-1);
        } else {
          // 退出
          if (deviceParam.CORDOVA_PATH == "ios") {
            // 临时iOS用
            window.initDeviceReady(function() {
              updevice.unsubscribeDeviceChange(function() {}, function() {}, ''+_devicemac);
            });
          } else {
            if (typeof(nav.app.exitApp) !== "undefined") {
              nav.app.exitApp();
            }
          }
        }
      };

      $rootScope.$on("deviceNameChanged", function(event, data) {
        $scope.HeaderTitle = data;
      });
    }
  ]);
});