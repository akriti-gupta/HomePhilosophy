var bookshelf = require('../config/bookshelf'),
	User = require('./User');

var CustImage = bookshelf.Model.extend({  
    tableName: 'cust_img_selection',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	}
});

module.exports = CustImage;