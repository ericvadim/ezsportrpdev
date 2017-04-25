(function () {
    'use strict';

    var baseUrl = 'http://192.168.5.115/ezsportrpdev/server';
    var isDebug = true;

    angular
        .module('app.auth')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];
    function UserService($http, $q) {
        var service = {};

        service.Login = Login;
        service.Register = Register;
        service.forgotPasswo = forgotPassword;

        return service;

        function Login(email, password) {
            var params = {
                email: email,
                password: password
            };
            var url = baseUrl + '/users/login';
            var promise = $http.post(url, params), deferred = $q.defer();
            promise.then(function (res) {
                if (isDebug) console.log(res);
                deferred.resolve(res);
            }, function (err) {
                if (isDebug) console.error(err);
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function Register(params) {
            var url = baseUrl + '/users/register';
            var promise = $http.post(url, params), deferred = $q.defer();
            promise.then(function (res) {
                if (isDebug) console.log(res);
                deferred.resolve(res);
            }, function (err) {
                if (isDebug) console.error(err);
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function forgotPassword(email) {
            var url = baseUrl + '/users/resetPassword?email' + email;
            var promise = $http.get(url), deferred = $q.defer();
            promise.then(function (res) {
                if (isDebug) console.log(res);
                deferred.resolve(res);
            }, function (err) {
                if (isDebug) console.error(err);
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }

})();