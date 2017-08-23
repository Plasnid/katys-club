const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const promisify = require('es6-promisify');

exports.getBooks = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 5;
  const skip = (page * limit) - limit;
  //now we query for a full list of the books
  const booksPromise = Book
  .find()
  .skip(skip)
  .limit(limit)
  .sort({ lastName: '1' });

  const countPromise = Book.count();

  const [books, count] = await Promise.all([booksPromise, countPromise]);

  const pages = Math.ceil(count / limit);
  if(!books.length && skip){
    req.flash('info', `Hey!  You asked for page ${page}, but that page doesn't exist.  So I put you on page ${pages}`);
    res.redirect(`/books/page/${pages}`);
    return;
  }
  res.json(books);
}
