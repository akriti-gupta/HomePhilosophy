angular.module('app')
    .controller('SaveDetails',['Upload','$window','$scope',function(Upload,$window,$scope){
       $scope.filestatus = "";
       $scope.uploadBtn1 = true;
       $scope.uploadBtn2 = true;

       $scope.fileToUpload = function(element) { 
       // console.log(element.id);
       // console.log(element.files);      	
       if(element.id ==='cust-file-selector'){
       		$scope.uploadBtn1 = false;
       		$scope.uploadBtn2 = true;
       }
       else{
       		$scope.uploadBtn2 = false;
       		$scope.uploadBtn1 = true;
       }
 			$scope.$apply(function($scope) {
   				$scope.file = element.files;         
 			});

 			console.log($scope.file[0].name);
		}


        $scope.uploadFile = function(file){

			if ($scope.file) {
                $scope.upload($scope.file); 
            }


   // if ($scope.detailForm.file.$valid && $scope.file) {
   //              $scope.upload($scope.file); 
   //          }
        }
        $scope.upload = function (file) {
        	var status;
            Upload.upload({
                url: '/upload', 
                data:{file:file} 
            }).then(function (resp) { 
                if(resp.data.error_code === 0){ 
                	status = "Uploaded";
                     $window.alert('File uploaded successfully');
                } else {
                     $window.alert('An error occured. Please contact the administrator.');
                }
            });
            $scope.filestatus = status;
            $scope.file = "";
            $scope.uploadBtn1 = true;
       		$scope.uploadBtn2 = true;
        }
    }]);