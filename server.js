var express = require('express');
	

var env = process.env.NODE = process.env.NODE || 'development';
var app = express();
var config = require('./server/config/config')[env];
// var connObj= new db.getConnection();
// var db = require('./server/config/db');
// var connection=db.connection();
// console.log('In server, conn is: '+connection);



require('./server/config/express')(app,config);
// require('./server/config/passport');
require('./server/config/routes')(app);


app.listen(config.port)
console.log('Server is listening on port' + config.port);



