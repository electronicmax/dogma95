/* global angular, _, jQuery, Backbone */

angular.module('dogma', ['ui.router'])
	.config(function ($urlRouterProvider) {
		$urlRouterProvider.otherwise('/main');
	}).config(function ($stateProvider) {
		$stateProvider.state('main', {
			url: '/main',
			templateUrl: 'tmpl/main.html',
			resolve: {
				apps:function ($http)  { return $http.get('data/db.json').then(function(x) { return x.data.apps; }); }
			},
			controller:function($scope, apps) {
				$scope.apps = apps;
				$scope.apps.map((a) => {
					a.platforms = a.platforms.join('; ');
				});
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
				$scope.apps = apps;
				$scope.apps.map((a) => {
					a.platforms = a.platforms.join('; ');
				});
			}
		});
	}).controller('main', function() { 

	});

console.log('main');