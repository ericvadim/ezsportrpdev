'use strict';

angular.module('app.admin').controller('RecordItemsController', function ($scope, RecordItemsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;
    $scope.itemTypes = {
        1: 'TG/G',
        2: 'TP/TA (G_B)'
    };

    $scope.getData = function () {
        $scope.loading = true;
        RecordItemsService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            angular.forEach($scope.tableData, function (val) {
                val.is_referee = val.is_referee * 1 + "";
                val.is_coach = val.is_coach * 1 + "";
            });
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        RecordItemsService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            item_name: '',
            short_name: '',
            item_type: '1',
            is_referee: "0",
            is_coach: "0"
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            RecordItemsService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});