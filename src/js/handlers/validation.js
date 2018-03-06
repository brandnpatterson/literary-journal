import formData from '../data/form-data';

const validation = {
    liveValidation (requiredInputs) {
        requiredInputs.map((input, index) => {
            const validationMessage = input.nextSibling;
            if (input.value === '') {
                validationMessage.textContent = '';
                validationMessage.nextSibling.classList.add('hidden');
                event.preventDefault();
                return;
            } else if (input.value.match(formData[index].regex)) {
                input.parentNode.classList.add('flex');

                if (this.failEmail) {
                    return false;
                } else {
                    validationMessage.nextSibling.classList.remove('hidden');
                }

                validationMessage.textContent = '';
                validationMessage.classList.remove('input-fail');
                validationMessage.classList.add('input-success');
            } else {
                event.preventDefault();
                input.parentNode.classList.remove('flex');
                validationMessage.textContent = formData[index].error;
                validationMessage.nextSibling.classList.add('hidden');
                validationMessage.classList.remove('input-success');
                validationMessage.classList.add('input-fail');
            }
        }, this);
    }
};

export default validation;
