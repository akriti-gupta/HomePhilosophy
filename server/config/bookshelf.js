
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
      cust_quiz.integer('quizId');
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
      cust_img_selection.integer('quizId');
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
      cust_room_selection.integer('quizId');
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
      cust_quiz_result.integer('quizId')
      cust_quiz_result.integer('stylePercent');
      cust_quiz_result.integer('styleId').unsigned().references('style.id').onDelete('CASCADE');
      cust_quiz_result.timestamps();
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
      cust_pkg_info.integer('customerId');
      cust_pkg_info.integer('quizId');
      cust_pkg_info.integer('pkgName');
      
      cust_pkg_info.timestamps();
    }).then(function (table) {
      console.log('Created Table: '+table);
    });
  }
});


//Tables after pkg info:

//Floor plan table.
/*bookshelf.knex.schema.hasTable('floor_plan').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('floor_plan', function (floor_plan) {
      floor_plan.increments('id').primary();
      
      //TODO: Fk to user.id and fk quiz_rooms.id for roomId, Fk cust_quiz.quizId to quizId
      floor_plan.integer('customerId');
      floor_plan.integer('quizId');
      floor_plan.string('floorPlanFolder');
      
      cust_pkg_info.timestamps();
    }).then(function (table) {
      console.log('Created Table: ');
    });
  }
});*/

module.exports = bookshelf;

// ModelBase = require('bookshelf-modelbase')(bookshelf);
// module.exports = ModelBase;

