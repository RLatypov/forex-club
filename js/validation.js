"use strict";

ValidForm = function() {};

ValidForm.prototype.isValid = function(elem) {
    this.elem = elem;
    this.value = $.trim(this.elem.val());
    this.data = this.elem.attr('data-validation');

    if(this.data.indexOf('required-entry') !== -1) {
        this.resetError();
        if (!this.value) {
            this.showError(' Это поле необходимо заполнить.');
            return;
        }
    }

    if(this.data.indexOf('validate-email') !== -1) {
        this.resetError();
        if(!this.isValidEmailAddress()) {
            this.showError(' Пожалуйста, введите корректный адрес электронной почты.');
        }
    }

    if(this.data.indexOf('validate-tel') !== -1) {
        this.resetError();
        if (!this.isValidTel()) {
            this.showError(' Неверный номер телефона.');
        }
    }

    if(this.data.indexOf('validate-captcha') !== -1) {
        this.resetError();
        if (this.value != 80231) {
            this.showError(' Неверный проверочный код.');
        }
    }
};

ValidForm.prototype.isValidEmailAddress = function() {
    var pattern = new RegExp(/^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i);
    return pattern.test(this.value);
};

ValidForm.prototype.isValidTel = function() {
    var pattern = new RegExp(/^\d+$/i);
    return pattern.test(this.value);
};

ValidForm.prototype.showError = function(error) {
    this.elem.parent().append('<span class="error">'+error+'</span>');
    this.elem.addClass('validation-error');
};

ValidForm.prototype.resetError = function() {
    this.elem.parent().find('.error').remove();
    this.elem.removeClass('validation-error');
};