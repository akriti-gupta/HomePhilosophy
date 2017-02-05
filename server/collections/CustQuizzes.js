var bookshelf = require('../config/bookshelf'),
    CustQuiz = require('../models/CustQuiz');

// var Users = new bookshelf.Collection();
// Users.model = User;


var CustQuizzes = bookshelf.Collection.extend({  
    model: CustQuiz
});

module.exports = CustQuizzes;
