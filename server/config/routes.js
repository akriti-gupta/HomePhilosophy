var auth = require('./auth');
var quiz = require('./quiz');
var fs = require('fs');
// var walk    = require('walk');


module.exports = function(app){
	
	// app.get('/getStyleImage',function(req,res){
	// 	console.log("Server caught request to read file");
	// 	var resStatus = {
	// 		success : false,
	// 		content : null
	// 	};
		
	// 	var arr = [];

		
	// 	var files   = [];

	// 	// Walker options
	// 	console.log(__dirname);
	// 	var walker  = walk.walk(__dirname+'/../../public/images/styles', { followLinks: false, filters:[".DS_Store"]});

	// 	walker.on('file', function(root, stat, next) {
 //    	// Add this file to the list of files

 //    	files.push(root + '/' + stat.name);
 //    	next();
	// 	});

	// 	walker.on('end', function() {
 //    		console.log("Files are:" +files);
	// 	});

		

	// 	console.log("Server after request to read file");

	// });



	//app.get('/getStyleImage',quiz.fetchImages);


	app.post('/signin',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	})


	//app.get('/getStyleImage',quiz.getStyleImage);
	

	app.get('*', function(req,res){
		console.log("Server caught request " +req.params[0]);
		//console.log(req.user); // returns undefined/ true . Never returns user object

		res.render('index',{
			bootstrappedUser: req.user 
		});
	});
}
