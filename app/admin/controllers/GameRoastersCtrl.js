'use strict';

angular.module('app.admin').controller('GameRoastersController', function ($scope, TeamsService, GameSchedulesService, RoastersService) {
    $scope.teams = [];
    $scope.games = [];
    $scope.tableData = [];
    $scope.curr = {
        team: {},
        game: {}
    };
    $scope.loading = true;

    TeamsService.teamsWithClub().then(function (response) {
        $scope.teams = response.data;
        if ($scope.teams.length) {
            $scope.curr.team = $scope.teams[0];
            $scope.getGames();
        }
    });

    $scope.getGames = function () {
        GameSchedulesService.schedulesByTeam($scope.curr.team.id).then(function (response) {
            $scope.games = response.data;
            if ($scope.games.length) {
                $scope.curr.game = $scope.games[0];
                $scope.getData();
            }
        });
    };

    $scope.getData = function () {
        RoastersService.get($scope.curr.team.id, $scope.curr.game.id).then(function (response) {
            $scope.tableData = response.data;
            $scope.loading = false;
        });
    };

    $scope.save = function () {
        var data = {
            team_id: $scope.curr.team.id,
            game_id: $scope.curr.game.id,
            player_id: 3,
            is_captain: 3,
            is_starter: 3
        }
        RoastersService.save(data).then(function (response) {
            $scope.tableData = response.data;
            $scope.loading = false;
        });
    };
});