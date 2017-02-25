var bookshelf = require('../config/bookshelf'),
    User = require('./User'),
    Package = require('./Package'),
    CustQuiz = require('./CustQuiz');
	
var CustPackage = bookshelf.Model.extend({  
    tableName: 'cust_pkg_info',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	},
    pkg: function() {
      return this.belongsTo(Package, 'pkgId');
    },
    quiz: function(){
      return this.belongsTo(CustQuiz, 'quizId');  
    }
});

module.exports = CustPackage;