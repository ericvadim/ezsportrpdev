'use strict';

angular.module('app.admin').controller('TeamsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.tableData = [];
    vm.currRow = {};

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
        });
    };
    vm.getClubs();

    vm.getData = function () {
        $http.get(ServerURL + "teams/get").then(function (response) {
            vm.tableData = response.data;
            for (var r in vm.tableData) {
                vm.tableData[r].image += '?' + Date.now();
            }
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "teams/save",
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
            club_id: '',
            team_name: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "teams/delete?id=" + rowId).then(function (response) {
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

    vm.getClubById = function (clubId) {
        return $filter('filter')(vm.clubs, {id: clubId}, true)[0];
    };
});