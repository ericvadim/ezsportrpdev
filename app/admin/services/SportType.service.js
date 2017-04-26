(function () {
    'use strict';

    angular.module('app.admin')
        .factory('SportTypeService', ['$http', '$q', 'ServerURL', function ($http, $q, ServerURL) {
            return {
                get: function () {
                    var url = ServerURL + 'sports/get';
                    var deferred = $q.defer();
                    $http.get(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                save: function (data) {
                    var url = ServerURL + 'sports/save';

                    /*$http({
                     method: 'POST',
                     url: ServerURL + "sports/save",
                     headers: {'Content-Type': 'multipart/form-data'},
                     data: data
                     }).then(function mySucces(/!*response*!/) {
                     $('#myModal').modal('hide');
                     });*/

                    var promise = $http.post(url, data), deferred = $q.defer();
                    promise.then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                delete: function (rowId) {
                    var url = ServerURL + 'sports/delete?id=' + rowId;
                    var promise = $http.get(url), deferred = $q.defer();
                    promise.then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
            };
        }]);
})();