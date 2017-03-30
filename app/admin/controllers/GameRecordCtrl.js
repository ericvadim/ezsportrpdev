'use strict';

angular.module('app.admin').controller('GameRecordsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.games = [];
    vm.recordItems = [];
    vm.currGame = {};
    vm.teams = [];
    vm.players = [];
    vm.tableData = [];
    vm.currRow = {};

    vm.getRecordItems = function () {
        $http.get(ServerURL + "record_items/get").then(function (response) {
            vm.recordItems = response.data;
        });
    };
    vm.getRecordItems();

    vm.getGameSchedules = function () {
        $http.get(ServerURL + "game_schedules/getgameschedules").then(function (response) {
            vm.games = response.data;
            if (vm.games.length) {
                vm.currGame = vm.games[0];
                vm.getData();
            }
        });
    };
    vm.getGameSchedules();

    vm.getData = function () {
        $http.get(ServerURL + "game_records/get?game_id=" + vm.currGame.id).then(function (response) {
            vm.tableData = response.data;
        });
        vm.setTeams();
    };

    vm.getPlayers = function () {
        $http.get(ServerURL + "players/get?team_id=" + vm.currRow.team_id).then(function (response) {
            vm.players = response.data;
            if (vm.players.length) {
                vm.currRow.player_id = vm.players[0].id;
            }
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "game_records/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
        });
    };

    vm.setTeams = function () {
        var currGame = $filter('filter')(vm.games, {id: vm.currGame.id}, true)[0];
        vm.teams = [{
            id: currGame.home_team_id,
            team_name: currGame.home_team_name
        },{
            id: currGame.away_team_id,
            team_name: currGame.away_team_name
        }];
        vm.getPlayers();
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.addNew = function () {
        var now = new Date();
        vm.currRow = {
            id: 0,
            team_id: vm.currGame.home_team_id,
            player_id: 0,
            item_id: vm.recordItems[0].id,
            record_time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
        vm.currRow.team_id = vm.currGame.home_team_id;
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "game_records/delete?id=" + rowId).then(function (response) {
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