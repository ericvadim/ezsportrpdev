'use strict';

angular.module('app.admin').controller('TeamStatsController', function ($scope, GameRecordsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.loading = true;

    $scope.getData = function () {
        $scope.loading = true;
        GameRecordsService.getTeamStats().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();
});