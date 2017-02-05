//Wrap toastr inside a service to put it in a gloabl variable to be used as dependency injection.

angular.module('app').value('mvToastr',toastr);

//Create a notifier service - an object with a function
angular.module('app').factory('mvNotifier',function(mvToastr){
	return {
		notify: function(msg){
			mvToastr.success(msg);
			console.log(msg);
		},
		error: function(msg){
			mvToastr.error(msg);
			console.log(msg);
		}
	}

});