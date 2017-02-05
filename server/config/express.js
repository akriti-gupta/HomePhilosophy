var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser');
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport');

module.exports = function(app,config){	
	app.use(express.static(config.rootPath + '/public'));
	// app.engine('html', require('ejs').renderFile);
	// app.set('view engine', 'html');
	app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
	app.set('view engine', 'ejs');
	app.set('views', config.rootPath + '/public');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended : true}));
	app.use(bodyParser.json());
	app.use(session({secret:'home philiosphy',resave:false,saveUninitialized:false}));
	//console.log("Bef initialize");
	app.use(passport.initialize());
	app.use(passport.session());

}