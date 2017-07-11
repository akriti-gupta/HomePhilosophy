var nodemailer = require('nodemailer'),
    config = require('./config'),
    ejs = require('ejs');

//create reusable transport method (opens pool of SMTP connections)

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secureConnection: false,
    port: 587,
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    }
});

// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'guptaakriti83@gmail.com',
//     pass: 'Schmooz@14'
//   }
// });

var sendMail = function(fromAddress,toAddress,ccAddress,bccAddress,subject, content,attachments,next){
  var mailOptions = {
    from: fromAddress,
    to: toAddress,
    cc: ccAddress,
    bcc: bccAddress,
    subject: subject,
    html: content,
    attachments: attachments
  };

  transporter.sendMail(mailOptions, next);
}; 

exports.sendEmail = function(req, res){
    var data = req.body.data;
    var template = data.template;
    var toAddress = config.mailer.defaultAddress;
    var fromAddress = config.mailer.defaultAddress;
    var subject='Notification from Home Philosophy';
    var templateData = config.mailer.templateData;

    var mailData = {};
    var ccAddress = '';
    var name = '';
    var email='';
    var phone='';
    var message='';
    var address='';
    var apptDate='';
    var bccAddress='';
    var quizId =-1;
    var attachments = [{filename: 'logo_header.png',
                        path: '/root/HomePhilosophy/public/images/logo_header.png',
                        // path: './public/images/logo_header.png',
                        cid: 'hplogocustom@homephilosophy.com' 
                    }];

    for(var i=0;i<templateData.length;i++){
        if(templateData[i].template===template){
            subject = templateData[i].subject;
            break;
        }
    }


    if (data.hasOwnProperty('to')){
        toAddress = data.to;
    }
    if (data.hasOwnProperty('cc')){
        ccAddress = data.cc;
    }
    if (data.hasOwnProperty('from')){
        fromAddress = data.from;
    }
    if (data.hasOwnProperty('name')){
        name = data.name;
    }
    if (data.hasOwnProperty('address')){
        address = data.address;
    }
    if (data.hasOwnProperty('apptDate')){
        apptDate = data.apptDate;
    }
    if (data.hasOwnProperty('email')){
        email = data.email;
    }
    if (data.hasOwnProperty('phone')){
        phone = data.phone;
    }
    if (data.hasOwnProperty('message')){
        message = data.message;
    }
    if (data.hasOwnProperty('quizId')){
        quizId = data.quizId;
    }

    if(template==='login'){
        attachments.push({filename: 'login_banner_top.png',path: '/root/HomePhilosophy/public/images/mails/login_banner_top.png',cid: 'logintopbanner@homephilosophy.com'});   
        attachments.push({filename: 'like1.png',path: '/root/HomePhilosophy/public/images/like1.png',cid: 'loginlike@homephilosophy.com'});
        attachments.push({filename: 'measure1.png',path: '/root/HomePhilosophy/public/images/measure1.png',cid: 'loginmeasure@homephilosophy.com'});
        attachments.push({filename: 'design1.png',path: '/root/HomePhilosophy/public/images/designs1.png',cid: 'logindesign@homephilosophy.com'});
        attachments.push({filename: 'shoppingList.png',path: '/root/HomePhilosophy/public/images/shoppingList.png',cid: 'loginshopping@homephilosophy.com'});
        attachments.push({filename: 'login_banner1.png',path: '/root/HomePhilosophy/public/images/mails/login_banner1.png',cid: 'loginbanner@homephilosophy.com'});
    }

    else if(template==='appt' || template==='floorPlan'){
        bccAddress = 'rashi@homephilosophy.com.sg';
        attachments.push({filename: 'measure1.png',path: '/root/HomePhilosophy/public/images/measure1.png',cid: 'meetmeasure@homephilosophy.com'});
        attachments.push({filename: 'appt_banner_1.png',path: '/root/HomePhilosophy/public/images/mails/appt_banner_1.png',cid: 'meetbanner@homephilosophy.com'});
        mailData = {name:name,address:address,apptDate:apptDate};
    }

    else if(template==='firstLook'){
        bccAddress = '';
        attachments.push({filename: 'firstLook_banner2.png',path:'/root/HomePhilosophy/public/images/mails/firstLook_banner2.png',cid:'firstLookbanner@homephilosophy.com'});
    }
    else if(template==='finalLook'){
        bccAddress = '';
        attachments.push({filename: 'finalLook_banner1.png',path:'/root/HomePhilosophy/public/images/mails/finalLook_banner1.png',cid:'finalLookbanner@homephilosophy.com'});
    }
    
    else if(template==='contact'){
        mailData = {'name':name,'email':email,'phone':phone,'message':message};
    }
    else if(template==='firstFeedback' || template==='finalFeedback'){
        mailData={'quizId':quizId};
    }
    else if(template==='custom'){
        mailData = {'name':name,'email':email,'phone':phone};
    }
    else {
        mailData = {name:name,address:address,apptDate:apptDate};
    }

    ejs.renderFile('/root/HomePhilosophy/server/views/'+template+'.ejs',{mailData},function(err,html){
    // ejs.renderFile(process.cwd() +'/server/views/'+template+'.ejs',{mailData},function(err,html){
        if(err){
            console.log(err);
        }
        else{
            sendMail(fromAddress,toAddress,ccAddress,bccAddress,subject, html, attachments,function(err, response){
            // sendMail(fromAddress,toAddress,bccAddress,subject, html,function(err, response){
                if(err){
                    console.log('err in sending mail:');
                    console.log(err);
                  return res.send({success:false,error:err});
                }
                else{
                    console.log('Mail success');
                    return res.send({success:true});
                }
              }); 
        }
    });
};










