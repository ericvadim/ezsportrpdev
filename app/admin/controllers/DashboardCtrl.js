'use strict';

angular.module('app.admin').controller('DashboardController', function ($scope) {

    $scope.teamData = [1, 2, 3, 4, 5];
    $scope.playerData = [1, 2, 3, 4, 5];
    $scope.scheduleData = [1, 2, 3, 4, 5];

    var data = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]
    }

    $scope.myChart = data;

});