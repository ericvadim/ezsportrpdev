"use strict";

angular.module('app.auth').controller('UserActivateCtrl',
    function ($scope, $rootScope, $state, UserService) {
        var vm = this;
        vm.loading = true;
        UserService.Activate($state.params.token)
            .then(function (res) {
                $state.go('login');
            })
            .catch(function (err) {
                vm.loading = false;
            })
            .finally(function () {
                vm.loading = false;
            });
    }
);
