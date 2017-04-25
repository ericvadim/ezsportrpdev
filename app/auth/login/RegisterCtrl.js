"use strict";

angular.module('app.auth').controller('RegisterCtrl',
    function ($scope, $rootScope, $state, UserService) {
        var vm = this;
        vm.loading = false;

        vm.register = function register() {
            if (vm.form.signup.$invalid) return false;

            vm.submit = true;
            var param = {
                email : vm.email,
                password: vm.password,
                first_name: vm.first_name,
                last_name: vm.last_name
            };

            UserService.Register(param)
                .then(function (res) {

                })
                .catch(function (err) {
                    console.log(err);
                });
        };

    }
);
