(function () {
    'use strict';

    angular.module('app.admin')
        .factory('PersonsService', ['$http', '$q', 'ServerURL', function ($http, $q, ServerURL) {
            return {
                get: function (divisionId) {
                    var url = ServerURL + 'persons?division=' + divisionId;
                    var deferred = $q.defer();
                    $http.get(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                save: function (data) {
                    var url = ServerURL + 'persons';
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
                    return deferred.promise;
                },
                delete: function (rowId) {
                    var deferred = $q.defer();
                    var url = ServerURL + 'persons?id=' + rowId;
                    $http.delete(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                getJsonFromFile: function (subId, pageId, fd) {
                    var deferred = $q.defer();
                    var url = ServerURL + 'persons/getjsonfromfile?sub_id='+subId+'&page_id='+pageId;
                    $http.post(url, fd, {
                        withCredentials: false,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        deferred.resolve(response);
                    }).error(function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                importData: function (subId, pageId, data) {
                    var deferred = $q.defer();
                    var url = ServerURL + 'persons/import?team_id='+subId+'&page_id='+pageId;
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
                    return deferred.promise;
                }
            };
        }]);
})();