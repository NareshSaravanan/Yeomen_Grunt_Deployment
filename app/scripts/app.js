'use strict';

/**
 * @ngdoc overview
 * @name demoInAngularJsApp
 * @description
 * # demoInAngularJsApp
 *
 * Main module of the application.
 */
angular
  .module('demoInAngularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap','ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 'ui.grid.grouping'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoCtrl',
        resolve:{
          getvoyagedata : function(serviceCall){
          return serviceCall.get('//localhost:11411/DotNet');
          },
          getCurrencList : function(serviceCall){
            return serviceCall.get('//localhost:9000/data/currencyList.json');
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
 .service('serviceCall', ['$rootScope','$http', '$q', function ($rootScope,$http, $q) {
   $rootScope.check = true;
   function makeserviceCall(type,url,data)
   {
     var deferred = $q.defer();
     $http({
       method: type,
       url: url,
       data : data,
       cache: true
     }).success(function (data) {
       deferred.resolve(data);
     }).error(function (msg) {
       deferred.reject(msg);
     });

     return deferred.promise;

   }

    return {
      get : function(url,data){
        return makeserviceCall('GET',url,data)
      },
      post: function(url,data){
        return makeserviceCall('POST',url,data)
      }
    }

}]);

angular.module('demoInAngularJsApp')
  .controller('IndexCtrl', function ($scope,$rootScope) {
    $rootScope.$on('$routeChangeStart', function(){
      $scope.isRouteLoading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function(){
      $scope.isRouteLoading = false;
    });

  });
