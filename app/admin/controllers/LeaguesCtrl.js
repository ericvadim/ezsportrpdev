'use strict';

angular.module('app.admin').controller('LeaguesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.homeTeams = [];
    vm.awayTeams = [];
    vm.competitions = [];
    vm.tableData = [];
    vm.currRow = {};

    vm.getTeams = function () {
        $http.get(ServerURL + "teams/getallteams").then(function (response) {
            vm.homeTeams = response.data;
            vm.awayTeams = response.data;
        });
    };
    vm.getTeams();

    vm.getCompetitions = function () {
        $http.get(ServerURL + "competitions/get").then(function (response) {
            vm.competitions = response.data;
        });
    };
    vm.getCompetitions();

    vm.getData = function () {
        $http.get(ServerURL + "leagues/get").then(function (response) {
            vm.tableData = response.data;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "leagues/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
        });
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.addNew = function () {
        vm.currRow = {
            id: 0,
            competition_id: 0,
            home_team_id: 0,
            away_team_id: 0,
            start_date: '',
            status: 0,
            applied_date: '',
            accepted_flag: 0,
            paid_flag: 0,
            roster: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "leagues/delete?id=" + rowId).then(function (response) {
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