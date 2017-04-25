"use strict";

angular.module('app.auth').controller('UserActivateCtrl',
    function ($scope, $rootScope, $state, UserService) {
        var vm = this;
        vm.loading = true;
        UserService.Activate($state.params.token)
            .then(function (res) {
                $state.go('app.admin.dashboard');
            })
            .catch(function (err) {
                console.log(err);
            });
    }
);
