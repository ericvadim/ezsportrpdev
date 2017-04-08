'use strict';

angular.module('app.admin').controller('PersonsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

    vm.getData = function () {
        $http.get(ServerURL + "persons/get").then(function (response) {
            vm.tableData = response.data;
            for (var r in vm.tableData) {
                vm.tableData[r].image += '?' + Date.now();
            }
            vm.loading = false;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        vm.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "persons/save",
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
        var now = new Date('1966-6-6');
        vm.currRow = {
            id: 0,
            first_name: '',
            last_name: '',
            short_name: '',
            birthday: now,
            gender: '',
            address: '',
            email: '',
            home_phone: '',
            cell_phone: '',
            contact_name: '',
            contact_email: '',
            contact_phone: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
        vm.currRow.birthday = new Date(vm.currRow.birthday);
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "persons/delete?id=" + rowId).then(function (response) {
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