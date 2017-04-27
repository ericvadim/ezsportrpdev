'use strict';

angular.module('app.admin').controller('LeaguesController1', function (ServerURL, $http, $filter, SeasonList, GroupLevels) {
    var vm = this;
    vm.seasons = SeasonList;
    vm.groupLevels = GroupLevels;
    vm.currGroupLevels = {};
    vm.competitions = [];
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

    vm.getCompetitions = function () {
        $http.get(ServerURL + "competitions/get").then(function (response) {
            vm.competitions = response.data;
        });
    };
    vm.getCompetitions();

    vm.getData = function () {
        vm.loading = true;
        $http.get(ServerURL + "leagues/get").then(function (response) {
            vm.tableData = response.data;
            vm.loading = false;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        vm.loading = true;
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

    vm.getCompetitionById = function (competitionId) {
        return $filter('filter')(vm.competitions, {id: competitionId}, true)[0];
    };

    vm.addNew = function () {
        var now = new Date();
        var nowDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        vm.currRow = {
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

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
        vm.changeCompetition();
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
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

    vm.changeCompetition = function () {
        vm.currGroupLevels = [];
        for (var g in $filter('filter')(vm.competitions, {id: vm.currRow.competition_id}, true)[0]['group_levels']) {
            vm.currGroupLevels[vm.currGroupLevels.length] = g;
        }
    };
});