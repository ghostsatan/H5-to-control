//文件根目录
var deviceParam = {
    //文件路径依据
    FILEROOT : 'hardware/',
    //公共js路径
    PUBLIC_LIBRARY_PATH : '../../../src/script/',
    //JS接口路径
    INTERFACE_PATH : 'http://210.51.17.150:8082/download/uplusApp/device/model/',
    //cordova名称
    CORDOVA_PATH : 'android',
    //typeId
    GLOBE_DEVICEID : '111c120024000810012100618004374300000001000061800504420000000000'
};
//文件路径
deviceParam.FILEROOT_PATH = window.location.href.substr(0,window.location.href.indexOf(deviceParam.FILEROOT)+deviceParam.FILEROOT.length);
//JS接口生产路径
if(/resource.haier.net/.test(window.location.host)){
    deviceParam.INTERFACE_PATH = 'http://resource.haier.net/download/uplusApp/device/model/';
};
//cordova名称
(function(){
    if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
        deviceParam.CORDOVA_PATH = 'ios';
    };
})();
require.config({
    //默认情况下模块所在目录为
    paths:{
        //库文件
        kelat           : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/kelat.min',
        angular         : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/angular/angular.min',
        uiRouter        : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/angular/angular-ui-router',
        translate       : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/angular/angular-translate.min',
        angularIOS      : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/angular-ios9-uiwebview.patch',
        //cordova
        Cordova         : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/cordova/cordova_' + deviceParam.CORDOVA_PATH,
        UpDevice        : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/cordova/js/updevice',
        UpUser          : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/cordova/js/upuser',
        //设备
        deviceReady     : deviceParam.PUBLIC_LIBRARY_PATH + 'deviceReady',
        //服务
        Service         : deviceParam.PUBLIC_LIBRARY_PATH + "appService",
        //jsAPI
        deviceAPI       : deviceParam.FILEROOT_PATH+'device/model/deviceApi.min',
        deviceModel     : deviceParam.FILEROOT_PATH+'device/model/FRIDGE/'+deviceParam.GLOBE_DEVICEID+'.min',
        //angular 依赖 app 模块，需要在引入main之前定义路径
        APP             : 'app',
        LANG            : 'lang'
    },
    shim:{
        'kelat'         : {exports:'$$'},
        'angular'       : {exports:'angular',init: function(){
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply( angular , arguments );
                    if ( arguments.length >= 2 ) {
                        newModule.config( [
                            '$controllerProvider' ,
                            '$compileProvider' ,
                            '$filterProvider' ,
                            '$provide' ,
                            function ( $controllerProvider , $compileProvider , $filterProvider , $provide ) {
                                newModule.controller = function () {
                                    $controllerProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.directive = function () {
                                    $compileProvider.directive.apply( this , arguments );
                                    return this;
                                };
                                newModule.filter = function () {
                                    $filterProvider.register.apply( this , arguments );
                                    return this;
                                };
                                newModule.factory = function () {
                                    $provide.factory.apply( this , arguments );
                                    return this;
                                };
                                newModule.service = function () {
                                    $provide.service.apply( this , arguments );
                                    return this;
                                };
                                newModule.provider = function () {
                                    $provide.provider.apply( this , arguments );
                                    return this;
                                };
                                newModule.value = function () {
                                    $provide.value.apply( this , arguments );
                                    return this;
                                };
                                newModule.constant = function () {
                                    $provide.constant.apply( this , arguments );
                                    return this;
                                };
                                newModule.decorator = function () {
                                    $provide.decorator.apply( this , arguments );
                                    return this;
                                };
                            }
                        ]);
                    }
                    return newModule;
                };
            }},
        'uiRouter'      : {deps:['angular']},
        'translate'     : {deps:['angular']},
        'angularIOS'    : {deps:['angular']},
        //设备
        'UpDevice'      : {deps:['Cordova']},
        'UpUser'        : {deps:['Cordova']},
        'deviceReady'   : {exports:'deviceReady',deps:['UpDevice','UpUser']},
        //JS接口
        'deviceModel'   : {deps:['deviceAPI']},
        //服务
        "Service"       : {exports:"Service",deps:["deviceReady"]},
        //app
        'APP'           : {deps:['uiRouter','translate','deviceReady']},
        'LANG'          : {exports:'LANG',deps:[]}
    },
    map:{
        '*':{
            css     : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/requireJS/css',
            text    : deviceParam.PUBLIC_LIBRARY_PATH + '_lib/requireJS/text'
        }
    },
    deps:['angular','uiRouter','angularIOS','kelat'],
    waitSeconds:0
    //,urlArgs: "bust=" + (new Date()).getTime()//防止读取缓存，调试用
});
require([
    'APP'
],function(){
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function(){
        //手动设置应用
        angular.bootstrap($html, ['ui.router','pascalprecht.translate','deviceApp']);
    });
});