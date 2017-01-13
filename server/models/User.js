// var mongoose = require('mongoose');
//    // var ModelBase = require('../config/bookshelf'),
// 	var encrypt = require('../utilities/encryption');

// var userSchema = mongoose.Schema({
// 		firstName: String,
// 		lastName: String,
// 		username: String,
// 		password: String,
// 		salt: String,
// 		role: String,
// 		token: String

// 	});

// userSchema.methods ={
// 	authenticate: function(pswd){
// 		return encrypt.hashPswd(pswd,this.salt)===this.password;
// 	}
// }
// var User = mongoose.model('User',userSchema);





// function createDefaultUsers(){
// 	User.find({}).exec(function(err,collection){
// 		if(collection.length===0){
// 			var salt,hash;
// 			salt = encrypt.createSalt();
// 			hash = encrypt.hashPswd('test',salt)
// 			User.create({firstName:'Admin',username:'admin@hp.com',salt: salt, password:hash, role:'admin'});
// 		}
// 	})
// }


// //exports.User = User;
// exports.createDefaultUsers = createDefaultUsers;

var bookshelf = require('../config/bookshelf'),
	encrypt = require('../utilities/encryption'),
	CustQuiz = require('./CustQuiz'),
  CustQuizResult = require('./CustQuizResult'),
  CustImage = require('./CustImage'),
  CustRoom = require('./CustRoom'),
  CustPackage = require('./CustPackage'),
  CustAppt = require('./CustAppt'),
  FirstLook = require('./FirstLook');

var User = bookshelf.Model.extend({  
    tableName: 'user',
    hasTimestamps: true,
   
   	quiz: function(){
   		return this.hasMany(CustQuiz,'customerId');
   	},
    result: function(){
      return this.hasMany(CustQuizResult,'customerId');
    },
    image: function(){
      return this.hasMany(CustImage,'customerId');
    },
    package: function(){
      return this.hasMany(CustPackage,'customerId');
    },
    pkgtxn: function(){
      return this.hasMany(CustPackageTxn,'customerId');
    },
    room: function(){
      return this.hasMany(CustRoom,'customerId');
    },
    appt: function(){
      return this.hasMany(CustAppt,'customerId');
    },
    firstLook: function(){
      return this.hasMany(FirstLook,'customerId');
    },
     authenticate: function(pswd){
      return encrypt.hashPswd(pswd,this.get('salt'))===this.get('password');
    }

});
module.exports = User;

