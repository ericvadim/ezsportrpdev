'use strict';

angular.module('app.admin').controller('FieldsController', function ($scope, FieldsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    $scope.getData = function () {
        $scope.loading = true;
        FieldsService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            for (var i in $scope.tableData) {
                $scope.tableData[i].soccer = !!($scope.tableData[i].soccer * 1);
                $scope.tableData[i].synthetic_turf = !!($scope.tableData[i].synthetic_turf * 1);
                $scope.tableData[i].restrooms = !!($scope.tableData[i].restrooms * 1);
            }
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        FieldsService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            field_name: '',
            soccer: 0,
            synthetic_turf: 0,
            restrooms: 0,
            location: ''
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            FieldsService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});