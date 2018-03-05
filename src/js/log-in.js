/*
  Flutter Sign in
*/

import test from './handlers/test-for-element';
import placeholders from './handlers/placeholders';
import validation from './handlers/validation';

var auth = {
  init () {
    this.cacheDOM();
    this.bindEvents();
    placeholders.init(this.requiredLogIn);
  },
  cacheDOM () {
    this.formLogIn = document.querySelector('.login-form');
    var emailLogIn = document.querySelector('.login-email');
    var passLogIn  = document.querySelector('.login-password');
    this.requiredLogIn = [
      emailLogIn,
      passLogIn
    ];
  },
  bindEvents () {
    // test.forElement found in handlers folder
    test.forElement(this.formLogIn , 'click', this.liveValidation.bind(this));
    test.forElement(this.formLogIn, 'click', this.placeholdersToggle.bind(this));
  },
  liveValidation () {
    validation.liveValidation(this.requiredLogIn);
  },
  placeholdersToggle () {
    placeholders.toggle(this.requiredLogIn);
  }
}
auth.init();
