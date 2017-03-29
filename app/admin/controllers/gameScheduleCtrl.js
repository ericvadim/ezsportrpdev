'use strict';

angular.module('app.admin').controller('GameSchedulesController', function (ServerURL, $http, $filter, SeasonList) {
    var vm = this;
    vm.seasons = SeasonList;
    vm.leagues = [];
    vm.fields = [];
    vm.homeTeams = [];
    vm.awayTeams = [];
    vm.tableData = [];
    vm.currRow = {};

    vm.getLeagues = function () {
        $http.get(ServerURL + "leagues/getwithinfo").then(function (response) {
            vm.leagues = response.data;
        });
    };
    vm.getLeagues();

    vm.getFields = function () {
        $http.get(ServerURL + "fields/get").then(function (response) {
            vm.fields = response.data;
        });
    };
    vm.getFields();

    vm.getTeams = function () {
        $http.get(ServerURL + "teams/getallteams").then(function (response) {
            vm.homeTeams = response.data;
            vm.awayTeams = response.data;
        });
    };
    vm.getTeams();

    vm.getData = function () {
        $http.get(ServerURL + "game_schedules/get").then(function (response) {
            vm.tableData = response.data;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "game_schedules/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
        });
    };

    vm.getLeagueNameById = function (leagueId) {
        if (leagueId > 0) {
            var league = $filter('filter')(vm.leagues, {id: leagueId}, true)[0];
            return league['competition_name'] + ' - ' + vm.seasons[league['season']] + '(' + league['start_date'] + ')';
        } else {
            return '-';
        }
    };

    vm.getTeamById = function (teams, teamId) {
        return $filter('filter')(teams, {id: teamId}, true)[0];
    };

    vm.getFieldById = function (fieldId) {
        return $filter('filter')(vm.fields, {id: fieldId}, true)[0];
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.addNew = function () {
        var now = new Date();
        var nowDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        // var nowTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        vm.currRow = {
            id: 0,
            league_id: 0,
            home_team_id: 0,
            away_team_id: 0,
            game_date: nowDate,
            start_time: '00:00:00',
            arrival_time: '00:00:00',
            duration: '',
            field_id: 0,
            uniform: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "game_schedules/delete?id=" + rowId).then(function (response) {
                if (response.data == true) {
                    vm.getData();
                } else {
                    alert('Failed to delete this row.');
                }
            });
        }
    };
    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });
});