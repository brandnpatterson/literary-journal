const testForElement = (el, eventType, method) => {
    if (el) {
        el.addEventListener(eventType, method);
    }

    const isFunction = (functionToCheck) => {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };

    if (isFunction(eventType)) {
        console.error('Event type declared as a function. Check to see if event type was left out of the argument.');
    }
};

export default testForElement;
