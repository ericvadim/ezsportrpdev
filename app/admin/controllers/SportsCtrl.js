'use strict';

angular.module('app.admin').controller('SportsController', function ($scope, SportTypeService, $filter) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    $scope.getData = function () {
        $scope.loading = true;
        SportTypeService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        SportTypeService.save(data).then(function (response) {
            $('#myModal').modal('hide');
        });
    };

    $scope.openModal = function (rowId) {
        $scope.editRow(rowId);
        $('#myModal').modal('show');
    };

    $scope.addNew = function () {
        $scope.currRow = {
            id: 0,
            sport_name: ''
        };
    };

    $scope.editRow = function (rowId) {
        $scope.currRow = $filter('filter')($scope.tableData, {id: rowId}, true)[0];
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            SportTypeService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
    $('#myModal').on('hidden.bs.modal', function () {
        $scope.getData();
    });
});