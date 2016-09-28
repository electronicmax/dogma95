/* global angular, _  */

angular.module('dogma', ['ui.router'])
	.config(function ($urlRouterProvider) {
		$urlRouterProvider.otherwise('/main');
	}).config(function ($stateProvider) {
		$stateProvider.state('main', {
			url: '/main?a',
			templateUrl: 'tmpl/main.html',
			resolve: {
				apps:function ($http)  { return $http.get('data/db.json').then(function(x) { return x.data.apps; }); }
			},
			controller:function($scope, $stateParams, $anchorScroll, apps) {
				$scope.apps = apps;
				if ($stateParams.a) { $anchorScroll($stateParams.a); }
				window._s = $scope;
			}
		});
		$stateProvider.state('registry', {
			url: '/registry',
			templateUrl: 'tmpl/registry.html',
			resolve: {
				apps:function ($http)  { return $http.get('data/db.json').then(function(x) { return x.data.apps; }); }
			},
			controller:function($scope, apps) {	
				$scope.apps = _(apps).sortBy(function(x) { return x.category + "-" + x.name; }).value();
				var lastCat;
				$scope.apps.map((a) => {
					// a.platforms = a.platforms.join('; ');
					if (lastCat !== a.category) { 
						a.section = a.category; 
						lastCat = a.category;
					}
				});
				window._s = $scope;
			}
		});
	}).controller('main', function() { 

	});

console.log('main');