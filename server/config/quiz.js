var fs = require('fs');


var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

exports.fetchImages = function(req, res, next){

	var data = req.body.data;
	console.log(data.folder);
	var folderLoc = data.folder;
	var dir = rootPath + '/public'+folderLoc.substr(1);

	console.log('In fetchImages:'+dir);
	var walk = function(dir, done) {
 		var results = [];
  		fs.readdir(dir, function(err, list) {
	    if (err) return done(err);
	    var i = 0;
	    
	    (function next() {
	      var file = list[i++];
	      if (!file) return done(null, results);
	      //file = dir + '/' + file;
	      file = path.resolve(dir, file);
	      fs.stat(file, function(err, stat) {
	        if (stat && stat.isDirectory()) {
	          walk(file, function(err, res) {
	            results = results.concat(res);
	            next();
	          });
	        } else {
	          results.push(file);
	          next();
	        }
	      });
	    })();
	  });
};
		
// walk(__dirname+'/../../public/images/styles', function(err, results) {
walk(dir, function(err, results) {
  if (err) throw err;
  console.log(results);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(JSON.stringify({ results : results}));
  //res.send({success: true, results : results});
  res.end();
 // console.log(results);
});
}







	