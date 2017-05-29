'use strict';

angular.module('app.home').controller('HomeTeamsController', function ($scope) {
    $scope.scheduleData = [1, 2, 3, 4, 5];
    $scope.recordItems = ['Goal', 'Assist', 'Passes', 'Tackles', 'Saves'];
    $scope.currRecordItem = {
        name: $scope.recordItems[0]
    };
});