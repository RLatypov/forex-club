"use strict";

function StorageData(name,value,options) {
    this.name    = name;
    this.value   = value;
    this.options = options || {};
}

StorageData.prototype.setStorage = function() {
    Modernizr.localstorage ? this.setLocalStorage() :this.setCookie();
};

StorageData.prototype.getStorage = function() {
    return Modernizr.localstorage ? this.getLocalStorage() : this.getCookie();
};

StorageData.prototype.getCookie = function() {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + this.name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

StorageData.prototype.setCookie = function() {

    var expires = this.options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = this.options.expires = d;
    }
    if (expires && expires.toUTCString) {
        this.options.expires = expires.toUTCString();
    }

    this.value = encodeURIComponent(this.value);

    var updatedCookie = this.name + "=" + this.value;

    for (var propName in this.options) {
        updatedCookie += "; " + propName;
        var propValue = this.options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
};

StorageData.prototype.getLocalStorage = function() {
    return localStorage.getItem(this.name);
};

StorageData.prototype.setLocalStorage = function() {
    localStorage.setItem(this.name,this.value);
};