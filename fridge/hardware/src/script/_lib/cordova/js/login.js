var login = {
    dispatchUserInfo: function (loginData) {
        cordova.exec(function(){}, function(){}, "LOGIN", "dispatchUserInfo", [loginData]);
    }
};