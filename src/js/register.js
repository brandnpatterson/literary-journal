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
