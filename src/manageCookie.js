var manageCookie = {
    setCookie : function (name,value,time) {
        document.cookie = name+'='+value+';max-age='+time;
        return this
    },
    removeCookie : function (name) {
        return this.setCookie(name,'',-1);
    },
    getCookie : function (name, callback) {
        var allCookieArr = document.cookie.split('; ');
        for (var i = 0; i < allCookieArr.length; i ++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if(itemCookieArr[0] == name){
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}