var bookshelf = require('../config/bookshelf'),
    User = require('./User'),
    CustQuiz = require('./CustQuiz');
	
var CustAppt = bookshelf.Model.extend({  
    tableName: 'cust_appointment',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	},
    quiz: function(){
      return this.belongsTo(CustQuiz, 'quizId');  
    }
});

module.exports = CustAppt;