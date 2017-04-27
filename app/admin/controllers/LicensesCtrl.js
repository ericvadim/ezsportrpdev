'use strict';

angular.module('app.admin').controller('LicensesController', function ($scope, LicensesService, SportsService) {
    $scope.sports = [];
    $scope.currSportId = 0;
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    SportsService.get().then(function (response) {
        $scope.sports = response.data;
        if ($scope.sports.length) {
            $scope.currSportId = $scope.sports[0].id;
            $scope.getData();
        }
    });

    $scope.getData = function () {
        $scope.loading = true;
        LicensesService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        LicensesService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            sport_name: ''
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            LicensesService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});