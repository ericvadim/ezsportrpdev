'use strict';

angular.module('app.admin').controller('PlayerStatsController', function ($scope, GameRecordsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.loading = true;

    $scope.getData = function () {
        $scope.loading = true;
        GameRecordsService.getPlayerStats().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();
});