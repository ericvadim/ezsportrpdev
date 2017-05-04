'use strict';

angular.module('app.admin').controller('RefereeSchedulesController', function ($scope, $filter, LeaguesService, GameSchedulesService, ClubsService, RefereesService, RefereeSchedulesService, AgeGroups) {
    $scope.pageType = "0";

    $scope.leagues = [];
    $scope.currLeague = {};

    $scope.clubs = [];
    $scope.currClub = {};

    $scope.games = [];
    $scope.currGame = {};

    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};

    $scope.statuses = ["Unconfirmed", "Confirmed", "Denied"];
    $scope.ageGroups = AgeGroups;

    $scope.loading = true;

    LeaguesService.getLeaguesWithCompetitions().then(function (response) {
        $scope.leagues = response.data;
    });
    ClubsService.get().then(function (response) {
        $scope.clubs = response.data;
    });

    $scope.getGames = function (gameId) {
        $scope.loading1 = true;
        GameSchedulesService.get($scope.currLeague.id).then(function (response) {
            $scope.games = response.data;
            if ($scope.games.length) {
                $scope.currGame = gameId == 0 ? $scope.games[0] : $filter('filter')($scope.games, {id: gameId}, true)[0];
            }
            $scope.loading1 = false;
        });
    };

    $scope.getReferees = function (refereeId) {
        $scope.loading1 = true;
        RefereesService.refereesWithPerson($scope.currClub.id).then(function (response) {
            $scope.referees = response.data;
            if ($scope.referees.length) {
                $scope.currReferee = refereeId == 0 ? $scope.referees[0] : $filter('filter')($scope.referees, {id: refereeId}, true)[0];
            }
            $scope.loading1 = false;
        });
    };

    $scope.getData = function () {
        $scope.loading = true;
        RefereeSchedulesService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        data['game_id'] = $scope.currGame.id;
        data['referee_id'] = $scope.currReferee.id;
        RefereeSchedulesService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            game_id: 0,
            referee_id: 0,
            status: '0'
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $scope.currLeague.id = row.league_id;
        $scope.currClub.id = row.club_id;
        $('#myModal').modal('show');
        $scope.getGames(row.game_id);
        $scope.getReferees(row.referee_id);
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            RefereeSchedulesService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
});