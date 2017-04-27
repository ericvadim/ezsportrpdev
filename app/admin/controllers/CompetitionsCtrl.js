'use strict';

angular.module('app.admin').controller('CompetitionsController', function ($scope, CompetitionsService, GroupLevels) {
    $scope.groupLevels = GroupLevels;
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    $scope.getData = function () {
        $scope.loading = true;
        CompetitionsService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        CompetitionsService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            competition_name: '',
            group_levels: {}
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            CompetitionsService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };

    $scope.getGroupLevelNames = function (groupLevels) {
        var names = [];
        for (var key in groupLevels) {
            if (key != "" && groupLevels[key]) {
                names[names.length] = $scope.groupLevels[key];
            }
        }
        return names.join(', ');
    };
});