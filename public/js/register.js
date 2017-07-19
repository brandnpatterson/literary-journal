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
    placeholders.init(this.requiredRegister);
  },
  cacheDOM: function () {
    this.formRegister = document.querySelector('.form-register');
    this.failEmail  = document.querySelector('.input-fail-email');
    var nameRegister = document.querySelector('.name-register');
    var emailRegister = document.querySelector('.email-register');
    var passRegister  = document.querySelector('.password-register');
    var passRegisterConfirm  = document.querySelector('.password-register-confirm');
    this.requiredRegister = [
      emailRegister,
      passRegister,
      passRegisterConfirm,
      nameRegister
    ];
  },
  bindEvents: function () {
    // test.forElement found in handlers folder
    test.forElement(this.formRegister , 'click', this.liveValidation.bind(this));
    test.forElement(this.formRegister, 'click', this.placeholdersToggle.bind(this));
  },
  liveValidation: function () {
    validation.liveValidation(this.requiredRegister);
  },
  placeholdersToggle: function () {
    placeholders.toggle(this.requiredRegister);
  }
}
auth.init();
