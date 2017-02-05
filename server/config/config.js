var path = require('path');
var rootPath = path.normalize(__dirname + '../../../');

module.exports = {
	development:{
		db: 'mongodb://localhost/homephilosophy',
		rootPath: rootPath,
		port: process.env.PORT || 8006
		
	},
	production:{
		db: 'mongodb://heroku_n2fg9cq5:6fm4i58g1v5l9n4d2p1uadiq7g@ds013966.mlab.com:13966/heroku_n2fg9cq5',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}