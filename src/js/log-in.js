/*
  Flutter Sign in
*/

import testForElement from './handlers/test-for-element';
import placeholders from './handlers/placeholders';
import validation from './handlers/validation';

const auth = {
    init () {
        this.cacheDOM();
        this.bindEvents();
        placeholders.init(this.requiredLogIn);
    },
    cacheDOM () {
        this.formLogIn = document.querySelector('.login-form');
        const emailLogIn = document.querySelector('.login-email');
        const passLogIn  = document.querySelector('.login-password');
        this.requiredLogIn = [
            emailLogIn,
            passLogIn
        ];
    },
    bindEvents () {
    // testForElement found in handlers folder
        testForElement(this.formLogIn , 'click', this.liveValidation.bind(this));
        testForElement(this.formLogIn, 'click', this.placeholdersToggle.bind(this));
    },
    liveValidation () {
        validation.liveValidation(this.requiredLogIn);
    },
    placeholdersToggle () {
        placeholders.toggle(this.requiredLogIn);
    }
};
auth.init();
