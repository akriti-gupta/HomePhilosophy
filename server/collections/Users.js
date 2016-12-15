var bookshelf = require('../config/bookshelf'),
    User = require('../models/User');

// var Users = new bookshelf.Collection();
// Users.model = User;


var Users = bookshelf.Collection.extend({  
    model: User
});

module.exports = Users;
