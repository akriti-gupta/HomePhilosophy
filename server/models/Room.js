// var mongoose = require('mongoose');

// var roomSchema = mongoose.Schema({
// 	roomName: String
// });

// var Room = mongoose.model('Room',roomSchema);

// function createRooms(){
// 	Room.find({}).exec(function(err,collection){
// 		if(collection.length===0){
// 			Room.create({roomName: 'Master Bedroom'});
// 			Room.create({roomName: 'Living Room'});
// 			Room.create({roomName: 'Kids Room'});
// 			Room.create({roomName: 'Home Office'});
// 			Room.create({roomName: 'Dining Room'});
// 			Room.create({roomName: 'Bedroom'});
// 		}
// 	})
// }

// exports.createRooms = createRooms;

var bookshelf = require('../config/bookshelf');

var Room = bookshelf.Model.extend({  
    tableName: 'room',
    hasTimestamps: true
    // custrooms: function(){
   	// 	return this.hasMany(CustRoom,'roomId');
   	// }
});

module.exports = Room;