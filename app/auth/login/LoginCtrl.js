"use strict";

angular.module('app.auth').controller('LoginCtrl', function ($scope, $state, UserService) {
    var vm = this;
    vm.loading = false;

    vm.login = function () {
        if (vm.form.signin.$invalid) return false;
        vm.submit = true;

        UserService.Login(vm.email, vm.password)
            .then(function (res) {
                $state.go('app.admin.dashboard');
            })
            .catch(function (err) {
                console.log(err);
            });
    };
})
