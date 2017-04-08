'use strict';

angular.module('app.admin').controller('FieldsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

    vm.getData = function () {
        vm.loading = true;
        $http.get(ServerURL + "fields/get").then(function (response) {
            vm.tableData = response.data;
            for (var i in vm.tableData) {
                vm.tableData[i].soccer = !!(vm.tableData[i].soccer * 1);
                vm.tableData[i].synthetic_turf = !!(vm.tableData[i].synthetic_turf * 1);
                vm.tableData[i].restrooms = !!(vm.tableData[i].restrooms * 1);
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
            url: ServerURL + "fields/save",
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
            field_name: '',
            soccer: 0,
            synthetic_turf: 0,
            restrooms: 0,
            location: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "fields/delete?id=" + rowId).then(function (response) {
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