angular.module("app")
	.controller("ContactController",function($scope,$location,mvEmail,mvCommon,mvNotifier){

	$scope.contact_name;
	$scope.contact_email;
	$scope.contact_phone;
	$scope.contact_msg;

	$scope.contactUs = function(){
		if($scope.contactUsForm.$valid){
			var data = {name:$scope.contact_name,email:$scope.contact_email,phone:$scope.contact_phone,message:$scope.contact_msg,created_at:(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))};
			var mailData = {'template':'contact','name':$scope.contact_name,'email':$scope.contact_email,'phone':$scope.contact_phone,'message':$scope.contact_msg};
			alert('Thanks for your message. We will contact you soon.');
			mvNotifier.notify('Thanks for your message. We will contact you soon.');
			mvEmail.sendEmail(mailData).then(function(response){});
			mvCommon.postContactDtls(data).then(function(response){
				$location.path('/');
			});
		}
	}	
	});
	