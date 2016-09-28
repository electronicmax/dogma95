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

                             $scope.medscats = _.chain($scope.meds).sortBy(function (med) {
                                // console.log('sortby ', med.lcatlabel + ':' + med.lname)
                                return med.category + ':' + med.lname;
                            }).map(function (med) {
                                var section = med.catlabel;
                                if (section !== lastSection) {
                                    lastSection = section;
                                } else {
                                    section = '';
                                }
                                return _.extend({ section: section }, med);
                            }).value();
				
			}
		});
	}).controller('main', function() { 

	});

console.log('main');