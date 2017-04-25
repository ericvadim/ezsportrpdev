'use strict';

angular.module('app.admin').controller('SportsController', function ($scope, ServerURL, $http, $filter) {
    var vm = this;
    $scope.tableData = [];
    $scope.rowCollection = [];
    vm.currRow = {};
    vm.loading = true;

    vm.getData = function () {
        vm.loading = true;
        $http.get(ServerURL + "sports/get").then(function (response) {
            $scope.tableData = response.data;
            $scope.rowCollection = $scope.tableData;
            vm.loading = false;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        vm.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "sports/save",
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
            sport_name: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "sports/delete?id=" + rowId).then(function (response) {
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