var multer = require('multer'),
	mailer = require('./mailer'),
	auth = require('./auth'),
	quiz = require('./quiz'),	
	users = require('../controllers/users'),
	userQuiz = require('../controllers/userQuiz'),
	passport = require('passport'),
	payment = require('../controllers/payment'),
	filesys = require('fs'),
	userProject = require('../controllers/userProject');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    // callback(null, './public/customer_uploads/'+req.params.fileType+'/'+req.params.quizId);
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
  	var fileName = file.originalname.substr(0,file.originalname.indexOf('.'));
  	var ext = file.originalname.substr(file.originalname.indexOf('.'));
    callback(null, fileName + '-' + Date.now() +ext);
  }
});

var upload = multer({ storage : storage }).array('fileArr');

module.exports = function(app){

	app.post('/sendEmail',mailer.sendEmail);

	app.get('/api/users',auth.requiresRole('admin'),users.getUsers);
	//Gets called on Sign in, while $save of user resource	
	app.post('/api/users',users.createUser);
	app.post('/signin',auth.authenticate);
	app.post('/logout',function(req,res){
		req.logout();
		res.end();
	});

	app.post('/createUserQuiz',userQuiz.createUserQuiz);
	app.post('/addRoomToQuiz',userQuiz.addRoomToQuiz);
	app.post('/saveUserQuizDtls',userQuiz.saveUserQuizDtls);
	app.post('/storePackage',payment.storePackage);
	// app.post('/storePackageTxn',payment.storePackageTxn);

	app.get('/getCustProjectInfo', userProject.getCustProjectInfo);
	app.post('/saveAppointment',userProject.saveAppointment);
	app.post('/saveConceptBoard',userProject.saveConceptBoard);
	app.post('/saveFinalLook',userProject.saveFinalLook);
	app.post('/saveShoppingList',userProject.saveShoppingList);
	
	app.post('/submitFeedback',userProject.submitFeedback);

	app.get('/getProjectListing', userProject.getProjectListing);
	app.get('/getCncptFeedback', userProject.getCncptFeedback);
	app.post('/modifyUsrAppt',userProject.modifyUsrAppt);
	app.post('/fetchImages',quiz.fetchImages);


	// app.post('/upload/:quizId/:fileType',function(req,res){
	app.post('/upload',function(req,res){
    	upload(req,res,function(err) {
        	if(err) {
        		console.log(err);
            	return res.send({success:false, reason: err.toString()});
        	}
        	var files=[];
        	for(var i=0;i<req.files.length;i++){
        		files.push(req.files[i].filename);
        	}
        	return res.send({success:true,filename:files});
    	});
	});


function checkUploadPath(req, res, next) {
	var uploadPath = './public/customer_uploads/'+req.params.fileType+'/'+req.params.quizId;
     filesys.exists(uploadPath, function(exists) {
        if(exists) {
          next();
        }
        else {
          filesys.mkdir(uploadPath, function(err) {
            if(err) {
              console.log('Error in folder creation');

              next(); 
            }  
            next();
          })
        }
     })
}


// route for facebook authentication and login
	 app.get('/auth/facebook',passport.authenticate('facebook',{ scope : ['email'] }),function(req, res){});

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
		function(req, res) {
			res.redirect('/tell-us-more');
		});


	app.get('*', function(req,res){
		console.log("Server caught request " +req.params[0]);
		res.render('index',{
			bootstrappedUser: req.user 
		});
	});
}


// app.post('/upload/:fileType/:quizId/:roomName',checkUploadPath1,function(req,res){
// 	console.log('In here');
//     	upload(req,res,function(err) {
//         	if(err) {
//         		console.log(err);
//             	return res.send({error_code:-1, err_desc:"Error uploading file."});
//         	}
//         	res.send({error_code:0, err_desc:"File is uploaded"});
//     	});
// 	});

// function checkUploadPath1(req, res, next) {
// 	var uploadPath = './customer_uploads/'+req.params.fileType+'/'+req.params.quizId+'/'+req.params.roomName;
// 	console.log(uploadPath);
//      fs1.exists(uploadPath, function(exists) {
//         if(exists) {
//           next();
//         }
//         else {
//           fs1.mkdir(uploadPath, function(err) {
//             if(err) {
//               console.log('Error in folder creation');
//               console.log(err);
//               next(); 
//             }  
//             next();
//           })
//         }
//      })
// }


	
	
	// 

// var storage1 =   multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './customer_uploads/'+req.params.fileType+'/quiz'+req.params.quizId+'/'+req.params.roomName);
//   },

//   filename: function (req, file, callback) {
//   	var fileName = file.originalname.substr(0,file.originalname.indexOf('.'));
//   	var ext = file.originalname.substr(file.originalname.indexOf('.'));
//     callback(null, fileName + '-' + Date.now() +ext);
//   }
// });

// var upload = multer({ storage : storage}).single('firstlook');




// var upload1 = multer({ storage : storage1}).single('file');

/*var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/customer_uploads/'+req.params.fileType+'/'+req.params.quizId);
    
  },

//   changeDest: function(destination, req, res) {
//   	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%req is: ');
//   	console.log(req);
//   	console.log('In changeDest', +req.params.fileType);

//     var newDestination = destination + req.params.fileType;
//     var stat = null;
//     try {
//         stat = fs.statSync(newDestination);
//     } catch (err) {
//         fs.mkdirSync(newDestination);
//     }
//     if (stat && !stat.isDirectory()) {
//         throw new Error('Directory cannot be created because an inode of a different type exists at "' + destination + '"');
//     }
//     console.log('newDestination is '+newDestination);
//     return newDestination;
// },

  filename: function (req, file, callback) {
  	var fileName = file.originalname.substr(0,file.originalname.indexOf('.'));
  	var ext = file.originalname.substr(file.originalname.indexOf('.'));
    // callback(null, fileName + '-' + Date.now() +ext);
    callback(null, fileName+ext);
  }
});
*/