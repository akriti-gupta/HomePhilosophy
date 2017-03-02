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
		getProjectListing: function(){
			var dfd = $q.defer();
			$http.get('/getProjectListing', {cache: false}).then(function(response){
				if(response.data.success){
					data = response.data.results;
					dfd.resolve(response.data.results);		
					/*if(data.length>0){
						$http.get('/getCncptFeedback',{projectData:data}).then(function(response){
							if(response.data.success){
								dfd.resolve(response.data.results);		
							}
							else{
								dfd.reject(response.data.reason);		
							}
						});
					}*/
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
		saveUploadedData: function(quizId,stage, files){
			var dfd = $q.defer();
			var postUrl;
			var fileArr = [];
			var data = [];
			// var isFirstLook = 0;
			// var isFinalLook = 0;

			if(stage===1){
				postUrl='/saveConceptBoard';
				//isFirstLook = 1;
			}
			else if(stage===2){
				postUrl='/saveFinalLook';
				//isFinalLook = 1;
			}
			else if(stage===3){
				postUrl='/saveShoppingList';
			}

			if(files.indexOf(',')!=-1){
				fileArr = files.split(',');
			}
			else{
				fileArr[0] = files;
			}

			for(var i =0;i<fileArr.length;i++){
				data.push({quizId: quizId, files:fileArr[i],roomName:null, status:0, created_at: null, updated_at: null});
			}
			//var data={quizId: quizId, files:files,roomName:null, status:0, created_at: null, updated_at: null};
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