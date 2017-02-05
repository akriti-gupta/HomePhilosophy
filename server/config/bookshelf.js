
var knex = require('knex')({  
	client: 'mysql',
	connection: {
		host     : '127.0.0.1',
		user     : 'root',
		password : 'Schmooz@14',
		database : 'testSchema',
		charset  : 'utf8'
	}
  // connection: {
  //   filename: path.join(__dirname, '../db/shortly.sqlite')
  // }
});

var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('user').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('user', function (user) {
      user.increments('id').primary();
      user.string('username', 50).unique();
      user.string('password', 100);
      user.string('salt', 500);
      user.string('role', 10);
      user.string('firstname', 20);
      user.string('address', 200);
      user.string('phone', 12);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table: ');
      console.log(table);
    });
  }
});

bookshelf.knex.schema.hasTable('style').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('style', function (styles) {
      styles.increments('id').primary();
      styles.string('styleName', 50).unique();
      styles.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

//This table stores the quiz id and status for all customers.
//Overwrite in this table if earlier quiz not paid for(status=-1). Else, if paid create a new quizid
//Check with Rashi: If not launched, shall cust br allowed to retake style quiz for same pkg?
bookshelf.knex.schema.hasTable('cust_quiz').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_quiz', function (cust_quiz) {
      // cust_quiz.increments('id').primary();
      cust_quiz.increments('quizId').primary();
      cust_quiz.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');


      // -1= not paid, 0 paid:Pending Confirmation(To schedule meet and measure), 
      //1 = active:not launched, 2 = launched:in progress, 3= completed

      cust_quiz.integer('status').defaultTo(-1);
      
      cust_quiz.timestamps();
     // cust_quiz.primary(['quizId', 'customerId']);
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

bookshelf.knex.schema.hasTable('cust_img_selection').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_img_selection', function (cust_img_selection) {
      cust_img_selection.increments('id').primary();
      cust_img_selection.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');;
      cust_img_selection.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      cust_img_selection.integer('questionId');
      cust_img_selection.integer('selectedImgId');
      
      cust_img_selection.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

//This table may not be required if code can be changed to store image location in the above table cust_quiz
bookshelf.knex.schema.hasTable('quiz_images').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('quiz_images', function (quiz_images) {
      quiz_images.increments('id').primary();
      
      //TODO: questionId + imageId =Pk
      quiz_images.integer('questionId');
      quiz_images.integer('imageId');
      quiz_images.string('imageLocation');
      quiz_images.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});


bookshelf.knex.schema.hasTable('room').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('room', function (room) {
      room.increments('id').primary();
      room.string('roomName');
      room.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

bookshelf.knex.schema.hasTable('cust_room_selection').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_room_selection', function (cust_room_selection) {
      cust_room_selection.increments('id').primary();
      cust_room_selection.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      cust_room_selection.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');
      // cust_room_selection.integer('roomId').unsigned().references('room.id').onDelete('CASCADE');;
      cust_room_selection.string('roomName');

      cust_room_selection.integer('numRoom');
      cust_room_selection.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

bookshelf.knex.schema.hasTable('cust_quiz_result').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_quiz_result', function (cust_quiz_result) {
      cust_quiz_result.increments('id').primary();
      
      //TODO: Fk to user.id and fk quiz_rooms.id for roomId, Fk cust_quiz.quizId to quizId, fk styles.id to styleId
      cust_quiz_result.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      cust_quiz_result.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');
      cust_quiz_result.integer('stylePercent');
      cust_quiz_result.integer('styleId').unsigned().references('style.id').onDelete('CASCADE');
      cust_quiz_result.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

bookshelf.knex.schema.hasTable('package').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('package', function (package) {
      package.increments('id').primary();
      package.string('pkgName');
      package.integer('pkgValue');
      package.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});


bookshelf.knex.schema.hasTable('cust_pkg_info').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_pkg_info', function (cust_pkg_info) {
      cust_pkg_info.increments('id').primary();
      
      //TODO: Fk to user.id and fk quiz_rooms.id for roomId, Fk cust_quiz.quizId to quizId
      cust_pkg_info.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      cust_pkg_info.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');
      cust_pkg_info.string('roomName');
      cust_pkg_info.integer('pkgId').unsigned().references('package.id').onDelete('CASCADE');
      
      cust_pkg_info.integer('isAddOn').defaultTo(0);
      
      // cust_pkg_info.integer('oldPkgId');
      // 1 = Partial Payment, 2 = Full Payment
      cust_pkg_info.integer('status');
      
      cust_pkg_info.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});


bookshelf.knex.schema.hasTable('cust_payment_txn').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_payment_txn', function (cust_payment_txn) {
      cust_payment_txn.increments('id').primary();

      // The below 2 cols are to tie this table with cust_pkg_info
      cust_payment_txn.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      cust_payment_txn.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');
      
      cust_payment_txn.integer('amountPaid');
      // cust_payment_txn.datetime('datePaid');
      cust_payment_txn.integer('totalPrice');
      cust_payment_txn.integer('addOnAmtPaid');
      //status = 0 for part payment, 1 for full payment
      
      cust_payment_txn.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});

bookshelf.knex.schema.hasTable('cust_appointment').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('cust_appointment', function (cust_appointment) {
      cust_appointment.increments('id').primary();
      cust_appointment.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      cust_appointment.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');
      cust_appointment.string('roomName');
      cust_appointment.date('apptDate');
      cust_appointment.time('apptTime');
      cust_appointment.string('contactPerson');
      cust_appointment.integer('contact');
      cust_appointment.string('address');
      cust_appointment.string('floorPlanLoc');
      cust_appointment.integer('floorPlanStatus').defaultTo(-1);
      cust_appointment.integer('apptStatus'); // No record: Schedule 
                                             //1:  Pending Confirmation
                                              // 2: Confirmed 

      
      cust_appointment.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});



bookshelf.knex.schema.hasTable('first_look').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('first_look', function (first_look) {
      first_look.increments('id').primary();
      first_look.integer('customerId').unsigned().references('user.id').onDelete('CASCADE');
      first_look.integer('quizId').unsigned().references('cust_quiz.quizId').onDelete('CASCADE');
      first_look.string('folderLocation');
      first_look.string('roomName');
      first_look.integer('status');
      first_look.integer('feedback_id').unsigned().references('first_look_feedback.id').onDelete('CASCADE');;
      first_look.timestamps();
    }).then(function (table) {
      console.log('Created Table: ');
    });
  }
});

bookshelf.knex.schema.hasTable('first_look_feedback').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('first_look_feedback', function (first_look_feedback) {
      first_look_feedback.increments('id').primary();
      first_look_feedback.integer('status');
      first_look_feedback.string('comments');
      first_look_feedback.timestamps();
    }).then(function (table) {
      console.log('Created Table: ');
    });
  }
});

module.exports = bookshelf;

// ModelBase = require('bookshelf-modelbase')(bookshelf);
// module.exports = ModelBase;

