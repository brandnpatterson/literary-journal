/*
  Form data
*/

var formData = module.exports = {
  data: [
    {
      placeholder: 'email',
      regex: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
      error: 'Must be a valid email'
    },
    {
      placeholder: 'password',
      regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$',
      error: 'Must have upper case, lower case & a number'
    },
    {
      placeholder: 'confirm password',
      regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$',
      error: 'Must have upper case, lower case & a number'
    },
    {
      placeholder: 'name'
    },
  ]
}
