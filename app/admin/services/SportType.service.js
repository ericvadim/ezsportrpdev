(function () {
    'use strict';

    angular.module('app.admin')
        .factory('SportTypeService', ['$http', '$q', 'ServerURL', function ($http, $q, ServerURL) {
            return {
                get: function () {
                    console.log(234)
                    var url = ServerURL + 'users/login';
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
            };
        }]);
})();