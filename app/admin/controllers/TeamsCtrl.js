'use strict';

angular.module('app.admin').controller('TeamsController', function ($scope, $filter, TeamsService, SportsService, ClubsService) {
    $scope.sports = [];
    $scope.clubs = [];
    $scope.currClubId = 0;
    $scope.tableData = $scope.safeData = [];
    $scope.currRow = {};
    $scope.loading = true;

    SportsService.get().then(function (response) {
        $scope.sports = response.data;
    });

    ClubsService.get().then(function (response) {
        $scope.clubs = response.data;
        if ($scope.clubs.length) {
            $scope.currClubId = $scope.clubs[0].id;
            $scope.getData();
        }
    });

    $scope.getData = function () {
        $scope.loading = true;
        TeamsService.get($scope.currClubId).then(function (response) {
            $scope.tableData = $scope.safeData = response.data;
            for (var r in $scope.tableData) {
                $scope.tableData[r].image += '?' + Date.now();
            }
            $scope.loading = false;
        });
    };
    $scope.getData();

    $scope.save = function () {
        $scope.loading = true;
        var data = $scope.currRow;
        data['club_id'] = $scope.currClubId;
        TeamsService.save(data).then(function () {
            $('#myModal').modal('hide');
            $scope.getData();
        });
    };

    $scope.addRow = function () {
        $scope.currRow = {
            id: 0,
            club_id: 0,
            sport_id: 0,
            team_name: '',
            image: './styles/img/no.jpg'
        };
    };

    $scope.editRow = function (row) {
        $scope.currRow = JSON.parse(angular.toJson(row));
        $('#myModal').modal('show');
    };

    $scope.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $scope.loading = true;
            TeamsService.delete(rowId).then(function () {
                $scope.getData();
            });
        }
    };
    $scope.getSportById = function (sportId) {
        return $filter('filter')($scope.sports, {id: sportId}, true)[0];
    };
});