'use strict';

angular.module('app.admin').controller('SportsController', function ($scope, SportTypeService, $filter) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    SportTypeService.get();


    $scope.getData = function () {
        $scope.loading = true;
        $http.get(ServerURL + "sports/get").then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        var data = $scope.currRow;
        $scope.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "sports/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
        });
    };

    $scope.openModal = function (rowId) {
        $scope.editRow(rowId);
        $('#myModal').modal('show');
    };

    $scope.addNew = function () {
        $scope.currRow = {
            id: 0,
            sport_name: ''
        };
    };

    $scope.editRow = function (rowId) {
        $scope.currRow = $filter('filter')($scope.tableData, {id: rowId}, true)[0];
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            $http.get(ServerURL + "sports/delete?id=" + rowId).then(function (response) {
                if (response.data == true) {
                    $scope.getData();
                } else {
                    alert('Failed to delete this row.');
                }
            });
        }
    };
    $('#myModal').on('hidden.bs.modal', function () {
        $scope.getData();
    });
});