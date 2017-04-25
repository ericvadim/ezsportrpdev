"use strict";


angular.module('app.mobile', ['ui.router'])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app.mobile', {
                url: '/dashboard',
                data: {
                    title: 'Dashboard for administrator'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/mobile/views/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'vm'
                    }
                }
            })
        ;
    })
;
