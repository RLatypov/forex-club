"use strict";

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function num2word(num,words) {
    num = num % 100;
    if (num > 19) {
        num = num % 10;
    }
    switch (num) {
        case 1:  {
            return(words[0]);
        }
        case 2:
        case 3:
        case 4:  {
            return(words[1]);
        }
        default: {
            return(words[2]);
        }
    }
}