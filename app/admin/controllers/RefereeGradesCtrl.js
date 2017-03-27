'use strict';

angular.module('app.admin').controller('RefereeGradesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.sports = [];
    vm.tableData = [];
    vm.currRow = {};

    vm.getSports = function () {
        $http.get(ServerURL + "sports/get").then(function (response) {
            vm.sports = response.data;
        });
    };
    vm.getSports();

    vm.getData = function () {
        $http.get(ServerURL + "grades/get").then(function (response) {
            vm.tableData = response.data;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "grades/save",
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
            grade_identifier: '',
            grade_name: '',
            sport_types: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "grades/delete?id=" + rowId).then(function (response) {
                if (response.data == true) {
                    vm.getData();
                } else {
                    alert('Failed to delete this row.');
                }
            });
        }
    };

    vm.getSportTypeLabels = function (sportTypes) {
        var types = [];
        for (var type in sportTypes) {
            if (type != "") {
                types[types.length] = $filter('filter')(vm.sports, {id: type}, true)[0].sport_name;
            }
        }
        return types.join(', ');
    };

    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });
});