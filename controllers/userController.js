const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.getUser = (req, res){
  res.render('I welcome to the landing page');
}