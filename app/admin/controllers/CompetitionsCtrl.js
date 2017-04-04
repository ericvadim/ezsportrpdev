'use strict';

angular.module('app.admin').controller('CompetitionsController', function (ServerURL, $http, $filter, GroupLevels) {
    var vm = this;
    vm.groupLevels = GroupLevels;
    vm.tableData = [];
    vm.currRow = {};

    vm.getData = function () {
        $http.get(ServerURL + "competitions/get").then(function (response) {
            vm.tableData = response.data;
        });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        $http({
            method: 'POST',
            url: ServerURL + "competitions/save",
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
            competition_name: '',
            group_levels: {}
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "competitions/delete?id=" + rowId).then(function (response) {
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

    vm.getGroupLevelNames = function (groupLevels) {
        var names = [];
        for (var key in groupLevels) {
            if (key != "" && groupLevels[key]) {
                names[names.length] = vm.groupLevels[key];
            }
        }
        return names.join(', ');
    };
});