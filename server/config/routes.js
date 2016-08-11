var auth = require('./auth'),
	quiz = require('./quiz'),
	db = require('./db.js'),
	multer = require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './customer_uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('file');


module.exports = function(app,connection){
	
	app.get('/api/users',auth.requiresRole('admin'),function(req,res){
		var data={query:"select * from user",connection:connection};
		db.query_runner(data,function(collection){
			res.send(collection);
		});
	});
	

	app.post('/signin',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	});
	
	app.post('/upload',function(req,res){
    	upload(req,res,function(err) {
        	if(err) {
            	return res.send({error_code:-1, err_desc:"Error uploading file."});
        	}
        	res.send({error_code:0, err_desc:"File is uploaded"});
    	});
	});

	app.get('*', function(req,res){
			console.log("Line 1a");
		console.log("Server caught request " +req.params[0]);
		res.render('index',{
			bootstrappedUser: req.user 
		});
	});
}
