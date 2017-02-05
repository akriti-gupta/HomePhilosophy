var bookshelf = require('../config/bookshelf'),
    CustQuizResult = require('../models/CustQuizResult');

// var Users = new bookshelf.Collection();
// Users.model = User;


var CustQuizResults = bookshelf.Collection.extend({  
    model: CustQuizResult
});

module.exports = CustQuizResults;
