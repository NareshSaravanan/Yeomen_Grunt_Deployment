'use strict';


angular.module('demoInAngularJsApp')
  .controller('DemoCtrl', function ($scope,getvoyagedata,getCurrencList,serviceCall) {
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
    angular.forEach(getvoyagedata,function(data){
      data.statisticsPeriod =   new Date(data.statisticsPeriod);
    });
    $scope.voyagePlan  = getvoyagedata[0];
    $scope.searchResults = [];
    $scope.searchbtnfn = function(){
      $scope.gridOptions1.data = [];
      serviceCall.get('//demoappchinanavigation.us-west-2.elasticbeanstalk.com//DotNet').then(function(data){
        $scope.gridOptions1.data = data;

      });
    };

    $scope.gridOptions = {
      enableColumnResizing: true,
      enableSorting: true
    };
    $scope.gridOptions1 = {
      enableColumnResizing: true,
      enableSorting: true
    };
    $scope.gridOptions2 = {
      enableColumnResizing: true,
      enableSorting: true
    };
    $scope.gridOptions.columnDefs = [
      {name:"Currency", enableCellEdit: true},
      {name:"ExchangeRate",enableCellEdit: true}
    ];
    $scope.gridOptions1.columnDefs = [
      { name: 'Actions', cellTemplate: '<div class="ui-grid-cell-contents"><a class="glyphicon glyphicon-pencil" style="cursor:pointer"  ng-click="grid.appScope.edit(row)"></a></div>' },
      {name:"vessel"},
      {name:"voyage"},
      {name:"currency", cellFilter: 'mapGender'},
      {name:"leg"}
    ];
    $scope.gridOptions2.columnDefs = [
      {name:"vessel"},
      {name:"voyage"},
      {name:"currency",editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
        cellFilter: 'mapGender',  editDropdownValueLabel: 'currency', editDropdownOptionsArray: [
        { id: 1, currency: 'AUD' },
        { id: 2, currency: 'CAD' },
        { id: 3, currency: 'EUR' },
        { id: 4, currency: 'FJD' },
        { id: 5, currency: 'GBP' },
        { id: 6, currency: 'HKD' }
      ]},
      {name:"leg"}
    ];

    $scope.voyageData = [];
  //  $scope.voyageData.push($scope.voyagePlan);
    $scope.gridOptions2.data = getvoyagedata;
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
        selectedRowsString += selectedRow.crgtype + ' - ' + selectedRow.crgtypedesc + ' - ' + selectedRow.unitsize;
      });
      $scope.gridOptionsAutoComplete.quickFilterText = selectedRowsString;
      //document.querySelector('#selectedRows').innerHTML = selectedRowsString;
      document.getElementById('myGrid').style.display='none'
    }

    document.addEventListener('DOMContentLoaded', function() {
      var gridDiv = document.querySelector('#myGrid');

    });


  });
