'use strict';

angular.module('app.admin').controller('GameSchedulesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.fields = [];
    vm.homeTeams = [];
    vm.awayTeams = [];
    vm.tableData = [];
    vm.currRow = {};

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

    vm.getTeamById = function (teams, teamId) {
        return $filter('filter')(teams, {id: teamId}, true)[0];
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.addNew = function () {
        vm.currRow = {
            id: 0,
            sport_name: ''
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