'use strict';

angular.module('app.admin').controller('PlayersController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.teams = [];
    vm.persons = [];
    vm.personIds = [];
    vm.prePersonIds = [];
    vm.tableData = [];
    vm.positions = [];
    vm.currRow = {};
    vm.currClubId = 0;
    vm.currTeamId = 0;
    vm.loading = true;

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
            if (vm.clubs.length) {
                vm.currClubId = vm.clubs[0]['id'];
                vm.getTeams();
            }
        });
    };
    vm.getClubs();

    vm.getTeams = function () {
        vm.loading = true;
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

    vm.getPersons = function () {
        $http.get(ServerURL + "persons/get").then(function (response) {
            vm.persons = response.data;
        });
    };
    vm.getPersons();

    vm.getData = function () {
        vm.getPositions();
        $http.get(ServerURL + "players/get?team_id=" + vm.currTeamId).then(function (response) {
            vm.prePersonIds = vm.personIds = [];
            vm.tableData = response.data;
            for (var t in vm.tableData) {
                if (typeof vm.tableData[t] == 'object') {
                    vm.personIds[vm.personIds.length] = vm.getPersonById(vm.tableData[t].person_id);
                }
            }
            vm.prePersonIds = vm.personIds;
            vm.loading = false;
        });
    };

    vm.save = function () {
        var data = {
            id: vm.currRow['id'] || '',
            team_id: vm.currTeamId,
            person_id: vm.currRow['person_id'],
            identifier: vm.currRow['identifier'],
            player_number: vm.currRow['player_number'],
            position_id: vm.currRow['position_id']
        };
        vm.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "players/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
            vm.getData();
        });
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "players/delete?id=" + rowId).then(function (response) {
                if (response.data == true) {
                    vm.getData();
                } else {
                    alert('Failed to delete this row.');
                }
            });
        } else {
            vm.getData();
        }
    };

    vm.addPerson = function (item) {
        if (vm.prePersonIds.length < vm.personIds.length) {
            vm.currRow['person_id'] = item.id;
            vm.save();
        }
    };

    vm.removePerson = function (item) {
        vm.deleteRow($filter('filter')(vm.tableData, {person_id: item.id}, true)[0]['id']);
    };

    vm.getPersonById = function (personId) {
        return $filter('filter')(vm.persons, {id: personId}, true)[0];
    };

    vm.getPositionName = function (positionId) {
        if (positionId > 0) {
            var pos = $filter('filter')(vm.positions, {id: positionId}, true);
            if (typeof pos == 'object') {
                return (pos.length > 0) ? pos[0].position_name : '';
            } else {
                return '';
            }
        } else {
            return '';
        }
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });
});