var mysql = require("mysql");

var method = db.prototype;

function db() {
    /*
    	creating MySql database connection 
	*/
	var con = mysql.createPool({
		host : 'localhost',
	  	user : 'root',
	  	password : 'Schmooz@14',
	  	database : 'testSchema'
	});
	this.connection=con;
}
method.getcon = function() {
	return this;
};

module.exports = db;