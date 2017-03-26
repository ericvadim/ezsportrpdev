'use strict';

angular.module('app.admin').controller('CoachesController', function (ServerURL, $http, $filter, CoachTypes) {
    var vm = this;
    vm.coachTypes = CoachTypes;
    vm.teams = [];
    vm.currTeamId = '';
    vm.tableData = [];
    vm.currRow = {};

    vm.getTeams = function () {
        $http.get(ServerURL + "teams/get").then(function (response) {
            vm.teams = response.data;
            if (vm.teams.length) {
                vm.currTeamId = vm.teams[0].id;
                vm.getData();
            }
        });
    };
    vm.getTeams();

    vm.getData = function () {
        $http.get(ServerURL + "coaches/get?team_id=" + vm.currTeamId).then(function (response) {
            vm.tableData = response.data;
        });
    };


    vm.save = function () {
        var data = vm.currRow;
        data['team_id'] = vm.currTeamId;
        $http({
            method: 'POST',
            url: ServerURL + "coaches/save",
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
            first_name: '',
            last_name: '',
            birthday: '',
            home_phone: '',
            cell_phone: '',
            email: '',
            license: '',
            coach_type: 0
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "coaches/delete?id=" + rowId).then(function (response) {
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