'use strict';

angular.module('app.admin').controller('TeamsController', function (ServerURL, $http, $filter) {
    var vm = this;
    vm.sports = [];
    vm.clubs = [];
    vm.currClubId = 0;
    vm.tableData = [];
    vm.currRow = {};

    vm.getSports = function () {
        $http.get(ServerURL + "sports/get").then(function (response) {
            vm.sports = response.data;
        });
    };
    vm.getSports();

    vm.getClubs = function () {
        $http.get(ServerURL + "clubs/get").then(function (response) {
            vm.clubs = response.data;
            if (vm.clubs.length) {
                vm.currClubId = vm.clubs[0].id;
                vm.getData();
            }
        });
    };
    vm.getClubs();

    vm.getData = function () {
        $http.get(ServerURL + "teams/get?club_id=" + vm.currClubId).then(function (response) {
            vm.tableData = response.data;
            for (var r in vm.tableData) {
                vm.tableData[r].image += '?' + Date.now();
            }
        });
    };

    vm.save = function () {
        var data = vm.currRow;
        data['club_id'] = vm.currClubId;
        $http({
            method: 'POST',
            url: ServerURL + "teams/save",
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
            club_id: 0,
            sport_id: 0,
            team_name: '',
            image: './styles/img/no.jpg'
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            $http.get(ServerURL + "teams/delete?id=" + rowId).then(function (response) {
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

    vm.getSportById = function (sportId) {
        return $filter('filter')(vm.sports, {id: sportId}, true)[0];
    };
});