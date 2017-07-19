/*
  Handlers used in multiple objects
*/

// formData used to match user input for validation
import formData from '../form-data';

var validation = module.exports = {
  liveValidation: function (requiredInputs) {
    requiredInputs.map(function (input, index) {
      var validationMessage = input.nextSibling;
      if (input.value === '') {
        event.preventDefault();
        return;
      } else if (input.value.match(formData.data[index].regex)) {
        input.parentNode.classList.add('flex');
        this.failEmail ? validationMessage.textContent = '' : validationMessage.textContent = '√';
        validationMessage.classList.remove('input-fail');
        validationMessage.classList.add('input-success');
      } else {
        event.preventDefault();
        input.parentNode.classList.remove('flex');
        validationMessage.textContent = formData.data[index].error;
        validationMessage.classList.remove('input-success');
        validationMessage.classList.add('input-fail');
      }
    }, this);
  }
}
