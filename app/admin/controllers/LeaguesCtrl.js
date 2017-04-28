'use strict';

angular.module('app.admin').controller('LeaguesController', function ($scope, $filter, LeaguesService, CompetitionsService, SeasonList, GroupLevels) {
    $scope.seasons = SeasonList;
    $scope.groupLevels = GroupLevels;

    $scope.currGroupLevels = {};
    $scope.competitions = [];

    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    CompetitionsService.get().then(function (response) {
        $scope.competitions = response.data;
    });


    $scope.getData = function () {
        $scope.loading = true;
        LeaguesService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        data['sport_id'] = $scope.currSportId;
        LeaguesService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        var now = new Date();
        var nowDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        $scope.currRow = {
            id: 0,
            competition_id: 0,
            season: 0,
            group_level: 0,
            home_team_id: 0,
            away_team_id: 0,
            start_date: nowDate,
            status: 0,
            applied_date: nowDate,
            accepted_flag: 0,
            paid_flag: 0,
            roster: ''
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $scope.changeCompetition();
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            LeaguesService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };

    $scope.getCompetitionById = function (competitionId) {
        return $filter('filter')($scope.competitions, {id: competitionId}, true)[0];
    };

    $scope.changeCompetition = function () {
        $scope.currGroupLevels = [];
        for (var g in $filter('filter')($scope.competitions, {id: $scope.currRow.competition_id}, true)[0]['group_levels']) {
            $scope.currGroupLevels[$scope.currGroupLevels.length] = g;
        }
    };
});