"use strict";


angular.module('app.admin', ['ui.router'])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app.admin', {
                url: '/admin',
                data: {
                    title: 'Dashboard for administrator'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.referees', {
                url: '/referees',
                data: {
                    title: 'Referee Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/referees.html',
                        controller: 'RefereesController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.referee-grades', {
                url: '/referee-grades',
                data: {
                    title: 'Referee Grades Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/referee-grades.html',
                        controller: 'RefereeGradesController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.licenses', {
                url: '/licenses',
                data: {
                    title: 'License Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/licenses.html',
                        controller: 'LicensesController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.sports', {
                url: '/sports',
                data: {
                    title: 'Sport Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/sports.html',
                        controller: 'SportsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.fields', {
                url: '/fields',
                data: {
                    title: 'Field Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/fields.html',
                        controller: 'FieldsController',
                        controllerAs: 'vm'
                    }
                }
            })
        ;
    })
;
