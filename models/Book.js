const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongoosedbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please supply a book title'
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    require: 'Please supply a genre',
    trim: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
