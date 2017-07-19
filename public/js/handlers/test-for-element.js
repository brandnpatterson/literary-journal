/*
  Delete post
*/

var test = module.exports = {
  // test.forElement created to avoid errors if the element is not present in the DOM
  forElement: function (el, eventType, method) {
    if (el) {
      el.addEventListener(eventType, method);
    }
  }
}
