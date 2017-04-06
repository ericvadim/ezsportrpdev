'use strict';

angular.module('app.admin').controller('RefereesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.persons = [];
    vm.personIds = [];
    vm.prePersonIds = [];
    vm.tableData = [];
    vm.currRow = {};

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
            if (vm.clubs.length) {
                vm.currClubId = vm.clubs[0]['id'];
                vm.getData();
            }
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
        $http.get(ServerURL + "referees/get?club_id=" + vm.currClubId).then(function (response) {
            vm.prePersonIds = vm.personIds = [];
            vm.tableData = response.data;
            for (var t in vm.tableData) {
                if (typeof vm.tableData[t] == 'object') vm.personIds[vm.personIds.length] = vm.tableData[t].person_id;
            }
            vm.prePersonIds = vm.personIds;
        });
    };

    vm.save = function () {
        var data = {
            id: vm.currRow['id'] || '',
            club_id: vm.currClubId,
            person_id: vm.currRow['person_id'],
            grade: vm.currRow['grade']
        };
        $http({
            method: 'POST',
            url: ServerURL + "referees/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
            vm.getData();
        });
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "referees/delete?id=" + rowId).then(function (response) {
                if (response.data == true) {
                    vm.getData();
                } else {
                    alert('Failed to delete this row.');
                }
            });
        }
    };

    vm.changePerson = function () {
        var diff = $(vm.personIds).not(vm.prePersonIds).get()[0];
        if (diff) {
            vm.currRow['person_id'] = diff;
            vm.save();
        } else {
            vm.deleteRow($filter('filter')(vm.tableData, {person_id: $(vm.prePersonIds).not(vm.personIds).get()[0]}, true)[0]['id']);
        }
    };

    vm.getPersonById = function (personId) {
        return $filter('filter')(vm.persons, {id: personId}, true)[0];
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });
});