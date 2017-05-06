'use strict';

angular.module('app.admin').controller('PlayerStatsController', function ($scope, RecordItemsService, GameRecordsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.loading = true;
    $scope.recordItems = [];

    RecordItemsService.get().then(function (response) {
        $scope.recordItems = response.data;
    });

    $scope.getData = function () {
        $scope.loading = false;
        GameRecordsService.getPlayerStats().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();
});