angular.module('app')
    .controller('SaveDetails',function($scope,$location,$routeParams, payment,mvUpload,mvNotifier,quizResult,mvUserQuiz){

  $scope.url ="";
  $scope.pendingFilesArr =[];
  $scope.pendingDropFiles = [];
  $scope.pendingDropFilesFurn = [];
  $scope.fileArr = [];
  $scope.image = null;
  $scope.imageFileName = '';
  $scope.colour = [];
  var colFile = ['','oranges','yellows','reds','neutrals','blacks','greys','whites','blues'];
  var success = false;
  $scope.dsgReason = [];
  $scope.shareSpace = [];
  $scope.colArr = [];

  $scope.aprt = [{value:'Own my apartment',selected:false},
                 {value:'Rent my apartment',selected:false}];

  $scope.selectedBudget = {
    'value': '$3,000 - $4,000'
  } ;    

  $scope.selectedAprt = {
    'value':'Own my apartment'
  };

  $scope.budget = [{value:'$3,000 - $4,000',selected:false},
                {value:'$4,000 - $5,000',selected:false},
                {value:'$5,000 - $7,000',selected:false},
                {value:'$7,000 - $10,000',selected:false},
                {value:'I’m not on a budget',selected:false}];

  $scope.spcShare = [{name:'Just Myself',selected:false},
                  {name:'Partner',selected:false},
                  {name:'Small children (under 5)',selected:false},
                  {name:'Roommate',selected:false},
                  {name:'Kids (6-18)',selected:false},
                  {name:'Adult Kids(18+)',selected:false},
                  {name:'Pets',selected:false},
                  {name:'Parents/ In-laws',selected:false},
                  {name:'Grandparents',selected:false},
                  {name:'Other/ NA',selected:false}
                  ];

  $scope.designReason = [{id:1,name:'I recently relocated or am going to soon',selected:false},
                  {id:2,name:'I want to rent/sell my place',selected:false},
                  {id:3,name:"It's time for an upgrade",selected:false},
                  {id:4,name:"A baby's on the way",selected:false},
                  {id:5,name:'My lifestyle is changing or has changed',selected:false},
                  {id:6,name:'I just feel like it',selected:false}
                  ];
  $scope.reasonOther=' ';

  
  // if(quizResult.getCustSelections().length===0){
  //   $location.path('/');
  // }


  var paymentMade = $routeParams.response_code;
  var merchant=$routeParams.merchant;
  var quizId = $routeParams.ref_id;
  var reference_code = $routeParams.reference_code;
  var currency = $routeParams.currency;
  var total_amount = $routeParams.total_amount;
  var signature_algorithm = $routeParams.signature_algorithm;

  quizResult.setUserCurrQuiz(quizId);

  function validateFormData(){
    angular.forEach($scope.designReason, function(reason) {
      if(reason.selected){
        $scope.dsgReason.push(reason.name);
      } 
    });
    if($scope.dsgReason.length===0 && $scope.reasonOther===' '){
      alert('Please select a reason to design your space');
      return false;
    }

    angular.forEach($scope.spcShare, function(space) {
      if(space.selected){ 
        $scope.shareSpace.push(space.name);
      }
    });
    if($scope.shareSpace.length===0){
      alert('Please select option(s) for whom you share youe space with');
      return false;
    }

    for(var i =0;i<$scope.colour.length;i++){
      $scope.colArr.push($scope.colour[i].file);
    }
    if($scope.colArr.length===0){
      alert('Please select some of your favourite colours.');
      return false;
    }
    return true;

  }

  $scope.saveColour = function(colourIndex){
    var index;

    for(var i in $scope.colour){
      if($scope.colour[i].id===colourIndex){
        index = i;
        break;
      }
    }
    if(index>-1){
      $scope.colour.splice(index, 1);
    }
    else{
      var colourFile = '/images/'+colFile[colourIndex]+'.png';
      $scope.colour.push({id:colourIndex,file:colourFile});
    } 
    return false;
  }   

  
  $scope.saveData = function(){

    if(!$scope.detailForm.$invalid){
      var isValid = validateFormData();

      if(isValid){
        var quizId = quizResult.getUserCurrQuiz();
        var reason = $scope.dsgReason.join();
        var spcShare = $scope.shareSpace.join();
        var colours = $scope.colArr.join();
        var selectedBudget;
        var selOwnership;

        for(var i=0;i<$scope.pendingDropFiles.length;i++){
          $scope.fileArr.push($scope.pendingDropFiles[i].file);
        }
        for(var i=0;i<$scope.pendingDropFilesFurn.length;i++){
          $scope.fileArr.push($scope.pendingDropFilesFurn[i].file);
        }

        // angular.forEach($scope.budget, function(budget) {
        //   console.log(budget);
        //   if(budget.selected){ 
        //     selectedBudget = budget.value;
        //   }
        // });

        console.log($scope.selectedBudget);

        angular.forEach($scope.aprt, function(aprt) {
          console.log(aprt);
          if(aprt.selected){ 
            selOwnership = aprt.value;
          }
        });

        if($scope.reasonOther!=null && $scope.reasonOther!=' '){
          reason = reason +','+$scope.reasonOther;
        }

        var data={budget:$scope.selectedBudget.value,
                  ownership:$scope.selectedAprt.value,
                  designReason:reason,
                  spaceUtility:$scope.spaceUse,
                  spaceSharing:spcShare,
                  brands:$scope.brand,
                  colours:colours,
                  extraInfo:$scope.extraInfo,
                  file1:null,file2:$scope.url,
                  email:$scope.inputEmail,
                  phone:$scope.inputPhone,
                  quizId:quizId};

        if($scope.fileArr.length>0){
          mvUpload.uploadFiles($scope.fileArr).then(function(response){
            var files;
            if(response.length>0){
              data.file1 = response.toString();
            } 
            else {
              data.file1 = response;
            }
            mvUserQuiz.saveQuizMiscData(data).then(function(response){
             /* if(payment.getPayPkg()>0){
                $location.path('/reviewPayment');
              }
              else{
                $location.path('/pricing');    
              }*/
              $location.path('/dashboard');    
            },function(reason){

            });
          },function(reason){
            mvNotifier.notify('Files/ data could not be uploaded. Please try again. '+reason);
            alert('Files/ data could not be uploaded. Please try again. '+reason);
          });
          
        }
        else{
          mvUserQuiz.saveQuizMiscData(data,quizId).then(function(response){
            /*if(payment.getPayPkg()>0){
             $location.path('/reviewPayment');
            }
            else{
              $location.path('/pricing');    
            }*/
            $location.path('/dashboard');    
          },function(reason){

          });
        }
      }
    }
  }


  $scope.formatBytes = function(bytes,decimals) {
    if(bytes == 0) return '0 Byte';
    var k = 1000; // or 1024 for binary
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  $scope.removeFileFromQ = function(index,fileArrType){
    if(fileArrType===1){
      $scope.pendingDropFiles.splice(index,1);
    }
    else{
      $scope.pendingDropFilesFurn.splice(index,1);
    }
  }

})
.directive("dropzone", function() {
return {
    restrict : "A",
    link: function (scope, element,attrs) {
      var checkSize, isTypeValid, validMimeTypes;
      var size = 0;

      element.on('dragover', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
      
      element.on('dragenter', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
      
      validMimeTypes = attrs.fileDropzone;

      checkSize = function(size) {
          var _ref;
          if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
            return true;
          } else {
            alert("Total File size must be smaller than " + attrs.maxFileSize + " MB");
            return false;
          }
        };
        isTypeValid = function(type) {
          if (validMimeTypes.indexOf(type) > -1) {
            return true;
          } else {
            alert("Invalid file type.  File must be one of following types " + validMimeTypes);
            return false;
          }
        };

      element.bind('drop', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.originalEvent.dataTransfer){
          if (event.originalEvent.dataTransfer.files.length > 0) {
            for(var i=0; i< event.originalEvent.dataTransfer.files.length; i++){
              var type = event.originalEvent.dataTransfer.files[i].type;
              size = size + event.originalEvent.dataTransfer.files[i].size;
              if (checkSize(size) && isTypeValid(type)) {
                scope.$apply(function(scope) {
                  if(event.originalEvent.path[0].id==='fileImages'){
                    scope.pendingDropFiles.push({"file":event.originalEvent.dataTransfer.files[i], "name":event.originalEvent.dataTransfer.files[i].name,"size":scope.formatBytes(event.originalEvent.dataTransfer.files[i].size,0)});  
                  }
                  else{
                      scope.pendingDropFilesFurn.push({"file":event.originalEvent.dataTransfer.files[i],"name":event.originalEvent.dataTransfer.files[i].name,"size":scope.formatBytes(event.originalEvent.dataTransfer.files[i].size,0)});
                  }
                  
                });    
              }             
            }
          }
        }
        return false;
      });
    }
  }
});