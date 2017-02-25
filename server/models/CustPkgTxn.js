var bookshelf = require('../config/bookshelf'),
	User = require('./User'),
	CustQuiz = require('./CustQuiz');
	
var CustPkgTxn = bookshelf.Model.extend({  
    tableName: 'cust_payment_txn',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	},
    quiz: function(){
      return this.belongsTo(CustQuiz, 'quizId');  
    }
});

module.exports = CustPkgTxn;