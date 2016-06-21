
//var app = angular.module("styleQuiz",[]);

angular.module('app',['ngResource','ngRoute']); 

//console.log("In app.js");
angular.module('app')
			.config(function($routeProvider, $locationProvider){
				//console.log("In angular, before reading root path for partials");
				//$locationProvider.html5Mode(true);
				$routeProvider
					.when('/',{templateUrl: 'app/main.html', controller: 'MainController'})
					.when('/login',{templateUrl: 'app/account/login.html', controller: 'LoginController'})
					.when('/styleQuiz',{templateUrl: 'app/styleQuiz/styleQuiz.html', controller: 'QuizController'})
					
    $locationProvider.html5Mode(true);
			});


 
//console.log("In app.js1");



