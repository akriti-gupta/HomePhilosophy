var bookshelf = require('../config/bookshelf'),
	User = require('./User'),
	Room = require('./Room');

var CustRoom = bookshelf.Model.extend({  
    tableName: 'cust_room_selection',
    hasTimestamps: true,
    user: function() {
    	return this.belongsTo(User, 'customerId');
  	}
  	// room: function(){
  	// 	return this.belongsTo(Room, 'id');	
  	// }
});

module.exports = CustRoom;