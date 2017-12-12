var upuser = {
    /**
     * [getUserInfo 获取用户登录信息]
     * @param  {[type]} successCB [description]
     * @param  {[type]} errorCB   [description]
     * @return {[type]}           [description]
     */
    getUserInfo: function (successCB, errorCB) {
        cordova.exec(successCB, errorCB, "UP_USER", "getUserInfo", []);
    },

    /**
     * [getSignCode 获取签名]
     * @param  {[type]} successCB   [description]
     * @param  {[type]} errorCB     [description]
     * @param  {[type]} data [请求体包装，例如：{"data": {},"timestamp": 1487128699888}]
     * @return {[type]}             [description]
     */
    getSignCode: function (successCB, errorCB, data) {
        cordova.exec(successCB, errorCB, "UP_USER", "getSignCode", [data]);
    }
};