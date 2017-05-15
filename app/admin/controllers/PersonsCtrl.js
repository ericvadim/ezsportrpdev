'use strict';

angular.module('app.admin').controller('PersonsController', function (ServerURL, $filter, PersonsService) {
    var vm = this;
    vm.tableData = [];
    vm.currRow = {};
    vm.loading = true;

    vm.divisions = [
        {id: 1, title: 'All'},
        {id: 2, title: 'Players'},
        {id: 3, title: 'Coaches'},
        {id: 4, title: 'Team Managers'},
        {id: 5, title: 'Referees'},
        {id: 6, title: 'Unregistered'}
    ];
    vm.currDivision = vm.divisions[1];

    vm.pager = {
        pages: [],
        totalPages: 1,
        rowsInPage: 10,
        currentPage: 1
    };
    vm.currPageRows = [];
    vm.keyword = '';

    vm.changeDivision = function (div) {
        vm.currDivision = div;
    };

    vm.getCurrPageRows = function () {
        var start = (vm.pager.currentPage - 1) * vm.pager.rowsInPage;
        vm.currPageRows = [];
        for (var r = start; r < start + vm.pager.rowsInPage; r++) {
            if (typeof vm.tableData[r] != 'object') break;
            vm.currPageRows[vm.currPageRows.length] = vm.tableData[r];
        }
    };

    vm.setPage = function (pInd) {
        if (pInd > vm.pager.totalPages) return;
        vm.pager.currentPage = pInd || vm.pager.currentPage;
        vm.getCurrPageRows();
    };

    vm.getData = function () {
        vm.loading = true;
        PersonsService.get(vm.currDivision.id)
            .then(function (response) {
                vm.allRows = response.data;
                for (var r in vm.allRows) {
                    vm.allRows[r].image += '?' + Date.now();
                }
                vm.search();
                vm.loading = false;
            });
    };
    vm.getData();

    vm.save = function () {
        var data = vm.currRow;
        vm.loading = true;
        PersonsService.save(data)
            .then(function (response) {
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
            first_name: '',
            last_name: '',
            short_name: '',
            birthday: '',
            gender: '',
            address: '',
            email: '',
            home_phone: '',
            cell_phone: '',
            contact_name: '',
            contact_email: '',
            contact_phone: ''
        };
    };

    vm.editRow = function (rowId) {
        vm.currRow = $filter('filter')(vm.tableData, {id: rowId}, true)[0];
    };

    vm.deleteRow = function (rowId) {
        if (confirm('Are you sure want to delete this?')) {
            vm.loading = true;
            PersonsService.delete(rowId)
                .then(function (response) {
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

    vm.search = function () {
        vm.tableData = $filter('filter')(vm.allRows, vm.keyword);

        vm.pager.totalPages = Math.ceil(vm.tableData.length / vm.pager.rowsInPage);

        if (vm.pager.currentPage > vm.pager.totalPages) {
            vm.pager.currentPage = vm.pager.totalPages * 1;
        }

        for (var p = 1; p <= vm.pager.totalPages; p++) {
            vm.pager.pages[vm.pager.pages.length] = p;
        }
        vm.setPage();
    };
});