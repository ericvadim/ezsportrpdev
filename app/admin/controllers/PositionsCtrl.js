'use strict';

angular.module('app.admin').controller('PositionsController', function ($scope, PositionsService, SportsService) {
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
        PositionsService.get($scope.currSportId).then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        data['sport_id'] = $scope.currSportId;
        PositionsService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            position_name: '',
            short_name: ''
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            PositionsService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});