var bookshelf = require('../config/bookshelf'),
    CustQuiz = require('./CustQuiz');
	
var FirstLookFeedback = bookshelf.Model.extend({  
    tableName: 'first_look_feedback',
    hasTimestamps: true,
    firstLook: function(){
    	return this.hasMany(FirstLook,'feedback_id');
    }
});

module.exports = FirstLookFeedback;