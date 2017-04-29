'use strict';

angular.module('app.admin').controller('GameSchedulesController', function ($scope, GameSchedulesService, LeaguesService, TeamsService, FieldsService, SeasonList, $q, $filter) {
    $scope.seasons = SeasonList;
    $scope.fields = [];
    $scope.teams = [];
    $scope.leagues = [];
    $scope.currLeague = {};
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    $q.all([FieldsService.get(), TeamsService.teamsWithClub(), LeaguesService.getLeaguesWithCompetitions()]).then(function (cursor) {
        $scope.fields = cursor[0].data;
        $scope.teams = cursor[1].data;
        $scope.leagues = cursor[2].data;
        if ($scope.leagues.length) {
            $scope.currLeague = $scope.leagues[0];
            $scope.getData();
        }
    });

    $scope.getData = function () {
        $scope.loading = true;
        GameSchedulesService.get($scope.currLeague.id).then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            for (var t in $scope.tableData) {
                $scope.tableData[t]['homeTeam'] = $filter('filter')($scope.teams, {id: $scope.tableData[t]['home_team_id']}, true)[0];
                $scope.tableData[t]['awayTeam'] = $filter('filter')($scope.teams, {id: $scope.tableData[t]['away_team_id']}, true)[0];
                $scope.tableData[t]['field'] = $filter('filter')($scope.fields, {id: $scope.tableData[t]['field_id']}, true)[0];
            }
            $scope.loading = false;
        });
    };

    $scope.save = function () {
        $scope.loading = true;
        var data = {
            'league_id': $scope.currLeague['id'],
            'id': $scope.currRow['id'],
            'game_name': $scope.currRow['game_name'],
            'home_team_id': ($scope.currRow['homeTeam'] ? $scope.currRow['homeTeam']['id'] : 0),
            'away_team_id': ($scope.currRow['awayTeam'] ? $scope.currRow['awayTeam']['id'] : 0),
            'game_date': $scope.currRow['game_date'],
            'start_time': $scope.currRow['start_time'],
            'arrival_time': $scope.currRow['arrival_time'],
            'duration': $scope.currRow['duration'],
            'field_id': ($scope.currRow['field'] ? $scope.currRow['field']['id'] : 0),
            'uniform': $scope.currRow['uniform']
        };
        GameSchedulesService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        var now = new Date();
        $scope.currRow = {
            id: 0,
            game_name: 'Game#' + $scope.tableData.length + 1,
            league_id: 0,
            home_team_id: 0,
            away_team_id: 0,
            game_date: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate(),
            start_time: now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds(),
            arrival_time: now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds(),
            duration: '',
            field_id: 0,
            uniform: ''
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            GameSchedulesService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});