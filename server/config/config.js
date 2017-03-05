var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');


module.exports = {
	development:{
		rootPath: rootPath,
		port: process.env.PORT || 8006,
		db: 'mysql://root:Schmooz@14@127.0.0.1/testSchema'
		
	},
	test:{
		//Heroku details.
		rootPath: rootPath,
		port: process.env.PORT || 8006,
		db: 'mysql://be86c3a02b9721:629adc5a@us-cdbr-iron-east-04.cleardb.net/heroku_41653343a548b2a?reconnect=true'
	},
	production:{
		rootPath: rootPath,
		port: process.env.PORT || 80
	},
	mailer: {
    	auth: {
      		user: 'guptaakriti83@gmail.com',
      		pass: 'Indi$Singa',
    	},
    defaultFromAddress: 'Home Philosophy <guptaakriti83@gmail.com>'
  }
}