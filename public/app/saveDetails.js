angular.module('app')
    .controller('SaveDetails',function(Upload,$window,$scope,$location,payment,mvUpload){
       // $scope.filestatus = "";
       // $scope.urlStatus = "";
       // $scope.uploadBtn1 = true;
       // $scope.uploadBtn2 = true;
       // $scope.uploadBtn3 = false;
       $scope.url ="";
       $scope.pendingFilesArr =[];
       $scope.pendingDropFiles = [];
       $scope.fileArr = [];
       $scope.image = null;
       $scope.imageFileName = '';
       
     
     $scope.saveData = function(){
      //saveFormData()
      mvUpload.uploadFiles($scope.fileArr);
      // $scope.uploadFiles();

      //If payment already selected, go to new page, else go to payment page(create dup).
      if(payment.getPayPkg()>0){
        console.log('Pkg already chosen');
        $location.path('/reviewPayment');
      }
      else
        $location.path('/pricing');
    }

      $scope.formatBytes = function(bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1000; // or 1024 for binary
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }
      
      $scope.addFileToUploadQ = function(element) { 
        $scope.$apply(function($scope) {
          // $scope.fileArr.push(element.files);
          for(var i=0; i< element.files.length; i++){
            $scope.fileArr.push(element.files[i]);
            $scope.pendingFilesArr.push({"name":element.files[i].name,"size":$scope.formatBytes(element.files[i].size,0),"mainArrIndex":$scope.fileArr.length-1});
          }
    		});
      }
  
      $scope.uploadFiles = function(){
        if($scope.fileArr){
          var status;
          console.log("$scope.fileArr is: " +$scope.fileArr.length);
          console.log($scope.fileArr);
          
          Upload.upload({
            url: '/upload', 
            arrayKey: '',
            data:{fileArr:$scope.fileArr} 
          }).then(function (resp) { 
                if(resp.data.error_code === 0){ 
                  status = "Uploaded";
                  //  $window.alert('File uploaded successfully');
                } else {
                  //$window.alert('An error occured. Please contact the administrator.');
                }
            });
        }
      }
      
      $scope.removeFileFromQ = function(index,fileArrType){
        
        //TODO: Remove from fileArr also
        if(fileArrType && fileArrType===2){
          var mstrFileArrIdx = $scope.pendingDropFiles[index].mainArrIndex;
          console.log(mstrFileArrIdx);
          $scope.pendingDropFiles.splice(index,1);
          $scope.fileArr.splice(mstrFileArrIdx,1);
        }
        else{
          var mstrFileArrIdx = $scope.pendingFilesArr[index].mainArrIndex;
          console.log(mstrFileArrIdx);
          $scope.pendingFilesArr.splice(index,1);
          $scope.fileArr.splice(mstrFileArrIdx,1);
        }
      }
  })

  .directive("dropzone", function() {
    return {
        restrict : "A",
        link: function (scope, element) {
          
          element.on('dragover', function(event) {
            event.preventDefault();
            event.stopPropagation();
          });
          
          element.on('dragenter', function(event) {
            event.preventDefault();
            event.stopPropagation();
          });
          
          element.bind('drop', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log(event);
            if (event.originalEvent.dataTransfer){
              console.log('File len is: '+event.originalEvent.dataTransfer.files.length);
              if (event.originalEvent.dataTransfer.files.length > 0) {
                // scope.fileArr.push(event.originalEvent.dataTransfer.files);
                for(var i=0; i< event.originalEvent.dataTransfer.files.length; i++){
                  scope.$apply(function(scope) {
                    scope.fileArr.push(event.originalEvent.dataTransfer.files[i]);
                    scope.pendingDropFiles.push({"name":event.originalEvent.dataTransfer.files[i].name,"size":scope.formatBytes(event.originalEvent.dataTransfer.files[i].size,0),"mainArrIndex":scope.fileArr.length-1});
                  });                 
                }
              }
            }
            return false;
          });
        }
      }
  });