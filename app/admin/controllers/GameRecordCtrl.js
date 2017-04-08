'use strict';

angular.module('app.admin').controller('GameRecordsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.games = [];
    vm.currGame = {};
    vm.currGameId = 0;
    vm.recordItems = [];
    vm.teams = [];
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

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
                vm.currGameId = vm.games[0]['id'];
                vm.currGame = vm.games[0];
                vm.getData();
            }
        });
    };
    vm.getGameSchedules();

    vm.getData = function () {
        vm.currGame = $filter('filter')(vm.games, {id: vm.currGameId}, true)[0];
        vm.loading = true;
        $http.get(ServerURL + "game_records/get?game_id=" + vm.currGameId).then(function (response) {
            vm.tableData = response.data;
            vm.loading = false;
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        data['game_id'] = vm.currGameId;
        data['team_id'] = vm.currGame[vm.currRow['team_cate']]['team_id'];
        vm.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "game_records/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
        });
    };

    vm.getRecordItemName = function (itemId) {
        return $filter('filter')(vm.recordItems, {id: itemId}, true)[0]['item_name'];
    };

    vm.getTeamName = function (teamId) {
        if (vm.currGame.home_team.team_id == teamId) {
            return vm.currGame.home_team.team_name;
        } else {
            return vm.currGame.away_team.team_name;
        }
    };

    vm.getPlayerName = function (teamId, playerId) {
        var players = [];
        if (vm.currGame.home_team.team_id == teamId) {
            players = vm.currGame.home_team.players;
        } else {
            players = vm.currGame.away_team.players;
        }
        var player = $filter('filter')(players, {id: playerId}, true)[0];
        if (typeof player != 'object') return "";
        return player['first_name'] + " " + player['last_name'];
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.addNew = function () {
        var now = new Date();
        vm.currRow = {
            team_cate: 'home_team',
            id: 0,
            player_id: vm.currGame['home_team']['players'][0].id,
            item_id: vm.recordItems[0].id,
            record_time: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
            reason: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
        if (vm.currGame.home_team.team_id == vm.currRow.team_id) {
            vm.currRow.team_cate = "home_team";
        } else {
            vm.currRow.team_cate = "away_team";
        }
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
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