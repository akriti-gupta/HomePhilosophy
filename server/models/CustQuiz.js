
var bookshelf = require('../config/bookshelf'),
	User = require('./User'),
	CustImage= require('./CustImage'),
	CustRoom= require('./CustRoom'),
	CustPackage= require('./CustPackage'),
	CustPkgTxn= require('./CustPkgTxn'),
	CustQuizResult= require('./CustQuizResult'),
  CustAppt= require('./CustAppt');

var CustQuiz = bookshelf.Model.extend({  
    tableName: 'cust_quiz',
    hasTimestamps: true,
    idAttribute: 'quizId',
    
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	},
  	image: function(){
  		return this.hasMany(CustImage,'quizId');
  	},
  	room: function(){
  		return this.hasMany(CustRoom,'quizId');
  	},
  	pkg: function(){
  		return this.hasMany(CustPackage,'quizId');
  	},
  	pkgTxn: function(){
  		return this.hasMany(CustPkgTxn,'quizId');
  	},
  	result: function(){
  		return this.hasMany(CustQuizResult,'quizId');
  	},
    appt: function(){
      return this.hasMany(CustAppt,'quizId');
    },
    firstLook:function(){
      return this.hasMany(FirstLook,'quizId');
    }
});
module.exports = CustQuiz;

