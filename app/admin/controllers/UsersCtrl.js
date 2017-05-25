'use strict';

angular.module('app.admin').controller('UsersController', function ($scope, UsersService) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.roles = [];
    $scope.loading = true;

    $scope.getRoles = function () {
        $scope.loading = true;
        UsersService.getRoles().then(function (response) {
            $scope.roles = response.data;
        });
    };
    $scope.getRoles();

    $scope.getData = function () {
        $scope.loading = true;
        UsersService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        var roles = [];
        angular.forEach($scope.currRow.roles, function (val, key) {
            if (val == '1') {
                roles[roles.length] = key;
            }
        });
        data.roles = ',' + roles.join(',') + ',';
        if (data.roles == ',,') data.roles = '';
        data.roles = data.roles.replace(/,,/i, ',');

        UsersService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $scope.currRow.roles = {};

        angular.forEach($scope.roles, function (val, key) {
            $scope.currRow.roles[key] = '0';
        });

        var roles = row.roles.substr(1, row.roles.length - 2) || '';
        roles = roles.split(",");
        angular.forEach(roles, function (val) {
            $scope.currRow.roles[val] = '1';
        });

        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            UsersService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };

    $scope.getRolesNum = function () {
        var cnt = 0;
        angular.forEach($scope.roles, function () {
            cnt ++;
        });
        return cnt;
    };

});