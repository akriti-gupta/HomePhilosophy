var crypto = require('crypto');

exports.createSalt = function(){
	return crypto.randomBytes(128).toString('base64');
}

exports.hashPswd = function(pswd, salt){
	console.log('In encryption');
	var hmac = crypto.createHmac('sha1',salt);
	hmac.setEncoding('hex');
	hmac.write(pswd);
	hmac.end();
	return hmac.read();
}