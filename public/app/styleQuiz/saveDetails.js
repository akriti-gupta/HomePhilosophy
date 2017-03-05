angular.module('app')
    .controller('SaveDetails',function(Upload,$window,$scope,$location,payment,mvUpload,quizResult,mvUserQuiz){
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
   $scope.colour = [];
   var colFile = ['','oranges','yellows','reds','neutrals','blacks','greys','whites','blues'];
   var success = false;
   $scope.spcShare = [{name:'Just Myself',selected:false},
                      {name:'Partner',selected:'Small children (under 5)'},
                      {name:'Roommate',selected:false},
                      {name:'Kids (6-18)',selected:false},
                      {name:'Adult Kids(18+)',selected:false},
                      {name:'Pets',selected:false},
                      {name:'Parents/ In-laws',selected:false},
                      {name:'Grandparents',selected:false},
                      {name:'Other/ NA',selected:false}
                      ];

    $scope.designReason = [{name:'I recently relocated or am going to soon',selected:false},
                      {name:'I want to rent/sell my place',selected:'Small children (under 5)'},
                      {name:"It's time for an upgrade",selected:false},
                      {name:"A baby's on the way",selected:false},
                      {name:'My lifestyle is changing or has changed',selected:false},
                      {name:'I just feel like it',selected:false}
                      ];
    $scope.reasonOther;
    $scope.saveColour = function(colourIndex){
        var index;

        for(var i in $scope.colour){
          if($scope.colour[i].id===colourIndex){
            index = i;
            break;
          }
      }
      // console.log("index is: "+index);
      if(index>-1){
        $scope.colour.splice(index, 1);
        // console.log("After splicing, room arr is: "+$scope.selectedRoom);
      }
      
        //$scope.selectedRoom.push(imageId);
        else{
          var colourFile = '/images/'+colFile[colourIndex]+'.png';
          $scope.colour.push({id:colourIndex,file:colourFile});
        } 
        console.log($scope.colour);
    }   
     
    $scope.saveData = function(){

      console.log($scope.spcShare);

      var budget = $scope.radioBudget;
      var ownership = $scope.radioAprt;
      var utility = $scope.spaceUse; 
      var brands = $scope.brand; 
      
      var extraInfo = $scope.extraInfo; 
      var email = $scope.inputEmail;
      var phone = $scope.inputPhone;
      var quizId = quizResult.getUserCurrQuiz();
      // var colours = $scope.colour.join();

     // console.log(colours);
      var colArr = [];
      for(var i =0;i<$scope.colour.length;i++){
        colArr.push($scope.colour[i].file);
      }
      var colours = colArr.join();

      var shareSpace = [];
      angular.forEach($scope.spcShare, function(space) {
        if(space.selected) shareSpace.push(space.name);
      });
      var spcShare = shareSpace.join();

      
      var dsgReason = [];
      angular.forEach($scope.designReason, function(reason) {
        if(reason.selected) dsgReason.push(reason.name);
      });
      var reason = dsgReason.join();

      if($scope.reasonOther!=null && $scope.reasonOther!=''){
        reason = reason +','+$scope.reasonOther;
      }


      var data={budget:budget,ownership:ownership,designReason:reason,spaceUtility:utility,spaceSharing:spcShare,brands:brands,colours:colours,extraInfo:extraInfo,
                file1:null,file2:null,email:email,phone:phone,quizId:quizId};
                
      if($scope.fileArr.length>0){
        mvUpload.uploadFiles($scope.fileArr).then(function(response){
          var files;
          if(response.length>0){
            files = response.toString();
          } 
          else {
            files = response;
          }
          mvUserQuiz.saveQuizMiscData(data).then(function(response){
            if(payment.getPayPkg()>0){
              $location.path('/reviewPayment');
            }
            else{
              $location.path('/pricing');    
            }
          },function(reason){

          });
        },function(reason){
          mvNotifier.notify('Files/ data could not be uploaded. Please try again. '+reason);
          alert('Files/ data could not be uploaded. Please try again. '+reason);
        });
        
      }

      else{
        mvUserQuiz.saveQuizMiscData(data,quizId).then(function(response){
          if(payment.getPayPkg()>0){
           $location.path('/reviewPayment');
          }
          else{
            $location.path('/pricing');    
          }
        },function(reason){

        });
      }

      //If payment already selected, go to new page, else go to payment page(create dup).
      
        
      
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
        if($scope.fileArr.length>0){
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
          $scope.pendingDropFiles.splice(index,1);
          $scope.fileArr.splice(mstrFileArrIdx,1);
        }
        else{
          var mstrFileArrIdx = $scope.pendingFilesArr[index].mainArrIndex;
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
            if (event.originalEvent.dataTransfer){
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