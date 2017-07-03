const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.loginForm = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register'
  });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Must supply a name for your account').notEmpty();
  req.checkBody('email', 'Must be a valid email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password must not be blank').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password must not be blank').notEmpty();
  req.checkBody('password-confirm', 'Your passwords do not match').equals(req.body.password);

  // handle errors locally instead of using middleware
  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {

};
