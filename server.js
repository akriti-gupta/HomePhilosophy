var express = require('express');	

var env = process.env.NODE = process.env.NODE || 'development';
console.log(env);
var app = express();
var config = require('./server/config/config')[env];


require('./server/config/express')(app,config);
// require('./server/config/mysqlConn')();

// require('./server/config/mysql')(config);
//require('./server/config/mongoose')(config);

require('./server/config/passport')();
require('./server/config/routes')(app);
 require('./server/config/bookshelf');



app.listen(config.port)
console.log('Server is listening on port' + config.port);



