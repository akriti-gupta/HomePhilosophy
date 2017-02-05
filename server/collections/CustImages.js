var bookshelf = require('../config/bookshelf'),
    CustImage = require('../models/CustImage');

var CustImages = bookshelf.Collection.extend({  
    model: CustImage
});

module.exports = CustImages;
