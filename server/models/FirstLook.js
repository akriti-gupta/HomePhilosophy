var bookshelf = require('../config/bookshelf'),
    CustQuiz = require('./CustQuiz'),
    User = require('./User');
	
var FirstLook = bookshelf.Model.extend({  
    tableName: 'first_look',
    hasTimestamps: true,
    quiz: function(){
      return this.belongsTo(CustQuiz, 'quizId');  
    },
    feedback: function(){
        return this.belongsTo(FirstLookFeedback,'feedback_id');
    },
    user: function(){
        return this.belongsTo(User,'customerId');
    }
});

module.exports = FirstLook;