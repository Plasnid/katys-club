const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.getUser = (req, res) => {
  res.render('layout', {title: 'Welcome back!'});
}

exports.registrationForm = (req, res) => {
  res.render('register', {title:'Register'});
}

exports.validateRegister = (req, res, next) => {
  req.sanitize('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'You must supply a valid email!').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirm Password cannot be empty!').notEmpty();
  req.checkBody('password-confirm', 'Your passwords must match').equals(req.body.password);

  const errors = req.validationErrors();
  if(errors){
    //the flash is not yet happening....look into this
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title:'Register', body: req.body, flashes:req.flash() });
    return; //stop the function from running
  }
  next();
}

exports.register = async (req, res, next) => {
  const user = new User({email: req.body.email, name: req.body.name});
  const registerWithPromise = promisify(User.register, User);
  await registerWithPromise(user, req.body.password);
}
/*exports.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);*/
