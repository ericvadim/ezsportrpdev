'use strict';

angular.module('app.admin').controller('PlayersController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.positions = [];
    vm.clubs = [];
    vm.currClubId = 0;
    vm.teams = [];
    vm.currTeamId = 0;
    vm.currTeamSportId = 0;
    vm.tableData = [];
    vm.currRow = {};

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
            if (vm.clubs.length) {
                vm.currClubId = vm.clubs[0].id;
                vm.getTeams();
            }
        });
    };
    vm.getClubs();

    vm.getTeams = function () {
        $http.get(ServerURL + "teams/get?club_id=" + vm.currClubId).then(function (response) {
            vm.teams = response.data;
            if (vm.teams.length) {
                vm.currTeamId = vm.teams[0].id;
                vm.getData();
            }
        });
    };

    vm.getPositions = function () {
        var sportId = $filter('filter')(vm.teams, {id: vm.currTeamId}, true)[0]['sport_id'];    // gets sport type of the team.
        $http.get(ServerURL + "positions/get?sport_id=" + sportId).then(function (response) {
            vm.positions = response.data;
        });
    };

    vm.getData = function () {
        vm.getPositions();
        $http.get(ServerURL + "players/get?team_id=" + vm.currTeamId).then(function (response) {
            vm.tableData = response.data;
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        data['team_id'] = vm.currTeamId;
        $http({
            method: 'POST',
            url: ServerURL + "players/save",
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
            identifier: '',
            first_name: '',
            last_name: '',
            gender: 0,
            birthday: '',
            player_number: '',
            position_id: '',
            player_email: '',
            player_cell: '',
            emergency_cont_name: '',
            emergency_cont_num: '',
            emergency_cont_email: ''
        };
    };

    vm.getPositionById = function (positionId) {
        return $filter('filter')(vm.positions, {id: positionId}, true)[0];
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "players/delete?id=" + rowId).then(function (response) {
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