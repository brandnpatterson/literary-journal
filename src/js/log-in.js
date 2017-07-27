/*
  Flutter Sign in
*/

import test from './handlers/test-for-element';
import placeholders from './handlers/placeholders';
import validation from './handlers/validation';

var auth = {
  init: function () {
    this.cacheDOM();
    this.bindEvents();
    placeholders.init(this.requiredLogIn);
  },
  cacheDOM: function () {
    this.formLogIn = document.querySelector('.login-form');
    var emailLogIn = document.querySelector('.login-email');
    var passLogIn  = document.querySelector('.login-password');
    this.requiredLogIn = [
      emailLogIn,
      passLogIn
    ];
  },
  bindEvents: function () {
    // test.forElement found in handlers folder
    test.forElement(this.formLogIn , 'click', this.liveValidation.bind(this));
    test.forElement(this.formLogIn, 'click', this.placeholdersToggle.bind(this));
  },
  liveValidation: function () {
    validation.liveValidation(this.requiredLogIn);
  },
  placeholdersToggle: function () {
    placeholders.toggle(this.requiredLogIn);
  }
}
auth.init();
