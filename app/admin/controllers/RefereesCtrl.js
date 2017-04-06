'use strict';

angular.module('app.admin').controller('RefereesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.persons = [];
    vm.refereeIds = ["44","49","51","52"];
    vm.tableData = [];
    vm.currRow = {};

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
        });
    };
    vm.getClubs();

    vm.getPersons = function () {
        $http.get(ServerURL + "persons/get").then(function (response) {
            vm.persons = response.data;
        });
    };
    vm.getPersons();

    vm.getData = function () {
        $http.get(ServerURL + "referees/get").then(function (response) {
            vm.tableData = response.data;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "referees/save",
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
            grade: '',
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
            for (var r in vm.refereeIds) {
                if (refereeIds[r] == rowId) {
                    break;
                }
            }
        }
    };
    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });

    vm.getPerson = function (personId) {
        return $filter('filter')(vm.persons, {id: personId}, true)[0];
    };
});