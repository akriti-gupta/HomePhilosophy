var express = require('express'),
	mysql = require('mysql');

var env = process.env.NODE = process.env.NODE || 'development';
var app = express();
var config = require('./server/config/config')[env];
var db = require("./server/config/db.js");
var connObj= new db.getConnection();
var connection=connObj.connection; 


require('./server/config/express')(app,config);
require('./server/config/passport')(connection);
require('./server/config/routes')(app,connection);


app.listen(config.port)
console.log('Server is listening on port' + config.port);



