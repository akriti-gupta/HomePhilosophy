var nodemailer = require('nodemailer'),
    config = require('./config'),
    ejs = require('ejs');

// create reusable transport method (opens pool of SMTP connections)

// var transporter = nodemailer.createTransport({
//     host: 'smtp.zoho.com',
//     secureConnection: false,
//     port: 587,
//     auth: {
//         user: config.mailer.auth.user,
//         pass: config.mailer.auth.pass
//     }
// });


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'guptaakriti83@gmail.com',
    pass: 'Indi$Singa'
  }
});

var sendMail = function(fromAddress,toAddress, bccAddress,subject, content,attachments,next){
  var mailOptions = {
    from: fromAddress,
    to: toAddress,
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

    var name = '';
    var address='';
    var apptDate='';
    var bccAddress='';
    var attachments = [{filename: 'logo_header.png',
                        path: './public/images/logo_header.png',
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

    if(template==='login'){
        attachments.push({filename: 'login_banner_top.png',path: './public/images/mails/login_banner_top.png',cid: 'logintopbanner@homephilosophy.com'});   
        attachments.push({filename: 'like1.png',path: './public/images/like1.png',cid: 'loginlike@homephilosophy.com'});
        attachments.push({filename: 'measure1.png',path: './public/images/measure1.png',cid: 'loginmeasure@homephilosophy.com'});
        attachments.push({filename: 'design1.png',path: './public/images/designs1.png',cid: 'logindesign@homephilosophy.com'});
        attachments.push({filename: 'shoppingList.png',path: './public/images/shoppingList.png',cid: 'loginshopping@homephilosophy.com'});
        attachments.push({filename: 'login_banner.png',path: './public/images/mails/login_banner.png',cid: 'loginbanner@homephilosophy.com'});
    }

    else if(template==='appt'){
        bccAddress = 'rashi@homephilosophy.com.sg';
        attachments.push({filename: 'measure1.png',path: './public/images/measure1.png',cid: 'meetmeasure@homephilosophy.com'});
        attachments.push({filename: 'appt_banner_1.png',path: './public/images/mails/appt_banner_1.png',cid: 'meetbanner@homephilosophy.com'});
    }

    else if(template==='firstLook'){
        bccAddress = '';
        attachments.push({filename: 'firstLook_banner.png',path:'./public/images/mails/firstLook_banner.png',cid:'firstLookbanner@homephilosophy.com'});
    }
    else if(template==='finalLook'){
        bccAddress = '';
        attachments.push({filename: 'finalLook_banner_1.png',path:'./public/images/mails/finalLook_banner1.png',cid:'finalLookbanner@homephilosophy.com'});
    }

    var mailData = {name:name,address:address,apptDate:apptDate};
    console.log('/root/HomePhilosophy/server/views/'+template+'.ejs');
    ejs.renderFile('/root/HomePhilosophy/server/views/'+template+'.ejs',{mailData},function(err,html){
        if(err){
            console.log(err);
        }
        else{
            sendMail(fromAddress,toAddress,bccAddress,subject, html, attachments,function(err, response){
                if(err){
                  return res.send({success:false,error:err});
                }
                else{
                    return res.send({success:true});
                }
              }); 
        }
    });
};










