'use strict';


angular.module('demoInAngularJsApp')
  .controller('DemoCtrl', function ($scope,getvoyagedata,getCurrencList) {
    $scope.tabs = [
      { title:'Selection',section:'selection' ,active:true},
      { title:'Registration',section:'registration'}
    ];
    $scope.selectionTab = true;
    $scope.edit = function(){
      $scope.tabs[1].active = true;
      $scope.tabSection = 'registration';
    };
    $scope.check = function(section){
      $scope.searchResults = [];
      $scope.tabSection = section;
    };
    $scope.getCurrencList = getCurrencList;
    $scope.voyagePlan  = getvoyagedata;
    $scope.searchResults = [];
    $scope.searchbtnfn = function(){
      $scope.searchResults.push($scope.voyagePlan);
      $scope.gridOptions1.data = $scope.searchResults;
    };
    $scope.voyagePlan.statisticsPeriod =   new Date($scope.voyagePlan.statisticsPeriod);
    $scope.gridOptions = {
      enableColumnResizing: true,
      enableSorting: true
    };
    $scope.gridOptions1 = {
      enableColumnResizing: true,
      enableSorting: true
    };
    $scope.gridOptions.columnDefs = [
      {name:"Currency", enableCellEdit: true},
      {name:"ExchangeRate",enableCellEdit: true}
    ];
    $scope.gridOptions1.columnDefs = [
      { name: 'Actions', cellTemplate: '<div class="ui-grid-cell-contents glyphicon glyphicon-pencil" ng-click="grid.appScope.edit(row)"></div>' },
      {name:"vessel"},
      {name:"voyage"},
      {name:"currency"},
      {name:"leg"}
    ];
    $scope.gridOptions.enableColumnResizing = true;
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.showGridFooter = true;
    $scope.gridOptions.showColumnFooter = true;
    $scope.gridOptions.enableVerticalScrollbar = 0;
    $scope.gridOptions.enableHorizontalScrollbar = 0;

    $scope.gridOptions.data = $scope.voyagePlan.portDetails.currency;
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.popup1 = {
      opened: false
    };
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

  });
