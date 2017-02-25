
var bookshelf = require('../config/bookshelf'),
	CustPackage = require('./CustPackage');

var Package = bookshelf.Model.extend({  
    tableName: 'package',
    hasTimestamps: true,
    pkgId: function() {
    	return this.hasMany(CustPackage, 'pkgId');
  	}
});
module.exports = Package;

