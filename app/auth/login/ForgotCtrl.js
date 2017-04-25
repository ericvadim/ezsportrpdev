"use strict";

angular.module('app.auth').controller('ForgotPasswordCtrl', function ($scope, $state, UserService) {
    var vm = this;
    vm.loading = false;

    vm.doReset = function () {
        if (vm.form.forgot.$invalid) return false;
        vm.submit = true;

        UserService.forgotPassword(vm.email)
            .then(function (res) {
                $state.go('login');
            })
            .catch(function (err) {
                console.log(err);
            });
    };
})
