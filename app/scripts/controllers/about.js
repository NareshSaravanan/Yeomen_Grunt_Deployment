'use strict';

/**
 * @ngdoc function
 * @name demoInAngularJsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demoInAngularJsApp
 */
angular.module('demoInAngularJsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
