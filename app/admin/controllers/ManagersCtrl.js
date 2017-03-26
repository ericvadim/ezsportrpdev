'use strict';

angular.module('app.admin').controller('ManagersController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.currClubId = 0;
    vm.tableData = [];
    vm.currRow = {};

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
            if (vm.clubs.length) {
                vm.currClubId = vm.clubs[0].id;
                vm.getData();
            }
        });
    };
    vm.getClubs();

    vm.getData = function () {
        $http.get(ServerURL + "managers/get?club_id=" + vm.currClubId).then(function (response) {
            vm.tableData = response.data;
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        data['club_id'] = vm.currClubId;
        $http({
            method: 'POST',
            url: ServerURL + "managers/save",
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
            short_name: '',
            email: '',
            phone_cell: '',
            phone_home: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "managers/delete?id=" + rowId).then(function (response) {
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