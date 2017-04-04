'use strict';

angular.module('app.admin').controller('PersonsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.tableData = [];
    vm.currRow = {};

    vm.getData = function () {
        $http.get(ServerURL + "persons/get").then(function (response) {
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
        vm.currRow = {
            id: 0,
            first_name: '',
            last_name: '',
            short_name: '',
            birthday: '',
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
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
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