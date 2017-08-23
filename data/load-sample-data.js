require('dotenv').config({ path: __dirname + '/../variables.env'});
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise // Mongoose to use ES6 promises

const Book = require('../models/Book');

const books = JSON.parse(fs.readFileSync(__dirname+'/selectionHistoryBooks.json', 'utf-8'));

async function deleteData(){
  console.log('..removing the data..');
  await Book.remove();
  console.log('old data now removed');
  process.exit();
}

async function loadData(){
  try {
    await Book.insertMany(books);
    console.log("books are ready!");
    process.exit();
  }catch(e){
    console.log("error adding the books");
    console.log(e);
    process.exit();
  }
}
if(process.argv.includes('--delete')) {
  deleteData();
}else{
  loadData();
}
