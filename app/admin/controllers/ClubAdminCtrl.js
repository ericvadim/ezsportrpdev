'use strict';

angular.module('app.admin').controller('ClubAdminController', function ($scope, ServerURL, $http, $filter) {
    var vm = this;
    vm.clubs = [];
    vm.persons = [];
    vm.personIds = [];
    vm.prePersonIds = [];
    vm.tableData = [];
    vm.currRow = {};
    vm.currClubId = 0;
    vm.loading = true;

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
        vm.loading = true;
        $http.get(ServerURL + "club_admin/get?club_id=" + vm.currClubId).then(function (response) {
            vm.prePersonIds = vm.personIds = [];
            vm.tableData = response.data;
            for (var t in vm.tableData) {
                if (typeof vm.tableData[t] == 'object') {
                    vm.personIds[vm.personIds.length] = vm.getPersonById(vm.tableData[t].person_id);
                }
            }
            vm.prePersonIds = vm.personIds;
            vm.loading = false;
        });
    };

    vm.save = function () {
        var data = {
            id: vm.currRow['id'] || '',
            club_id: vm.currClubId,
            person_id: vm.currRow['person_id'],
            grade: vm.currRow['grade']
        };
        vm.loading = true;
        $http({
            method: 'POST',
            url: ServerURL + "club_admin/save",
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        }).then(function mySucces(/*response*/) {
            $('#myModal').modal('hide');
            vm.getData();
        });
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            $http.get(ServerURL + "club_admin/delete?id=" + rowId).then(function (response) {
                if (response.data == true) {
                    vm.getData();
                } else {
                    alert('Failed to delete this row.');
                }
            });
        } else {
            vm.getData();
        }
    };

    vm.addPerson = function (item) {
        if (vm.prePersonIds.length < vm.personIds.length) {
            vm.currRow['person_id'] = item.id;
            vm.save();
        }
    };

    vm.removePerson = function (item) {
        vm.deleteRow($filter('filter')(vm.tableData, {person_id: item.id}, true)[0]['id']);
    };

    vm.getPersonById = function (personId) {
        return $filter('filter')(vm.persons, {id: personId}, true)[0];
    };

    vm.openModal = function (rowId) {
        vm.editRow(rowId);
        $('#myModal').modal('show');
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    $('#myModal').on('hidden.bs.modal', function () {
        vm.getData();
    });

    //-------------------- Importing ----------------------------------------
    vm.importedRows = [];
    vm.importedCurrRows = [];
    vm.importedPager = {
        currentPage: 1,
        totalPages: 1,
        rowsInPage: 10,
        pages: []
    };

    $scope.uploadFile = function (files) {
        vm.loadingImportData = true;
        var fd = new FormData();
        fd.append("file", files[0]);

        $http.post(ServerURL + "club_admin/getjsonfromfile", fd, {
            withCredentials: false,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            vm.importedHeaders = response.headers;
            vm.importedRows = response.data;

            vm.importedPager.totalPages = Math.ceil(vm.importedRows.length / vm.importedPager.rowsInPage);
            vm.importedPager.currentPage = 1;
            vm.importedPager.pages = [];
            for (var p = 1; p <= vm.importedPager.totalPages; p++) {
                vm.importedPager.pages[vm.importedPager.pages.length] = p;
            }
            vm.setImportedPage();

            vm.loadingImportData = false;
        });
    };

    vm.import = function () {
        var data = vm.getCheckedImportedRows();
        if (data.length > 0) {
            vm.loadingImportData = true;
            $http({
                method: 'POST',
                url: ServerURL + "club_admin/import?club_id=" + vm.currClubId,
                headers: {'Content-Type': 'multipart/form-data'},
                data: data
            }).then(function mySucces(/*response*/) {
                $('#importModal').modal('hide');
                vm.getPersons();
                vm.getData();
                vm.loadingImportData = false;
            });
        } else {
            alert('Please choose one or more person for importing.');
        }
    };

    vm.getCurrentPageRows = function () {
        var start = (vm.importedPager.currentPage - 1) * vm.importedPager.rowsInPage;
        vm.importedCurrRows = [];
        for (var r = start; r < start + vm.importedPager.rowsInPage; r ++) {
            if (typeof vm.importedRows[r] != 'object') break;
            vm.importedCurrRows[vm.importedCurrRows.length] = vm.importedRows[r];
        }
    };

    vm.setImportedPage = function (pInd) {
        if (pInd > vm.importedPager.totalPages) return;
        vm.importedPager.currentPage = pInd || vm.importedPager.currentPage;
        vm.getCurrentPageRows();
    };

    vm.checkAll = function () {
        for (var i in vm.importedRows) {
            vm.importedRows[i].checked = vm.allCheck;
        }
    };
    vm.getCheckedImportedRows = function () {
        if (typeof vm.importedRows != 'object') return [];
        return $filter('filter')(vm.importedRows, {checked: true});
    };
});