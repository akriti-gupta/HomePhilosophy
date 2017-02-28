var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');


module.exports = {
	development:{
		rootPath: rootPath,
		port: process.env.PORT || 8007
		
	},
	test:{
		//Heroku details.
		rootPath: rootPath,
		port: process.env.PORT || 8007
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

	// development:{
	// 	host: 120.0.0.1,
	// 	user: 'root'
	// 	password:'Schmooz@14'
	// 	database: 'testSchema'
		
	// },
	// production:{
	// 	db: 'mongodb://heroku_n2fg9cq5:6fm4i58g1v5l9n4d2p1uadiq7g@ds013966.mlab.com:13966/heroku_n2fg9cq5',
	// 	rootPath: rootPath,
	// 	port: process.env.PORT || 80
	// }
}