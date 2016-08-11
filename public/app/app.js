angular.module('app',['ngResource','ngRoute','angularGrid','ngFileUpload']); 


angular.module('app')
			.config(function($routeProvider, $locationProvider){

				var routeRoleChecks ={
					admin:{auth: function(mvAuth){
								return mvAuth.authorizeUserForRoute('admin');
							}}
				};
				$locationProvider.html5Mode(true);
				$routeProvider
					.when('/',{templateUrl: 'app/main.html', controller: 'MainController'})
					.when('/login',{templateUrl: 'app/account/login.html', controller: 'LoginController'})
					.when('/style-quiz',{templateUrl: 'app/styleQuiz/styleQuiz.html', controller: 'QuizController'})
					.when('/op-process',{templateUrl: 'app/process.html'})					
					.when('/tell-us-more',{templateUrl: 'app/moreDetails.html', controller: 'SaveDetails'})
					.when('/admin/users',{templateUrl: 'app/admin/userList.html', 
						controller: 'UserListCtrl',resolve: routeRoleChecks.admin});
    		});


angular.module('app').run(function($rootScope,$location){
	$rootScope.$on('$routeChangeError',function(evt, current, previous, rejection){
		if(rejection==='Unauthorized'){
			$location.path('/');
		}
	});
});	

// angular.module('app')
// 			.config(function($stateProvider, $urlRouterProvider) {

//     $urlRouterProvider.otherwise('/main.htnl');
//     $stateProvider          
//         .state('style-board-ctmp', {
//             url: '/style-board-ctmp',
//             template: 'style-board-ctmp.html'
//         })

// });


 
//console.log("In app.js1");



