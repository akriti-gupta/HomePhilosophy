
angular.module('app').factory('mvUpload',function(Upload,$q){
  return {

    uploadFiles: function(fileArr){
      var dfd = $q.defer();
      if(fileArr.length>0){
          
          //var uploadURL = 'upload/'+fileType+'/'+quizId;
          var uploadURL = 'upload';
         
          Upload.upload({
            url: uploadURL, 
            arrayKey: '',
            data:{fileArr:fileArr} 
          }).then(function (response) { 
            console.log('upload resp is: ');
            console.log(response);
                if(response.data.success){ 
                  console.log(response.data.filename);
                  dfd.resolve(response.data.filename);
                  //  $window.alert('File uploaded successfully');
                } else {
                  dfd.reject(response.data.reason);
                  //$window.alert('An error occured. Please contact the administrator.');
                }
            });
        }
        else{
          dfd.resolve(true);
        }
        return dfd.promise;
    }
  }
});