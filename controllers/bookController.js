const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const promisify = require('es6-promisify');

exports.getBooks = async (req, res) => {
  const page = req.params.page || 1;
  const limit = parseInt(req.params.limit || 10);
  const searchCategory = req.params.category || 'title';
  const searchTerm = req.params.term || '';
  const resultDirection = req.params.direction || 1;
  const searchExpression = `.*${searchTerm}.*`;
  const skip = (page * limit) - limit;
  //now we query for a full list of the books
  const booksPromise = Book
  .find({[`${searchCategory}`]:{'$regex': [`${searchExpression}`], '$options' : 'i'}})
  //.find()
  .skip(skip)
  .limit(limit)
  .sort({ [`${searchCategory}`]: [`${resultDirection}`] });

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
