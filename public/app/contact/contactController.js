angular.module("app")
	.controller("ContactController",function($scope,$location,mvEmail,mvCommon,mvNotifier){

	$scope.contact_name;
	$scope.contact_email;
	$scope.contact_phone;
	$scope.contact_msg;

	$scope.contactUs = function(){
		if($scope.contactUsForm.$valid){
			var data = {name:$scope.contact_name,email:$scope.contact_email,phone:$scope.contact_phone,message:$scope.contact_msg};
			
			mvEmail.sendEmail().then(function(response){
				mvNotifier.notify('Thanks for your message. We will contact you soon.');
			});
			mvCommon.postContactDtls(data).then(function(response){
				$location.path('/');
			});
		}
	}	
	});
	