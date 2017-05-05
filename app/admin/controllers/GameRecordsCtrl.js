'use strict';

angular.module('app.admin').controller('GameRecordsController', function ($scope, $filter, $q, LeaguesService, GameSchedulesService, GameRecordsService, TeamsService, PlayersService, SeasonList, RecordItemsService, RecordReasons) {
    $scope.seasons = SeasonList;
    $scope.reasons = RecordReasons;
    $scope.leagues = [];
    $scope.recordItems = [];
    $scope.currLeague = {};
    $scope.games = [];
    $scope.currGame = {};
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.teams = [];
    $scope.loading = true;

    LeaguesService.getLeaguesWithCompetitions().then(function (response) {
        $scope.leagues = response.data;
        if ($scope.leagues.length) {
            $scope.currLeague = $scope.leagues[0];
            $scope.getGameSchedules();
        }
    });

    RecordItemsService.get().then(function (response) {
        $scope.recordItems = response.data;
    });

    $scope.getGameSchedules = function () {
        $scope.loading = true;
        GameSchedulesService.get($scope.currLeague.id).then(function (response) {
            $scope.games = response.data;
            if ($scope.games.length) {
                $scope.currGame = $scope.games[0];
                $scope.getData();
            }
            $scope.loading = false;
        });
    };

    $scope.getTeamsWithPlayers = function () {
        $q.all([
            TeamsService.oneTeamWithClub($scope.currGame['home_team_id']),
            TeamsService.oneTeamWithClub($scope.currGame['away_team_id']),
            PlayersService.playersWithPerson($scope.currGame['home_team_id']),
            PlayersService.playersWithPerson($scope.currGame['away_team_id'])
        ]).then(function (cursor) {
            $scope.teams = [cursor[0].data, cursor[1].data];
            $scope.teams[0]['players'] = cursor[2].data;        // players in home team.
            $scope.teams[1]['players'] = cursor[3].data;        // players in away team.
        });
    };

    $scope.getData = function () {
        $scope.loading = true;
        if ($scope.currGame) {
            GameRecordsService.get($scope.currGame.id).then(function (response) {
                $scope.tableData = $scope.safeData = response.data;
                $scope.loading = false;
                $scope.getTeamsWithPlayers();
            });
        } else {
            $scope.tableData = [];
            $scope.loading = false;
        }
    };

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        data['game_id'] = $scope.currGame.id;
        GameRecordsService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        var now = new Date();
        $scope.currRow = {
            id: 0,
            team_id: $scope.teams[0].id,
            item_id: $scope.recordItems[0]['id'],
            point: '1',
            player_id: $scope.teams[0].players[0].id,
            record_time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
            reason: 'SFP'
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            GameRecordsService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };

    $scope.getRecordItem = function (itemId) {
        return $filter('filter')($scope.recordItems, {id: itemId}, true)[0];
    };

    $scope.getCurrTeam = function () {
        return $filter('filter')($scope.teams, {id: $scope.currRow.team_id}, true)[0];
    };

});