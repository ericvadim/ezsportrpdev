'use strict';

angular.module('app.admin').controller('UsersController', function (ServerURL, $http, $filter, UserTypes) {
    var vm = this;
    vm.userTypes = UserTypes;
    vm.userFlags = ['No', 'Yes'];
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

    vm.getData = function () {
        vm.loading = true;
        $http.get(ServerURL + "users/get").then(function (response) {
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
            url: ServerURL + "users/save",
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
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            home_phone: '',
            cell_phone: '',
            user_type: 0,
            user_flag: 0
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "users/delete?id=" + rowId).then(function (response) {
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