'use strict';

angular.module('app.admin').controller('RefereeGradesController', function (ServerURL, $http, $filter) {
    var vm = this;
    /*vm.sports = [
        {id: 1, sport_name: 'Football'},
        {id: 2, sport_name: 'Soccer'},
        {id: 3, sport_name: 'Basketball'}
    ];*/

    vm.tableData = [];
    vm.currRow = {};

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
            /*vm.modal.close();
            vm.getData();*/
        });
    };

    vm.addNew = function () {
        vm.currRow = {
            id: 0,
            grade_identifier: '',
            grade_name: ''
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

});