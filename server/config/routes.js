var auth = require('./auth');
var fs = require('fs');

module.exports = function(app){
	
	// app.get('/login', function(req,res){
	// console.log("Server caught login request");
	// res.render('login');
	// });

	app.get('/getScores',function(req,res){
		console.log("Server caught request to read file");
		var resStatus = {
			success : false,
			content : null
		};
		
		var arr = [];
		fs.readFile(__dirname+'/input.txt',function(err,contents){
			console.log("In fs.readFile");
			if(err){
				console.log("Error while reading file : "+err);
				//res.writeHead(404,{"Content-type":"text/plain"});
				res.send({success:false});
			}
			else{
				console.log("Read file");
				//res.send({success:true, content:contents});
				resStatus = {success:true, content:contents};
				console.log("File contents are:"+contents);
				//res.writeHead(200,{"Content-type":"text/plain"});
				//arr.push(contents);
				res.writeHead(200,{"Content-type":"text/plain"});
				res.write(contents);
				res.end();
				//res.send({success:true, content:arr});
				//res.send(contents.toString());
			}
		});

		console.log("Server after request to read file");

	});

	app.post('/signin',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	})


// app.get('/userStatus', function(req, res) {
// 	console.log('In route status');
//   if (!req.isAuthenticated()) {
//   	console.log('User not authenticated');
//     return res.send({success: false});
//   }
//   console.log('User already authenticated');
//   res.send({success: true});
// });
		
		//res.send({success:true});
	

	app.get('*', function(req,res){
	console.log("Server caught request " +req.params[0]);
	res.render('index');
	});
}
