define(['angular','LANG','uiRouter','angularIOS'],
function(angular,LANG){
'use strict';
return angular.module('deviceApp', ['ngIOS9UIWebViewPatch'])
	.config(['$translateProvider','$stateProvider','$locationProvider',
	function($translateProvider, $stateProvider , $locationProvider){
        // 加载语言包
        for(var key in LANG){
            $translateProvider.translations(key, LANG[key]);
        }
        // 默认语言包
        $translateProvider.preferredLanguage('ZN');
        
		//设备信息路由
		var DeviceHeader = {
                templateUrl :'../deviceHeader/deviceHeader.html',
                controller : "deviceHeaderController",
                resolve : {
                    title:function(){
                        return "冰箱";
                    },
                    load : loadDeps([
                        "../../deviceHeader/deviceHeader",
                        "css!../../deviceHeader/deviceHeader.css"
                    ])
                }    
            },
            DeviceInfo = {
				templateUrl :'../deviceInfo/deviceInfo.html',
                controller : "deviceInfoController",
                resolve : {
                    load : loadDeps([
                        "../../deviceInfo/deviceInfo",
                        "css!../../deviceInfo/deviceInfo.css"
                    ])
                }    
            },
            DeviceEdit={
               templateUrl :'../deviceEdit/deviceEdit.html',
                controller : "deviceEditController",
                resolve : {
                    load : loadDeps([
                        "../../deviceEdit/deviceEdit",
                        "css!../../deviceEdit/deviceEdit.css"
                    ])
                } 
            };
		//设置路由
		$stateProvider.state("parent",{
            url:"/",
            views:{
                'WrapContent':{
                    templateUrl :"index/index.html",
                    controller : "IndexController",
                    resolve : {
                        title:function(){
                            return "冰箱";
                        },
                        load : loadDeps([
                            "../index/index"
                        ])
                    }    
                },
                'DeviceInfo': DeviceInfo,
                'DeviceHeader': DeviceHeader
            }
        }).state("deviceedit",{
            url:"/deviceedit",
            views:{
                'WrapContent': DeviceEdit,
                'DeviceHeader': DeviceHeader
            }
        });
		
        $stateProvider.state("otherwise", {
            url : "*path",
            views:{
                'WrapContent':{
                    template : "" ,
                    controller : ['$state',
                        function ( $state ) {
                            $state.go( "parent" );
                        }
                    ]
                },
                'DeviceInfo': DeviceInfo,
                'DeviceHeader': DeviceHeader
            }
        });


		function loadDeps( deps ) {
			return ['$q', function ( $q ) {
					var def = $q.defer();
					require( deps , function () {
						def.resolve();
					});
					return def.promise;
				}
			];
		};
	}]);
});
