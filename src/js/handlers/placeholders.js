import formData from '../data/form-data';

const placeholders = {
    // set initial input placeholder values
    init (requiredInputs) {
        requiredInputs.map((input, index) => {
            if (input) {
                input.placeholder = formData[index].placeholder;
            }
        }, this);
    },
    toggle (requiredInputs) {
        requiredInputs.map((input, index) => {
            if (event.target != input) {
                input.placeholder = formData[index].placeholder;
            } else {
            // toggle input placeholder value to blank only when user selects input
                input.placeholder = '';
            }
        }, this);
    }
};

export default placeholders;
