var auth = require('./auth'),
	quiz = require('./quiz'),	
	multer = require('multer'),
	users = require('../controllers/users'),
	passport = require('passport');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './customer_uploads');
  },
  filename: function (req, file, callback) {
  	var fileName = file.originalname.substr(0,file.originalname.indexOf('.'));
  	var ext = file.originalname.substr(file.originalname.indexOf('.'));
    callback(null, fileName + '-' + Date.now() +ext);
  }
});
//var upload = multer({ storage : storage}).single('file');
var upload = multer({ storage : storage }).array('fileArr');

module.exports = function(app){
	
	app.get('/api/users',auth.requiresRole('admin'),users.getUsers);

	//Gets called on Sign in, while $save of user resource	
	app.post('/api/users',users.createUser);

	app.post('/signin',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
});


	// route for facebook authentication and login
	 app.get('/auth/facebook',passport.authenticate('facebook',{ scope : ['email'] }),function(req, res){});

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
		function(req, res) {
			res.redirect('/tell-us-more');
		});

	//File uploads from Tell Us More Page
	app.post('/upload',function(req,res){
		console.log('Uploading files');
    	upload(req,res,function(err) {
        	if(err) {
        		console.log(err);
            	return res.send({error_code:-1, err_desc:"Error uploading file."});
        	}
        	res.send({error_code:0, err_desc:"File is uploaded"});
    	});
	});

	app.get('*', function(req,res){
		console.log("Server caught request " +req.params[0]);
		res.render('index',{
			bootstrappedUser: req.user 
		});
	});
}
