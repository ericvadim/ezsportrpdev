'use strict';

angular.module('app.admin').controller('RefereeGradesController', function ($scope, $filter, RefereeGradeService, SportsService) {
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.sports = {};
    $scope.loading = true;

    SportsService.get().then(function (response) {
        $scope.sports = response.data;
        $scope.getData();
    });

    $scope.getData = function () {
        $scope.loading = true;
        RefereeGradeService.get().then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            $scope.loading = false;
        });
    };

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        RefereeGradeService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            identifier: '',
            grade_name: '',
            sport_types: ''
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            RefereeGradeService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };

    $scope.getSportLabels = function (sport_types) {
        var types = [];
        for (var type in sport_types) {
            if (type != "" && sport_types[type]) {
                types[types.length] = $filter('filter')($scope.sports, {id: type}, true)[0].sport_name;
            }
        }
        return types.join(', ');
    };
});