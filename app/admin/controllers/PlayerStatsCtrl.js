'use strict';

angular.module('app.admin').controller('PlayerStatsController', function ($scope, RecordItemsService, TeamsService, GameRecordsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.loading = true;
    $scope.teams = [];
    $scope.curr = {};
    $scope.recordItems = [];

    RecordItemsService.get().then(function (response) {
        $scope.recordItems = response.data;
    });

    TeamsService.teamsWithClub().then(function (response) {
        $scope.teams = response.data;
        if ($scope.teams.length) {
            $scope.curr.team = $scope.teams[0];
            $scope.getData();
        }
    });

    $scope.getData = function () {
        $scope.loading = true;
        GameRecordsService.getPlayerStats($scope.curr.team.id).then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
});