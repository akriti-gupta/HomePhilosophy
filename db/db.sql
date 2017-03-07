CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `salt` varchar(500) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `firstname` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `fbId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `style` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `styleName` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `style_stylename_unique` (`styleName`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `room` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roomName` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `quiz_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `questionId` int(11) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `imageLocation` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `package` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pkgName` varchar(255) DEFAULT NULL,
  `pkgValue` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cust_quiz` (
  `quizId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int(10) unsigned DEFAULT NULL,
  `status` int(11) DEFAULT '-1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`quizId`),
  KEY `cust_quiz_customerid_foreign` (`customerId`),
  CONSTRAINT `cust_quiz_customerid_foreign` FOREIGN KEY (`customerId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cust_room_selection` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `numRoom` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_room_selection_quizid_foreign` (`quizId`),
  CONSTRAINT `cust_room_selection_quizid_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cust_pkg_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `pkgId` int(10) unsigned DEFAULT NULL,
  `isAddOn` int(11) DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_pkg_info_quizid_foreign` (`quizId`),
  KEY `cust_pkg_info_pkgid_foreign` (`pkgId`),
  CONSTRAINT `cust_pkg_info_pkgid_foreign` FOREIGN KEY (`pkgId`) REFERENCES `package` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cust_pkg_info_quizid_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `cust_payment_txn` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `amountPaid` int(11) DEFAULT NULL,
  `totalPrice` int(11) DEFAULT NULL,
  `addOnAmtPaid` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_payment_txn_quizid_foreign` (`quizId`),
  CONSTRAINT `cust_payment_txn_quizid_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cust_quiz_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `budget` varchar(45) DEFAULT NULL,
  `ownership` varchar(45) DEFAULT NULL,
  `designReason` varchar(1000) DEFAULT NULL,
  `spaceUtility` varchar(500) DEFAULT NULL,
  `spaceSharing` varchar(100) DEFAULT NULL,
  `brands` varchar(100) DEFAULT NULL,
  `colours` varchar(200) DEFAULT NULL,
  `extraInfo` varchar(200) DEFAULT NULL,
  `file1` varchar(100) DEFAULT NULL,
  `file2` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `quizId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_quiz_detail_quizId_foreign_idx` (`quizId`),
  CONSTRAINT `cust_quiz_detail_quizId_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



CREATE TABLE IF NOT EXISTS `cust_quiz_result` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `stylePercent` int(11) DEFAULT NULL,
  `styleId` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_quiz_result_quizid_foreign` (`quizId`),
  KEY `cust_quiz_result_styleid_foreign` (`styleId`),
  CONSTRAINT `cust_quiz_result_quizid_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE,
  CONSTRAINT `cust_quiz_result_styleid_foreign` FOREIGN KEY (`styleId`) REFERENCES `style` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS  `cust_img_selection` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  `selectedImgId` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_img_selection_quizid_foreign` (`quizId`),
  CONSTRAINT `cust_img_selection_quizid_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cust_appointment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `apptDate` date DEFAULT NULL,
  `apptTime` time DEFAULT NULL,
  `contactPerson` varchar(255) DEFAULT NULL,
  `contact` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `floorPlanLoc` varchar(255) DEFAULT NULL,
  `floorPlanStatus` int(11) DEFAULT '-1',
  `apptStatus` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cust_appointment_quizid_foreign` (`quizId`),
  CONSTRAINT `cust_appointment_quizid_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- CREATE TABLE IF NOT EXISTS `pin_images` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `quizId` INT(10) UNSIGNED NULL,
--   `imgLocation` VARCHAR(100) NULL,
--   `comment` VARCHAR(200) NULL,
--   `roomName` VARCHAR(45) NULL,
--   INDEX `quizId_quiz_foreign_idx` (`quizId` ASC),
--   PRIMARY KEY (`id`),
--   CONSTRAINT `pin_images_quizId_foreign`
--     FOREIGN KEY (`quizId`)
--     REFERENCES `testSchema`.`cust_quiz` (`quizId`)
--     ON DELETE CASCADE
--     ON UPDATE RESTRICT);

CREATE TABLE IF NOT EXISTS `concept_board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned NOT NULL,
  `files` varchar(255) DEFAULT NULL,
  `roomName` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `concept_board_quizId_foreign_idx` (`quizId`),
  CONSTRAINT `concept_board_quizId_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `concept_board_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `comments` varchar(5000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `concept_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `concept_board_feedback_concept_id_foreign_idx` (`concept_id`),
  CONSTRAINT `concept_board_feedback_concept_id_foreign` FOREIGN KEY (`concept_id`) REFERENCES `concept_board` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `final_look` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `files` varchar(255) DEFAULT NULL,
  `roomName` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `final_look_quizId_foreign_idx` (`quizId`),
  CONSTRAINT `final_look_quizId_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `final_look_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `comments` varchar(5000) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `concept_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `final_look_feedback_final_look_id_foreign_idx` (`concept_id`),
  CONSTRAINT `final_look_feedback_concept_id_foreign` FOREIGN KEY (`concept_id`) REFERENCES `final_look` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `shopping_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quizId` int(10) unsigned DEFAULT NULL,
  `files` varchar(255) DEFAULT NULL,
  `roomName` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shopping_list_quizId_foreign_idx` (`quizId`),
  CONSTRAINT `shopping_list_quizId_foreign` FOREIGN KEY (`quizId`) REFERENCES `cust_quiz` (`quizId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
