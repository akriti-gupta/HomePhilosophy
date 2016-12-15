
var bookshelf = require('../config/bookshelf'),
	User = require('./User');

var CustQuiz = bookshelf.Model.extend({  
    tableName: 'cust_quiz',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	}
});
module.exports = CustQuiz;

