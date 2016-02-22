'use strict';

/**
 * @ngdoc function
 * @name demoInAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoInAngularJsApp
 */
angular.module('demoInAngularJsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    slides.push({
      image:'../images/Image1.jpg',
      id: 0
    });
    slides.push({
      image:'../images/Image2.jpg',
      id: 1
    });


  });
