'use strict';

angular.module('app.admin').controller('GameRoastersController', function ($scope, $filter, TeamsService, GameSchedulesService, GameRoastersService) {
    $scope.teams = [];
    $scope.games = [];
    $scope.tableData = $scope.safeData = [];
    $scope.curr = {
        team: {},
        game: {}
    };
    $scope.preRowForCaptain = {};
    $scope.loading = true;

    TeamsService.teamsWithClub().then(function (response) {
        $scope.teams = response.data;
        if ($scope.teams.length) {
            $scope.curr.team = $scope.teams[0];
            $scope.getGames();
        }
    });

    $scope.getGames = function () {
        $scope.loading = true;
        GameSchedulesService.schedulesByTeam($scope.curr.team.id).then(function (response) {
            $scope.games = response.data;
            if ($scope.games.length) {
                $scope.curr.game = $scope.games[0];
                $scope.getData();
            } else {
                $scope.loading = false;
            }
        });
    };

    $scope.getData = function () {
        $scope.loading = true;
        GameRoastersService.get($scope.curr.team.id, $scope.curr.game.id).then(function (response) {
            $scope.loading = false;
            $scope.tableData = $scope.safeData = response.data;
            for (var t in $scope.tableData) {
                $scope.tableData[t]['is_captain'] = !!($scope.tableData[t]['is_captain'] * 1);
                $scope.tableData[t]['is_starter'] = !!($scope.tableData[t]['is_starter'] * 1);
            }
        });
    };

    $scope.save = function (row) {
        if ($scope.getStartersCount() < 12) {
            $scope.loading = true;
            var data = {
                id: row.id,
                team_id: $scope.curr.team.id,
                game_id: $scope.curr.game.id,
                player_id: row.player_id,
                is_captain: row.is_captain ? 1 : 0,
                is_starter: row.is_starter ? 1 : 0
            };
            GameRoastersService.save(data).then(function () {
                $scope.getData();
            });
        } else {
            alert("Roasters shouldn't be able to add more than 11 players");
            $scope.getData();
        }
    };

    $scope.checkCaptain = function (row) {
        $scope.preRowForCaptain.is_captain = false;
        row.is_captain = !row.is_captain;
        $scope.preRowForCaptain = row;
        $scope.save(row);
    }

    $scope.getStartersCount = function () {
        return $filter('filter')($scope.safeData, {is_starter: true}).length;
    }
});