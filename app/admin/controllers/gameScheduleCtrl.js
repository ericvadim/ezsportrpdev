'use strict';

angular.module('app.admin').controller('GameSchedulesController', function ($scope, GameSchedulesService, LeaguesService) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    LeaguesService.getLeagues().then(function (response) {
        console.log(response)
    });

    $scope.getData = function () {
        $scope.loading = true;
        GameSchedulesService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        GameSchedulesService.save(data).then(function () {
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
            GameSchedulesService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});