"use strict";

angular.module('app.auth').controller('LoginCtrl', function ($scope, $state, UserService) {
    var vm = this;
    vm.loading = false;

    vm.login = function () {
        if (vm.form.signin.$invalid) return false;
        vm.submit = true;

        UserService.Login(vm.email, vm.password)
            .then(function (res) {
                localStorage.token = res.data.user.token;
                $state.go('app.admin');
            })
            .catch(function (err) {
                console.log(err);
            });
    };
})
