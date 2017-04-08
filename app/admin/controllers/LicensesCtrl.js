'use strict';

angular.module('app.admin').controller('LicensesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.sportTypes = [];
    vm.currSportId = 0;
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

    vm.getSports = function () {
        $http.get(ServerURL + "sports/get").then(function (response) {
            vm.sportTypes = response.data;
            if (vm.sportTypes.length) {
                vm.currSportId = vm.sportTypes[0].id;
                vm.getData();
            }
        });
    };
    vm.getSports();

    vm.getData = function () {
        $http.get(ServerURL + "licenses/get?sport_id=" + vm.currSportId).then(function (response) {
            vm.tableData = response.data;
            vm.loading = false;
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        data['sport_id'] = vm.currSportId;
        vm.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "licenses/save",
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
            level: '',
            license_name: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "licenses/delete?id=" + rowId).then(function (response) {
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