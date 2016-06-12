var path = require('path');
var rootPath = path.normalize(__dirname + '../../../');

module.exports = {
	development:{
		rootPath: rootPath,
		port: process.env.PORT || 8006
		//Set Mysql connection string also here later 
	},
	production:{
		rootPath: rootPath,
		port: process.env.PORT || 80
		//Set Mysql connection string also here later 
	}
}