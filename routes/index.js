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

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', userController.getUser);

router.get('/register', userController.registrationForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  /*,authController.login*/
);

router.get('/books/:page/:limit/:category/:term/:direction', catchErrors(bookController.getBooks));
router.get('/books/:page/:limit/:category/:term', catchErrors(bookController.getBooks));
router.get('/books/:page/:limit/:category', catchErrors(bookController.getBooks));
router.get('/books/:page', catchErrors(bookController.getBooks));



module.exports = router;
