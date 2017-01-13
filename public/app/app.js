// angular.module('app',['ngResource','ngRoute','angularGrid','ngFileUpload', 'ui.bootstrap']); 
angular.module('app',['ngResource','ngRoute','angularGrid','ngFileUpload']); 


angular.module('app')
			.config(function($routeProvider, $locationProvider){

				// var routeRoleChecks ={
				// 	admin:{auth: function(mvAuth){
				// 				return mvAuth.authorizeUserForRoute('admin');
				// 			}}
				// };
				// var routeLoginChecks ={
				// 	user:{login: function(mvAuth){
				// 				return mvAuth.authorizeUserForLogin();
				// 			}}
				// };
				$locationProvider.html5Mode(true);
				$routeProvider
					.when('/',{templateUrl: 'app/home/main.html', controller: 'MainController'})
					
					.when('/about-us',{templateUrl: 'app/home/aboutUs/aboutUs.html'})
					.when('/pricing',{templateUrl: 'app/home/payment/pricing.html', controller: 'PaymentController'})
					.when('/portfolio',{templateUrl: 'app/home/portfolio.html'})
					.when('/luxury-spaces',{templateUrl: 'app/home/luxurySpaces.html'})
					.when('/faq',{templateUrl: 'app/home/faq/faq.html'})
					.when('/contact-us',{templateUrl: 'app/contact/contactUs.html'})
					.when('/style-quiz',{templateUrl: 'app/styleQuiz/styleQuiz.html', controller: 'QuizController'})
					.when('/login',{templateUrl: 'app/account/login.html', controller: 'LoginController'})
					.when('/signup',{templateUrl: 'app/account/login.html', controller: 'LoginController'})
					.when('/tell-us-more',{templateUrl: 'app/moreDetails.html', controller: 'SaveDetails'})
					// .when('/tell-us-more',{templateUrl: 'app/moreDetails.html', controller: 'SaveDetails',resolve: routeLoginChecks.user})
					// .when('/reviewPayment',{templateUrl: 'app/home/payment/reviewPayment.html', controller: 'PaymentController',resolve: routeLoginChecks.user})
					.when('/reviewPayment',{templateUrl: 'app/home/payment/reviewPayment.html', controller: 'PaymentController'})
					// .when('/admin/users',{templateUrl: 'app/admin/userList.html', controller: 'UserListCtrl',resolve: routeRoleChecks.admin})
					.when('/admin/users',{templateUrl: 'app/admin/userList.html', controller: 'UserListCtrl'})
					// .when('/dashboard',{templateUrl: 'app/customer/dashboard.html', controller: 'CustViewController',resolve: routeLoginChecks.user})
					.when('/dashboard',{templateUrl: 'app/customer/dashboard.html', controller: 'CustViewController'})
					
					.when('/feedback',{templateUrl: 'app/customer/feedback.html', controller: 'CustViewController'})

					
					// .when('/projectDetail/:idx/detail/:detail',{templateUrl: 'app/admin/projectDetail.html', controller: 'ProjectDetailCtrl'})
					.otherwise({templateUrl: 'app/home/main.html', controller: 'MainController'});
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



