"use strict";

function FxClock(options) {
    this.elem         = options.element;
    this.expires      = options.expires;

    this.wordsDays    = ['день', 'дня', 'дней'];
    this.wordsHours   = ['час', 'часа', 'часов'];
    this.wordsMinutes = ['минута', 'минуты', 'минут'];
    this.wordsSeconds = ['секунда', 'секунды', 'секунд'];
}

FxClock.prototype.init = function() {
    $(this.elem).html(this.template());

    this.positions    = $(this.elem).find('.position');
    this.word         = $(this.elem).find('.word');

    var clockStorage = new StorageData(this.elem.substring(1),this.expires, { expires: this.expires } );

    var getStorage = clockStorage.getStorage();

    getStorage === undefined || getStorage == null
        ? clockStorage.setStorage()
        : this.expires = getStorage;

    this.updateClock();
    this.timeInterval = setInterval(this.updateClock.bind(this), 1000);
};

FxClock.prototype.template = function() {
    return '<div class="clock-inner">' +
        '<span class="days">' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="word"></span>' +
        '</span>'+
        '<span class="dots">:</span>' +
        '<span class="hours">'+
            '<span class="position"><span class="number"></span></span>' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="word"></span>' +
        '</span>'+
        '<span class="dots">:</span>' +
        '<span class="minutes">' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="word"></span>' +
        '</span>'+
        '<span class="dots">:</span>' +
        '<span class="seconds">' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="position"><span class="number"></span></span>' +
            '<span class="word"></span>' +
        '</span>' + '</div>';
};

FxClock.prototype.switchNumber = function(position,curNumber) {

    var number = position.find('.number');

    if(position.data('number') == curNumber || number.is(':animated')) {
        return false;
    }

    if(position.data('number') === undefined) {
        number.html(curNumber);
    }

    else {
        var replacement = $('<span>', {
            'class':'number',
            css:{
                top: -30,
                opacity: 0
            },
            html:curNumber
        });

        number
            .before(replacement)
            .animate({top:30,opacity:0},'fast',function() {
                number.remove();
            });

        replacement
            .delay(100)
            .animate({top:6,opacity:1},'fast');
    }

    position.data('number', curNumber);
};

FxClock.prototype.getTimeRemaining = function(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());

    t = t <= 0 ? 0 : t;

    var seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

FxClock.prototype.updateClock = function() {
    var t = this.getTimeRemaining(this.expires);

    this.updateNumber(0,1,t.days);
    this.updateNumber(2,3,t.hours);
    this.updateNumber(4,5,t.minutes);
    this.updateNumber(6,7,t.seconds);

    this.word.eq(0).html(num2word(t.days,this.wordsDays));
    this.word.eq(1).html(num2word(t.hours,this.wordsHours));
    this.word.eq(2).html(num2word(t.minutes,this.wordsMinutes));
    this.word.eq(3).html(num2word(t.seconds,this.wordsSeconds));

    if (t.total <= 0) {
        clearInterval(this.timeInterval);
    }
};

FxClock.prototype.updateNumber = function(minor,major,value) {
    this.switchNumber(this.positions.eq(minor),Math.floor(value/10)%10);
    this.switchNumber(this.positions.eq(major),value%10);
};