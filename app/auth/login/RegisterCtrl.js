"use strict";

angular.module('app.auth').controller('RegisterCtrl',
    function ($scope, $rootScope, $state, UserService) {
        var vm = this;
        vm.loading = false;
        vm.submit = false;

        vm.register = function () {
            vm.submit = true;

            if (vm.form.signup.$invalid) return false;

            var param = {
                email : vm.email,
                password: vm.password,
                first_name: vm.first_name,
                last_name: vm.last_name
            };
console.log(11);
            UserService.Register(param)
                .then(function (res) {
                    $state.go('congratulation');
                })
                .catch(function (err) {
                    console.log(err);
                });
        };
    }
);
