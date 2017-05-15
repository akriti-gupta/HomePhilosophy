// angular.module('app',['ngResource','ngRoute','angularGrid','ngFileUpload', 'ui.bootstrap']); 
angular.module('app',['ngResource','ngRoute','angularGrid','ngFileUpload','ui.bootstrap']); 


angular.module('app')
			.config(function($routeProvider, $locationProvider){

				var routeRoleChecks ={
					admin:{auth: function(mvAuth){
								return mvAuth.authorizeUserForRoute('admin');
							}}
				};
				var routeLoginChecks ={
					user:{login: function(mvAuth){
								return mvAuth.authorizeUserForLogin();
							}}
				};
				$locationProvider.html5Mode(true);
				$routeProvider
					.when('/',{templateUrl: 'app/home/main.html', controller: 'MainController'})
					
					.when('/about-us',{templateUrl: 'app/home/aboutUs/aboutUs.html'})
					.when('/pricing',{templateUrl: 'app/home/payment/pricing.html', controller: 'PricingController'})
					.when('/portfolio',{templateUrl: 'app/home/portfolio.html'})
					.when('/luxury-spaces',{templateUrl: 'app/home/luxurySpaces.html'})
					.when('/faq',{templateUrl: 'app/home/faq/faq.html'})
					.when('/contact-us',{templateUrl: 'app/contact/contactUs.html',controller: 'ContactController'})
					.when('/style-quiz',{templateUrl: 'app/styleQuiz/styleQuiz.html', controller: 'QuizController'})
					.when('/login',{templateUrl: 'app/account/login.html', controller: 'LoginController'})
					.when('/signup',{templateUrl: 'app/account/login.html', controller: 'LoginController'})
					.when('/tell-us-more',{templateUrl: 'app/styleQuiz/moreDetails.html', controller: 'SaveDetails',resolve: routeLoginChecks.user})
					.when('/review-payment',{templateUrl: 'app/home/payment/reviewPayment.html', controller: 'PaymentController',resolve: routeLoginChecks.user})
					.when('/custom',{templateUrl: 'app/home/payment/customPackage.html', controller: 'PricingController'})
					.when('/admin/users',{templateUrl: 'app/admin/userList.html', controller: 'UserListCtrl',resolve: routeRoleChecks.admin})
					.when('/dashboard/:launched',{templateUrl: 'app/customer/dashboard.html', controller: 'CustViewController',resolve: routeLoginChecks.user})
					.when('/dashboard',{templateUrl: 'app/customer/dashboard.html', controller: 'CustViewController',resolve: routeLoginChecks.user})
					.when('/terms-and-privacy',{templateUrl: 'app/home/terms.html'})
					.otherwise({templateUrl: 'app/home/main.html', controller: 'MainController'});
    		});


angular.module('app').run(function($rootScope,$location){
	$rootScope.$on('$routeChangeError',function(evt, current, previous, rejection){
		if(rejection==='Unauthorized'){
			$location.path('/');
		}
	});
});	

var payment_keys = {
	'MERCHANT_SECRET_KEY':'b899e1ed97ea4f58b8146f1b8c90b40a',
	'MERCHANT_EMAIL': 'rashi@homephilosophy.com.sg'
};

angular.module('app').constant('PAYMENT_KEYS',payment_keys);

angular.module('app').directive('diHref', ['$location', '$route',
        function($location, $route) {
    return function(scope, element, attrs) {
        scope.$watch('diHref', function() {
            if(attrs.diHref) {
                element.attr('href', attrs.diHref);
                element.bind('click', function(event) {
                    scope.$apply(function(){
                        if($location.path() == attrs.diHref) $route.reload();
                    });
                });
            }
        });
    }
}]);

