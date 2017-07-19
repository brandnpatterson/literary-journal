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
    this.formLogIn = document.querySelector('.form-log-in');
    this.failEmail  = document.querySelector('.input-fail-email');
    var emailLogIn = document.querySelector('.email-log-in');
    var passLogIn  = document.querySelector('.password-log-in');
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
