/*
  Flutter Sign in
*/

import testForElement from './handlers/test-for-element';
import placeholders from './handlers/placeholders';
import validation from './handlers/validation';

var auth = {
    init () {
        this.cacheDOM();
        this.bindEvents();
        placeholders.init(this.requiredRegister);
    },
    cacheDOM () {
        this.formRegister = document.querySelector('.register-form');
        var nameRegister = document.querySelector('.register-name');
        var emailRegister = document.querySelector('.register-email');
        var passRegister  = document.querySelector('.register-password');
        var passRegisterConfirm  = document.querySelector('.register-password-confirm');
        this.requiredRegister = [
            emailRegister,
            passRegister,
            passRegisterConfirm,
            nameRegister
        ];
    },
    bindEvents () {
        // testForElement found in handlers folder
        testForElement(this.formRegister , 'click', this.liveValidation.bind(this));
        testForElement(this.formRegister, 'click', this.placeholdersToggle.bind(this));
    },
    liveValidation () {
        validation.liveValidation(this.requiredRegister);
    },
    placeholdersToggle () {
        placeholders.toggle(this.requiredRegister);
    }
};
auth.init();
