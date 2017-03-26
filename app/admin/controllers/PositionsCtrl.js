'use strict';

angular.module('app.admin').controller('PositionsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.sportTypes = [];
    vm.currSportId = 0;
    vm.tableData = [];
    vm.currRow = {};

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
        $http.get(ServerURL + "positions/get?sport_id=" + vm.currSportId).then(function (response) {
            vm.tableData = response.data;
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        data['sport_id'] = vm.currSportId;
        $http({
            method: 'POST',
            url: ServerURL + "positions/save",
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
            position_name: '',
            short_name: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "positions/delete?id=" + rowId).then(function (response) {
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