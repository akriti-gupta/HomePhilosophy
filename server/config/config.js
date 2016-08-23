var path = require('path');
var rootPath = path.normalize(__dirname + '../../../');

module.exports = {
	development:{
		db: 'mongodb://localhost/homephilosophy',
		rootPath: rootPath,
		port: process.env.PORT || 8006
		
	},
	production:{
		db: 'mongodb://localhost/homephilosophy',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}