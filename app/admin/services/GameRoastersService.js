(function () {
    'use strict';

    angular.module('app.admin')
        .factory('GameRoastersService', ['$http', '$q', 'ServerURL', function ($http, $q, ServerURL) {
            return {
                get: function (teamId, gameId) {
                    var url = ServerURL + 'game_roasters?team_id=' + teamId + '&game_id=' + gameId;
                    var deferred = $q.defer();
                    $http.get(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },
                save: function (data) {
                    var url = ServerURL + 'game_roasters';
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
                }
            };
        }]);
})();