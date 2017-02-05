var bookshelf = require('../config/bookshelf'),
	User = require('./User'),
	CustQuiz = require('./CustQuiz');

var CustImage = bookshelf.Model.extend({  
    tableName: 'cust_img_selection',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	},
  	quiz: function(){
  		return this.belongsTo(CustQuiz, 'quizId');	
  	}
});

module.exports = CustImage;