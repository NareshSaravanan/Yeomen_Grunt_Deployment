'use strict';

/**
 * @ngdoc overview
 * @name demoInAngularJsApp
 * @description
 * # demoInAngularJsApp
 *
 * Main module of the application.
 */

agGrid.initialiseAgGridWithAngular1(angular);
function showGrid(val)
{
  console.log(val.length)
  if(val.length <0){
    document.getElementById('myGrid').style.display='none'
  }
  else
  {
    console.log("hide count")
    document.getElementById('myGrid').style.display='block'
  }
}
angular
  .module('demoInAngularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch','agGrid',
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
          return serviceCall.get('//demoappchinanavigation.us-west-2.elasticbeanstalk.com//DotNet');
         // return serviceCall.get('//localhost:11411/DotNet');
          },
          getCurrencList : function(serviceCall){
            return serviceCall.get('//raw.githubusercontent.com/NareshSaravanan/Yeomen_Grunt_Deployment/master/app/data/currencyList.json');
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .filter('mapGender', function() {
    var genderHash = {
      1: 'AUD',
      2: 'CAD',
      3: 'EUR',
      4: 'FJD',
      5: 'GBP',
      6: 'HKD'
    };
    return function(input) {
      if (!input){
        return '';
      } else {
        return genderHash[input];
      }
    };
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
