/*var mongoose = require('mongoose');

var styleSchema = mongoose.Schema({
	styleName: String,
	description: String
});

var Style = mongoose.model('Style',styleSchema);

function createStyles(){
	Style.find({}).exec(function(err,collection){
		if(collection.length===0){
			Style.create({styleName:'Modern'});
			Style.create({styleName:'Contemporary'});
			Style.create({styleName:'Classic'});
			Style.create({styleName:'Transitional'});
			Style.create({styleName:'Asian Inspired Minimalist'});
			Style.create({styleName:'Scandinavian'});
		}
	})
}*/


var bookshelf = require('../config/bookshelf'),
	CustQuizResult = require('./CustQuizResult');

var Style = bookshelf.Model.extend({  
    tableName: 'style',
    hasTimestamps: true,
    result: function(){
    	this.hasMany(CustQuizResult,'styleId');
    }
});

module.exports = Style;