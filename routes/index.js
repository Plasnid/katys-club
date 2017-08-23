const express = require('express');
const router = express.Router();
//what kinds of controllers
/*
what are your main aspects, make a controller and a model for each
-groups
-users
-books
-meetings
*/
//const groupController = require('../controllers/groupController');
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
//const meetingController = require('../controllers/meetingController');

router.get('/', userController.getUser);

router.get('/books/:page', bookController.getBooks);



module.exports = router;
