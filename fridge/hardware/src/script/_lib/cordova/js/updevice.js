var updevice = {
    deviceChangeListener: undefined,

    getDeviceInfo: function (successCB, errorCB, mac) {
        cordova.exec(successCB, errorCB, "UP_DEVICE", "getDeviceInfo", [mac]);
    },

    execDeviceOperation: function (successCB, errorCB, mac, commands, groupCmdName) {
        cordova.exec(successCB, errorCB, "UP_DEVICE", "execDeviceOperation", [mac, commands, groupCmdName]);
    },

    getDeviceList: function (successCB, errorCB) {
        cordova.exec(successCB, errorCB, "UP_DEVICE", "getDeviceList", []);
    },

    subscribeDeviceChange: function (successCB, errorCB, mac, deviceChangeListener) {
        this.deviceChangeListener = deviceChangeListener;
        cordova.exec(successCB, errorCB, "UP_DEVICE", "subscribeDeviceChange", [mac]);
    },

    unsubscribeDeviceChange: function (successCB, errorCB, mac) {
        this.deviceChangeListener = undefined;
        cordova.exec(successCB, errorCB, "UP_DEVICE", "unsubscribeDeviceChange", [mac]);
    }
};

window.publishDeviceChange = function (mac, info) {
    console.log("publishDeviceChange");
    if (updevice.deviceChangeListener != undefined) {
        updevice.deviceChangeListener(mac, info);
    } else {
        console.log("deviceChangeListener is undefined");
    }
}

window.publishDeviceAlarm = function (mac, info, alarms) {
    console.log("publishDeviceAlarm");
    if (updevice.deviceChangeListener != undefined) {
        updevice.deviceChangeListener(mac, info, alarms);
    } else {
        console.log("deviceAlarmListener is undefined");
    }
}