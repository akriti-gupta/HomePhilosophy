angular.module('app').factory('mvAdminView', function($http, $q){
	return{

		saveFirstLook: function(data){
			var dfd = $q.defer();
		 	$http.post('/saveFirstLook',{data:data}).then(function(response){
	  			if(response.data.success){
	  				dfd.resolve(true);
	  			}
	  			else{
	  				dfd.resolve(false);
	  			}
	  		});
	  		return dfd.promise;
		},
		getProjectListing: function(status){
			var dfd = $q.defer();
			 $http.get('/getProjectListing/'+status, {cache: false}).then(function(response){
			   //$http.get('/getProjectListing',{qs: {status:status}}).then(function(response){
				if(response.data.success){
					data = response.data.results;
					dfd.resolve(response.data.results);	
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
			});
			return dfd.promise;
		},

		getQuizDetail: function(quizId){
			var dfd = $q.defer();
			
			$http.post('/getQuizDetail',{quizId:quizId}).then(function(response){
				if(response.data.success){
					dfd.resolve(response.data.results);	
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
			});
			return dfd.promise;
		},

		modifyUsrAppt: function(data){
			var dfd = $q.defer();
			$http.post('/modifyUsrAppt',{data:data}).then(function(response){
				if(response.data.success){
					dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
			});
			return dfd.promise;
		},
		fetchImages: function(data){
			var dfd = $q.defer();
			$http.post('/fetchImages',{data:data}).then(function(response){
				if(response.data.success){
					console.log(response.data.results);
					dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(false);
	  			}
			});
			return dfd.promise;
		},
		saveUploadedData: function(quizId,roomId,stage, files,notes){
			var dfd = $q.defer();
			var postUrl;
			var fileArr = [];
			var data = [];
			var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			if(stage===1){
				postUrl='/saveConceptBoard';
			}
			else if(stage===2){
				postUrl='/saveFinalLook';
			}
			else if(stage===3 || stage===4){
				postUrl='/saveShoppingList';
			}

			for(var i =0;i<files.length;i++){
				data.push([quizId,roomId,files[i],0,date,date,notes[i]]);
			}
			$http.post(postUrl,{data:data}).then(function(response){
				if(response.data.success){
					dfd.resolve(true);
	  			}
	  			else{
	  				dfd.reject(response.data.reason);
	  			}
			});
			return dfd.promise;
		}
	}
});