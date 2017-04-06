var config = require('./config'),
	nodemailer = require('nodemailer'),
	templatesDir = config.rootPath +'/views/mailer',
  EmailTemplate = require('email-templates').EmailTemplate;

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secureConnection: false,
    port: 587,
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    }
});


// let transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'guptaakriti83@gmail.com',
//     pass: 'Indi$Singa'
//   }
// });


var mailOptions = {
    from: '"HomePhilosophy" <hello@homephilosophy.com.sg>', // sender address
    to: 'guptaakriti83@gmail.com', // list of receivers
    subject: 'Hello from HP', // Subject line
    text: 'Hello From HomePhilosophy', // plain text body
    html: '<b>Hello From HomePhilosophy</b>', // html body
    name: 'Test User'
};

  
exports.sendEmail = function(req,res,next){

	transporter.sendMail(mailOptions, function(error, info){
    if (error) {
         console.log(error);
         res.send({success:false});
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.send({success:true});
	});


/*var welcomeEmail = transporter.templateSender(new EmailTemplate(templatesDir+'/welcome'), {
    from: config.mailer.defaultFromAddress
    
});

// use template based sender to send a message
welcomeEmail({
    to: mailOptions.to,
    subject: 'Hello from HomePhilosophy'
    
}, {
    name: mailOptions.name
}, function(err, info){
    if(err){
       console.log('Error');
        res.send({success:false});
    }else{
        console.log('Password reminder sent');
        res.send({success:true});
    }
});*/
};
