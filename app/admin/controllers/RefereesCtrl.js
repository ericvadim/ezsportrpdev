'use strict';

angular.module('app.admin').controller('RefereesController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.persons = [];
    vm.refereeIds = [];
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
            vm.tableData = response.data;
        });
    };

    vm.save = function () {
        var data = {
            club_id: vm.currClubId,
            person_id: vm.currRow['id'],
            grade: vm.currRow['grade']
        };
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

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.persons, {id: rowId}, true)[0];
    };
    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });

    vm.getPerson = function (personId) {
        return $filter('filter')(vm.persons, {id: personId}, true)[0];
    };
});