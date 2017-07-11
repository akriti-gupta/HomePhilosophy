angular.module('app')
    .controller('SaveDetails',function($scope,$location,$routeParams, payment,mvUpload,mvNotifier,quizResult,mvUserQuiz,mvPayment,PAYMENT_KEYS){

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
  $scope.quizId = -1;

  $scope.showWait = false;
  var packages = [
              {'id':1,'name':"Simple",'pkgValue':350.00,value:1},
                {'id':2,'name':"Classic",'pkgValue':600.00,value:2},
                {'id':3,'name':"Premium",'pkgValue':1000.00,value:3}
    ];  

  $scope.aprt = [{value:'Own my apartment',selected:false},
                 {value:'Rent my apartment',selected:false}];

  $scope.selectedBudget = {
    'value': '$3,000 - $4,000'
  } ;    

  $scope.selectedAprt = {
    'value':'Own my apartment'
  };

  $scope.budget = [{value:'Under $3000',selected:false},
                {value:'$3,000 - $4,000',selected:false},
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

  function isValidTotalSize(){

    var totSize = 0;
    for(var i=0;i<$scope.pendingDropFiles.length;i++){
      totSize = totSize + $scope.pendingDropFiles[i].file.size;
    }
    if((totSize/1024)/1024 > 5){
      alert("Total file size of images/pinterest board should be upto 5MB");
      return false;
    }
    else{
      var totSizeFurn = 0;
       for(var i=0;i<$scope.pendingDropFilesFurn.length;i++){
          totSizeFurn = totSizeFurn + $scope.pendingDropFilesFurn[i].file.size;
        }
        if((totSizeFurn/1024)/1024 > 5){
          alert("Total file size of existing funiture/accessories should be upto 5MB");
          return false;
        }
        else{
          return true;
        }
    }
  }

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
      alert('Please select option(s) for whom you share your space with');
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

$scope.processPayment = function(){
  console.log('In Tell us more processPayment');
  console.log($routeParams);
  console.log($routeParams.merchant!=null);
  console.log($routeParams.response_code!=null);
  console.log($routeParams.ref_id!=null);
  console.log($routeParams.reference_code!=null);
  console.log($routeParams.currency!=null);
  console.log($routeParams.total_amount!=null);
  console.log($routeParams.signature_algorithm!=null);
  console.log($routeParams.signature!=null);
  console.log($routeParams.card_type!=null);

    if($routeParams.merchant!=null && $routeParams.response_code!=null && $routeParams.ref_id!=null
        && $routeParams.reference_code!=null && $routeParams.currency!=null && $routeParams.total_amount!=null &&
        $routeParams.signature_algorithm!=null && $routeParams.signature!=null && $routeParams.card_type!=null){
    
    // if(true){
      var keys = PAYMENT_KEYS;
      var secret=keys.MERCHANT_SECRET_KEY;
      var response_code = $routeParams.response_code;
      var merchant=$routeParams.merchant;
      var ref_id = $routeParams.ref_id;
      $scope.quizId = ref_id;
      var reference_code = $routeParams.reference_code;
      var currency = $routeParams.currency;
      var total_amount = $routeParams.total_amount;
      var signature_algorithm = $routeParams.signature_algorithm;
      var signature = $routeParams.signature;
      var card_type = $routeParams.card_type;

      var returnSig = CryptoJS.SHA1(secret+merchant+ref_id+reference_code+response_code+currency+total_amount).toString();
      
      console.log('merchant is: '+merchant+'abc');
      console.log('keys.MERCHANT_EMAIL: '+keys.MERCHANT_EMAIL+'abc');
      console.log('currency: '+currency+'abc');

      console.log('Sig is: '+signature+'abc');
      console.log('Ret sig is: '+returnSig+'abc');
      //$scope.quizId = payment.getTempQuizId();
      // Check that details dont exits already in the DB. This is to prevent user resubmitting the data by accessing teh link from bookmark.
      console.log('Before mvUserQuiz.getQuizDetails');
      mvUserQuiz.getQuizDetails($scope.quizId).then(function(response){
        console.log('Got response back from getQuizDetails: ');
        console.log(response);
        if(response){
          console.log('In If');
          $location.search({});
          $location.path('/dashboard');
        }
        else{
          console.log('In else');
          console.log('Chking retSig = sig: ');
          console.log(returnSig === signature);
          if(returnSig === signature){
          // if(true){
            console.log('Chking response_code' +response_code);
            if(response_code==='1'){
            // if(true){
              console.log('Chking merchant: ' );
              console.log(merchant===keys.MERCHANT_EMAIL);
              console.log('Chking currency: ');
              console.log(currency==='SGD');
              if(merchant===keys.MERCHANT_EMAIL && currency==='SGD' ){
              // if(true){
                var status = -1;
                // var quizId = ref_id;
                var quizId = $scope.quizId
                console.log('Beofre getPaymentInfo, quizId is: '+quizId+'abc');
                mvPayment.getPaymentInfo(quizId,status).then(function(response){
                    console.log('Resp ret from getPaymentInfo');
                    console.log(response);
                    var totalPrice = (response[0].totalPrice).toFixed(2);
                    console.log('total_amount is: '+total_amount);
                    console.log('totalPrice is: '+totalPrice);
                    console.log(totalPrice===total_amount);
                    if(totalPrice===total_amount){
                    // if(true){
                      status = 0;
                      console.log('Before updatePackage');
                      mvPayment.updatePackage(quizId, status,totalPrice).then(function(response){
                        console.log('In resp of updatePackage');
                       angular.element('#messageModal').modal('show');
                      }, function(reason){
                        console.log('Payment unsuccessful');
                        console.log(reason);
                        alert('Payment unsuccessful, please contact the site admin. '+reason);
                        $location.search({});
                        $location.path('/dashboard');
                        
                      }); 
                    }
                    else{
                      console.log('Amount to be paid is: '+totalPrice+', while amount paid= '+total_amount);
                      alert('Amount to be paid is: '+totalPrice+', while amount paid= '+total_amount);
                      $location.search({});
                      $location.path('/dashboard');
                    }
                  
                }, function(reason){
                  console.log('Cant fetch payment information. Please contact the site admin');
                  console.log(reason);
                  alert('Cant fetch payment information. Please contact the site admin');
                  $location.search({});
                  $location.path('/dashboard');

                });
              }
              else{
                console.log('Error, merchant or currency incorrect');
                alert('Error, merchant or currency incorrect');
                $location.search({});
                $location.path('/dashboard');
              }
            }
          }
          else{
            console.log('Secure signature unmatched.Payment could not be made, please contact the site admin.')
            alert('Secure signature unmatched.Payment could not be made, please contact the site admin.');
            $location.search({});
            $location.path('/dashboard');
          }
        }
      });
    }
    else{
      console.log('In last else, no routeParams');
      if(! $routeParams.dashboard){
        $location.search({});
        $location.path('/dashboard');
      }
    }
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
      if(isValidTotalSize() && isValid){
        $scope.showWait = true;
        var quizId;
        if($scope.quizId===-1){
            quizId = quizResult.getUserCurrQuiz();
        }
        else{
          quizId = $scope.quizId;
        }
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
        angular.forEach($scope.aprt, function(aprt) {
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
                  // email:$scope.inputEmail,
                  // phone:$scope.inputPhone,
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
              $location.search({});
              quizResult.setLaunchKey(true);
              $scope.showWait = false;
              // $location.path('/dashboard').search({'launched':'true'});    
              $location.path('/dashboard');
            },function(reason){
              alert(reason);
              $scope.showWait = false;
            });
          },function(reason){
            $scope.showWait = false;
            mvNotifier.notify('Files/ data could not be uploaded. Please try again. '+reason);
            alert('Files/ data could not be uploaded. Please try again. '+reason);
          });
          
        }
        else{
          mvUserQuiz.saveQuizMiscData(data,quizId).then(function(response){
            $scope.showWait = false;
             $location.search({});
            // $location.path('/dashboard').search({'launched':'true'});    
            quizResult.setLaunchKey(true);
            $location.path('/dashboard');
          },function(reason){
            alert(reason);
            $scope.showWait = false;
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
        size = 0;
        if (event.originalEvent.dataTransfer){
          if (event.originalEvent.dataTransfer.files.length > 0) {
            for(var i=0; i< event.originalEvent.dataTransfer.files.length; i++){
              var type = event.originalEvent.dataTransfer.files[i].type;
              size = size + event.originalEvent.dataTransfer.files[i].size;
              if (checkSize(size) && isTypeValid(type)) {
                scope.$apply(function(scope) {
                  if(event.currentTarget.attributes.id.nodeValue==='fileImages'){
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