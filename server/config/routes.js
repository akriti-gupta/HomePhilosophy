var auth = require('./auth');
var quiz = require('./quiz');

var multer = require('multer');
var fs = require('fs');


module.exports = function(app){
	
	app.post('/signin',auth.authenticate);

	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	});

	// /** API path that will upload the files */
 //    app.post('/upload', function(req, res) {
 //    	console.log("upload called at server")
 //        upload.upload(req,res,function(err){
 //            if(err){
 //                 res.json({error_code:1,err_desc:err});
 //                 return;
 //            }
 //             res.json({error_code:0,err_desc:null});
 //        })
 //    });


//  app.post('/upload', multer({ dest: './customer_uploads/',
//  							 rename: function (fieldname, filename) {
//     								return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
//   							}}).single('file'), function(req,res){
// 	console.log(req.file); //form files
// 	res.status(200).end();
// });




var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './customer_uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('file');


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
