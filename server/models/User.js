var encrypt = require('../utilities/encryption');

exports.authenticate = function(enteredPswd,salt,recPswd){
		return encrypt.hashPswd(enteredPswd,salt)===recPswd;
	}