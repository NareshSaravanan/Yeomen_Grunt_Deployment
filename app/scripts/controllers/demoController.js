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


      $scope.gridheader = [
        {headerName: "Cargo Type", field: "crgtype"},
        {headerName: "Cargo Type Description", field: "crgtypedesc"},
        {headerName: "Unit Size", field: "unitsize"}
      ];
      $scope.rowData = [
        {crgtype: "20BK", crgtypedesc: "Cargo Type Desc", unitsize: 20},
        {crgtype: "PLT", crgtypedesc: "PALLET", unitsize: 0},
        {crgtype: "TPK", crgtypedesc: "TIMBERPACK", unitsize: 0},
        {crgtype: "20BO", crgtypedesc: "20' BOLSTER/S", unitsize: 20},
        {crgtype: "40DY", crgtypedesc: "40' DRY CONTAINER", unitsize: 40},
        {crgtype: "20FA", crgtypedesc: "20' FAN TAINER/S", unitsize: 20}
      ];




      $scope.gridOptionsAutoComplete = {
        columnDefs: $scope.gridheader,
        rowData: $scope.rowData,
        onSelectionChanged: onSelectionChanged,
        rowSelection: 'single',
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        groupHeaders: true,
        rowHeight: 22,
        onModelUpdated: onModelUpdated,
        suppressRowClickSelection: false


      };

      function onModelUpdated() {
        var model = $scope.gridOptionsAutoComplete.api.getModel();
        var totalRows = $scope.gridOptionsAutoComplete.rowData.length;
        var processedRows = model.getVirtualRowCount();
        $scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
      }

      function onSelectionChanged() {
        var selectedRows = $scope.gridOptionsAutoComplete.api.getSelectedRows();
        var selectedRowsString = '';
        selectedRows.forEach( function(selectedRow, index) {
          if (index!=0) {
            selectedRowsString += ', ';
          }
          selectedRowsString += selectedRow.crgtype;
        });
        $scope.gridOptionsAutoComplete.quickFilterText = selectedRowsString;
        document.querySelector('#selectedRows').innerHTML = selectedRowsString;
        document.getElementById('myGrid').style.display='none'
      }

      document.addEventListener('DOMContentLoaded', function() {
        var gridDiv = document.querySelector('#myGrid');

      });


  });
