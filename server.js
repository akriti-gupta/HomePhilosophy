//require('newrelic');
require('dotenv').config();
var express = require('express');	
var env = process.env.NODE = process.env.NODE || 'production';

var app = express();
var config = require('./server/config/config')[env];
require('./server/config/express')(app,config);
require('./server/config/mysqlConn');
require('./server/config/passport')();
require('./server/config/routes')(app);
console.log(process.env);
app.listen(config.port)
console.log('Server is listening on port' + config.port);



