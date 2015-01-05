/*!
* FocusAlerts.js
* focus Firefox alerts
* https://github.com/stevenirby/Firefox-Popup-Alerts
*
* Forces Firefox 4+ to use the old alert style so you can bring focus to a popup window. 
*
* Copyright 2012, Steven Irby
* Dual licensed under the MIT or GPL Version 2 licenses.
*/

(function () {
    window.falert = function (msg, url) {
        /*
         * Capture the old unload, if there was one. 
         * Then change the window.location to a new one,  triggering the alert.
         */

        if (/Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4) {
            var oldUnload = window.onbeforeunload || null;

            url = url || window.location.href + '?';

            window.onbeforeunload = function(e) {
                window.alert(msg);
                window.onbeforeunload = oldUnload;
            }
            window.location.href = url;
        }
    }
    
    window.fconfirm = function (msg, url, cancelCb, okCb) {
        /*
         * Capture the old unload, if there was one. 
         * Then change the window.location to a new one,  triggering the alert.
         */

        if (/Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4) {
            var oldUnload = window.onbeforeunload || null;
            
            url = url || window.location.href + '?';
            
            window.onbeforeunload = function(e) {
                var c = window.confirm(msg);
                window.onbeforeunload = oldUnload;
                
                if (c) {
                    // if there was a callback for ok call it
                    if (Object.prototype.toString.call(okCb) === "[object Function]") {
                        okCb();
                    }
                } else {
                    // if there was a callback for cancel call it
                    if (Object.prototype.toString.call(cancelCb) === "[object Function]") {
                        cancelCb();
                    }
                }
            }
            window.location.href = url;
        }
    }
}());
