/*
  Delete post
*/

const test = module.exports = {
  // test.forElement created to avoid errors if the element is not present in the DOM
  forElement (el, eventType, method) {
    if (el) {
      el.addEventListener(eventType, method);
    }

    const isFunction = (functionToCheck) => {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };

    if (isFunction(eventType)) {
      console.error('Event type declared as a function. Check to see if event type was left out of the argument.');
    }
  }
};
