
angular.module('app').factory('mvUpload',function(Upload,$q){
  return {

    uploadFiles: function(fileArr,fileType,quizId){
      var dfd = $q.defer();
      if(fileArr.length>0){
          var status;
          console.log("fileArr is: " +fileArr.length);
          console.log(fileArr);
          
          var uploadURL = 'upload/'+fileType+'/'+quizId;

          Upload.upload({
            url: uploadURL, 
            arrayKey: '',
            data:{fileArr:fileArr} 
          }).then(function (resp) { 
            console.log('upload resp is: ');
            console.log(resp);
                if(resp.data.error_code === 0){ 
                  status = "Uploaded";
                  dfd.resolve(true);
                  //  $window.alert('File uploaded successfully');
                } else {
                  dfd.resolve(false);
                  //$window.alert('An error occured. Please contact the administrator.');
                }
            });
        }
        return dfd.promise;
    }

    /*uploadFile: function(fileType,quizId, roomName){
      var dfd = $q.defer();
      
          var status;
          
          var uploadURL = 'upload/'+fileType+'/'+quizId+'/'+roomName;

          Upload.upload({url:'upload/'+fileType+'/'+quizId}).then(function (resp) { 
            console.log('upload resp is: ');
            console.log(resp);
                if(resp.data.error_code === 0){ 
                  status = "Uploaded";
                  dfd.resolve(true);
                  //  $window.alert('File uploaded successfully');
                } else {
                  dfd.resolve(false);
                  //$window.alert('An error occured. Please contact the administrator.');
                }
            });
        
        return dfd.promise;
    }*/
  }

});