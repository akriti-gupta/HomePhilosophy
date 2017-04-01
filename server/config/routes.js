var multer = require('multer'),
	mailer = require('./mailer'),
	auth = require('./auth'),
	quiz = require('./quiz'),	
	users = require('../controllers/users'),
	userQuiz = require('../controllers/userQuiz'),
	passport = require('passport'),
	payment = require('../controllers/payment'),
	filesys = require('fs'),
	userProject = require('../controllers/userProject'),
	common = require('../controllers/common');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    //callback(null, './public/uploads/');
    callback(null, '/root/HomePhilosophy/public/uploads/');
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
	app.post('/postContactDtls',common.postContactDtls);

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
	app.post('/getPaymentInfo',payment.getPaymentInfo);
	app.post('/updatePackage',payment.updatePackage);
	
	app.post('/paycb',function(req,res){
		console.log('Got back response, ');
		console.log(res);
		console.log('request is:');
		console.log(req);
		res.redirect('/style-quiz');

	})
	// app.post('/storePackageTxn',payment.storePackageTxn);
	app.post('/saveQuizMiscData',userQuiz.saveQuizMiscData);

	app.get('/getCustProjectInfo', userProject.getCustProjectInfo);
	app.post('/saveAppointment',userProject.saveAppointment);
	app.post('/saveConceptBoard',userProject.saveConceptBoard);
	app.post('/saveFinalLook',userProject.saveFinalLook);
	app.post('/saveShoppingList',userProject.saveShoppingList);
	
	app.post('/submitFeedback',userProject.submitFeedback);

	app.get('/getProjectListing', userProject.getProjectListing1);
	app.post('/getQuizDetail', userProject.getQuizDetail);

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



// route for facebook authentication and login
	 app.get('/auth/facebook',passport.authenticate('facebook'),function(req,res){});

// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {failureRedirect: '/' }),
		function(req, res) {
			res.redirect('/login?fb=true');
		});


	app.get('*', function(req,res){
		console.log("Server caught request " +req.params[0]);
		res.render('index',{
			bootstrappedUser: req.user 
		});
	});
}