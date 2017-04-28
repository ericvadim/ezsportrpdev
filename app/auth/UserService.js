(function () {
    'use strict';

    var isDebug = true;

    angular
        .module('app.auth')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q', 'ServerURL'];
    function UserService($http, $q, ServerURL) {
        var service = {};

        service.Login = Login;
        service.Register = Register;
        service.forgotPassword = forgotPassword;
        service.Activate = Activate;

        return service;

        function Login(email, password) {
            var params = {
                email: email,
                password: password
            };
            var url = ServerURL + 'users/login';
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
            var url = ServerURL + 'users/register';
            console.log(params);console.log(url);
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
            var url = ServerURL + 'users/resetPassword?email' + email;
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

        function Activate(token) {
            var params = {
                token: token
            };
            var url = ServerURL + '/users/activate';
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
    }

})();