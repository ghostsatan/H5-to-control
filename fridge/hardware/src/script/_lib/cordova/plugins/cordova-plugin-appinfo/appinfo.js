cordova.define("cordova-plugin-appinfo.app", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

//channel.createSticky('onCordovaInfoReady');
//// Tell cordova channel to wait on the CordovaInfoReady event
//channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the android application, and provides properties for inspecting
 * the appId, appKey, versionName and clientId of app.
 * @constructor
 */
function App() {
    this.appId = null;
    this.appKey = null;
    this.versionName = null;
    this.clientId = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            me.appId = info.appId;
            me.appKey = info.appKey;
            me.versionName = info.versionName;
            me.clientId = info.clientId;
            channel.onCordovaInfoReady.fire();
        },function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

/**
 * Get app info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
App.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'App.getInfo', arguments);
    exec(successCallback, errorCallback, "APP_INFO", "getAppInfo", []);
};

module.exports = new App();

});
