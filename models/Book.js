const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongoosedbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply a book title'
  },
  firstName: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply a first name'
  },
  lastName: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply a last name'
  },
  genre: {
    type: String,
    require: 'Please supply a genre',
    trim: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
