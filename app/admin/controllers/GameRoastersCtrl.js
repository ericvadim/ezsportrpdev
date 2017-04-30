'use strict';

angular.module('app.admin').controller('GameRoastersController', function ($scope, $filter, TeamsService, GameSchedulesService, GameRoastersService) {
    $scope.teams = [];
    $scope.games = [];
    $scope.tableData = [];
    $scope.curr = {
        team: {},
        game: {}
    };
    $scope.preRowForCaptain = {};

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
        GameRoastersService.get($scope.curr.team.id, $scope.curr.game.id).then(function (response) {
            $scope.tableData = response.data;
            for (var t in $scope.tableData) {
                $scope.tableData[t]['is_captain'] = !!($scope.tableData[t]['is_captain'] * 1);
                $scope.tableData[t]['is_starter'] = !!($scope.tableData[t]['is_starter'] * 1);
            }
        });
    };

    $scope.save = function (row) {
        var data = {
            id: row.id,
            team_id: $scope.curr.team.id,
            game_id: $scope.curr.game.id,
            player_id: row.player_id,
            is_captain: row.is_captain ? 1 : 0,
            is_starter: row.is_starter ? 1 : 0
        };
        GameRoastersService.save(data).then(function (response) {
            $scope.getData();
        });
    };

    $scope.checkCaptain = function (row) {
        $scope.preRowForCaptain.is_captain = false;
        row.is_captain = !row.is_captain;
        $scope.preRowForCaptain = row;
        $scope.save(row);
    }

    $scope.getStartersCount = function () {
        return $filter('filter')($scope.tableData, {is_starter: true}).length;
    }
});