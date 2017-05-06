'use strict';

angular.module('app.admin').controller('TeamStatsController', function ($scope, RecordItemsService, ClubsService, GameRecordsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.loading = true;
    $scope.clubs = [];
    $scope.currClubId = 0;
    $scope.recordItems = [];

    RecordItemsService.get().then(function (response) {
        $scope.recordItems = response.data;
    });

    ClubsService.get().then(function (response) {
        $scope.clubs = response.data;
        if ($scope.clubs.length) {
            $scope.currClubId = $scope.clubs[0].id;
            $scope.getData();
        }
    });

    $scope.getData = function () {
        $scope.loading = true;
        GameRecordsService.getTeamStats($scope.currClubId).then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
});