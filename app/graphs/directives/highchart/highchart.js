'use strict';

angular.module('app.graphs').directive('highchart', function () {
    return {
        restrict: 'A',
        scope: {
            id: '=',
            data: '='
        },
        link: function (scope, element, attributes) {
            $(element[0]).highcharts(scope.data);
            $(element[0]).resize(function () {
                $(element[0]).highcharts().reflow();
            });
        }
    }
});