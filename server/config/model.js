// var DB = require('./db').DB;

var bookshelf = require('./db');


var User = bookshelf.Model.extend({
   tableName: 'user',
   idAttribute: 'id'
});

module.exports =  bookshelf.model('User', User);;