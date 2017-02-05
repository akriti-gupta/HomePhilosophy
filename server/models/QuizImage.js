// var mongoose = require('mongoose');

// var imageSchema =  mongoose.Schema({
// 	questionId: Number,
// 	imageId: Number,
// 	imagePath: String
// });

// var QuizImage = mongoose.model('QuizImage',imageSchema);


var bookshelf = require('../config/bookshelf');

var QuizImage = bookshelf.Model.extend({  
    tableName: 'quiz_images',
    hasTimestamps: true
});

/*function createQuizImages(){
	QuizImage.find({}).exec(function(err,collection){
		if(collection.length===0){
			QuizImage.create({questionId:1,imageId:1,imagePath:"images/styles/living/1.png"});
			QuizImage.create({questionId:1,imageId:2,imagePath:"images/styles/living/2.png"});
			QuizImage.create({questionId:1,imageId:3,imagePath:"images/styles/living/3.png"});
			QuizImage.create({questionId:1,imageId:4,imagePath:"images/styles/living/4.png"});
			QuizImage.create({questionId:1,imageId:5,imagePath:"images/styles/living/5.png"});
			QuizImage.create({questionId:1,imageId:6,imagePath:"images/styles/living/6.png"});
			QuizImage.create({questionId:2,imageId:1,imagePath:"images/styles/bedroom/1.png"});
			QuizImage.create({questionId:2,imageId:2,imagePath:"images/styles/bedroom/2.png"});
			QuizImage.create({questionId:2,imageId:3,imagePath:"images/styles/bedroom/3.png"});
			QuizImage.create({questionId:2,imageId:4,imagePath:"images/styles/bedroom/4.png"});
			QuizImage.create({questionId:2,imageId:5,imagePath:"images/styles/bedroom/5.png"});
			QuizImage.create({questionId:2,imageId:6,imagePath:"images/styles/bedroom/6.png"});
			QuizImage.create({questionId:3,imageId:1,imagePath:"images/styles/dining/1.png"});
			QuizImage.create({questionId:3,imageId:2,imagePath:"images/styles/dining/2.png"});
			QuizImage.create({questionId:3,imageId:3,imagePath:"images/styles/dining/3.png"});
			QuizImage.create({questionId:3,imageId:4,imagePath:"images/styles/dining/4.png"});
			QuizImage.create({questionId:3,imageId:5,imagePath:"images/styles/dining/5.png"});
			QuizImage.create({questionId:3,imageId:6,imagePath:"images/styles/dining/6.png"});
			QuizImage.create({questionId:4,imageId:1,imagePath:"images/styles/kitchen/1.png"});
			QuizImage.create({questionId:4,imageId:2,imagePath:"images/styles/kitchen/2.png"});
			QuizImage.create({questionId:4,imageId:3,imagePath:"images/styles/kitchen/3.png"});
			QuizImage.create({questionId:4,imageId:4,imagePath:"images/styles/kitchen/4.png"});
			QuizImage.create({questionId:4,imageId:5,imagePath:"images/styles/kitchen/5.png"});
			QuizImage.create({questionId:4,imageId:6,imagePath:"images/styles/kitchen/6.png"});
			QuizImage.create({questionId:5,imageId:1,imagePath:"images/styles/textures/1.png"});
			QuizImage.create({questionId:5,imageId:2,imagePath:"images/styles/textures/2.png"});
			QuizImage.create({questionId:5,imageId:3,imagePath:"images/styles/textures/3.png"});
			QuizImage.create({questionId:5,imageId:4,imagePath:"images/styles/textures/4.png"});
			QuizImage.create({questionId:5,imageId:5,imagePath:"images/styles/textures/5.png"});
			QuizImage.create({questionId:5,imageId:6,imagePath:"images/styles/textures/6.png"});
			QuizImage.create({questionId:6,imageId:1,imagePath:"images/styles/colour/neutral.png"});
			QuizImage.create({questionId:6,imageId:2,imagePath:"images/styles/colour/balanced.png"});
			QuizImage.create({questionId:6,imageId:3,imagePath:"images/styles/colour/bold.png"});
			

		}
	});
}
exports.createQuizImages = createQuizImages;

*/

module.exports = QuizImage;
