var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');


module.exports = {
	development:{
		rootPath: rootPath,
		port: process.env.PORT || 8006,
		db: 'mysql://root:Schmooz@14@127.0.0.1/testSchema'
		
	},
	test:{
		//Heroku details.
		rootPath: rootPath,
		port: process.env.PORT || 8006,
		db: 'mysql://b20378526fd3ee:a50a903c@us-cdbr-iron-east-03.cleardb.net/heroku_8dae569721f1b75?reconnect=true'
	},
	production:{
		rootPath: rootPath,
		port: process.env.PORT || 8006
	},
	mailer: {
    	auth: {
      		user: 'hello@homephilosophy.com.sg',
      		pass: 'erushierushi'
    	},
    defaultAddress: 'Home Philosophy <guptaakriti83@gmail.com>',

    templateData:[
    				{template:'login', subject:'Welcome to Home Philosophy'},
    				{template:'appt', subject:'Your Meet and Measure appointment is scheduled'},
    				{template:'firstLook', subject:'Your First Looks are ready!'},	
    				{template:'finalLook', subject:'Your Final Looks are ready!'},
    				{template:'shoppingList', subject:'Yor Shopping List is ready!'}
    			]
  }
}