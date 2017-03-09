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
		db: 'mysql://b20378526fd3ee:a50a903c@us-cdbr-iron-east-03.cleardb.net/heroku_8dae569721f1b75?reconnect=true'
	},
	production:{
		rootPath: rootPath,
		port: process.env.PORT || 80
	},
	mailer: {
    	auth: {
      		user: 'hello@homephilosophy.com.sg',
      		pass: 'erushierushi'
    	},
    defaultFromAddress: 'Home Philosophy <guptaakriti83@gmail.com>'
  }
}