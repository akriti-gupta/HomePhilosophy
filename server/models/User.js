var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		salt: String,
		role: String

	});

userSchema.methods ={
	authenticate: function(pswd){
		return encrypt.hashPswd(pswd,this.salt)===this.password;
	}
}
var User = mongoose.model('User',userSchema);

function createDefaultUsers(){
	User.find({}).exec(function(err,collection){
		if(collection.length===0){
			var salt,hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPswd('test',salt)
			User.create({firstName:'Admin',username:'admin@hp.com',salt: salt, password:hash, role:'admin'});
		}
	})
}

exports.createDefaultUsers = createDefaultUsers;
