var bookshelf = require('../config/bookshelf'),
    CustRoom = require('../models/CustRoom');

// var Users = new bookshelf.Collection();
// Users.model = User;


var CustRooms = bookshelf.Collection.extend({  
    model: CustRoom
});

module.exports = CustRooms;
