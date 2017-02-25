
var bookshelf = require('../config/bookshelf'),
    User = require('./User'),
    CustQuiz = require('./CustQuiz'),
    Style = require('./Style');


  var CustQuizResult = bookshelf.Model.extend({  
    tableName: 'cust_quiz_result',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
    },
    style: function(){
  	 return this.belongsTo(Style,'styleId');
    },
    quiz: function(){
      return this.belongsTo(CustQuiz, 'quizId');  
    }
});
  module.exports = CustQuizResult;