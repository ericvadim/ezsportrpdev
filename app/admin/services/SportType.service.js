(function () {
    'use strict';

    angular.module('app.admin')
        .factory('SportTypeService', ['$http', '$q', 'ServerURL', function ($http, $q, ServerURL) {
            return {
                get: function () {
                    var url = ServerURL + 'sports';
                    var deferred = $q.defer();
                    $http.get(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                save: function (data) {
                    var url = ServerURL + 'sports';
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: url,
                        headers: {'Content-Type': 'multipart/form-data'},
                        data: data
                    }).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    /*


                     $http.post(url, data, {}).then(function (res) {
                     deferred.resolve(res);
                     }, function (err) {
                     deferred.reject(err);
                     });*/
                    return deferred.promise;
                },
                delete: function (rowId) {
                    var deferred = $q.defer();
                    var url = ServerURL + 'sports/delete?id=' + rowId;
                    $http.get(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
            };
        }]);
})();