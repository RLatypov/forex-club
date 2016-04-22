"use strict";

function initSocial() {
    var $socialHeader = $('.social-header'),
        showSocialHeader;

    var socialStorage = new StorageData('fx-social-header','hide');

    showSocialHeader = socialStorage.getStorage() != socialStorage.value;

    if(showSocialHeader) {
        $socialHeader.show();
    }

    $socialHeader.find('.close').click(function() {
        socialStorage.setStorage();
        $socialHeader.hide();
    });
}

function initClock() {
    var clock1 = new FxClock({
        element : '#fx-clock-1',
        expires : 'April 29 2016 22:59:59'
        //expires : new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000)
    });

    clock1.init();
}

function initValid() {
    var $form = $('#form-registration');
    if(!$form.length) return;

    var validForm = new ValidForm();

    $form.find('button[type=submit]').on('click', function(e) {
        e.preventDefault();

        $form.find('[data-validation]').each(function() {
            validForm.isValid($(this));
        });

        if(!$form.find('.error').length) {
            var formStorage = new StorageData(
                'fx-registration','true', { expires: 'April 29 2021 22:59:59'});

            if(formStorage.getStorage()) {
                alert('Вы уже зарегистрированы!');
            } else {
                formStorage.setStorage();
                $form.submit();
                window.location.reload();
                alert('Вы успешно зарегистрированы!');
            }
        }
    });

    $form.find('input[data-validation]').on('keyup', function() {
        validForm.isValid($(this));
    });

    $form.find('select').on('change', function() {
        validForm.isValid($(this));
    });
}

function initCountMember() {
    var memberStorage = new StorageData('fx-registration');

    if(memberStorage.getStorage()) {
        var $countMember = $('.count-member'),
            $countTickets = $('.count-tickets'),
            countMemberString = $.trim($countMember.eq(0).text()),
            countMemberInt = parseInt(countMemberString.replace(',','')) + 1,
            countMemberIntToString = countMemberInt.toString(),
            newCountMemberString = '', i;

        for(i = 0; i < countMemberIntToString.length; i++) {
            newCountMemberString += countMemberIntToString.charAt(i);
            if(i == 0) {
                newCountMemberString += ',';
            }
        }

        $countMember.text(newCountMemberString);
        $countTickets.text(num2word(countMemberInt,['билет','билета','билетов']));
    }
}

$(document).ready(function() {
    initSocial();
    initClock();
    initValid();
    initCountMember();
});