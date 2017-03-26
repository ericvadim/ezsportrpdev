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
            .state('app.admin.clubs', {
                url: '/clubs',
                data: {
                    title: 'Club Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/clubs.html',
                        controller: 'ClubsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.teams', {
                url: '/teams',
                data: {
                    title: 'Team Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/teams.html',
                        controller: 'TeamsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.players', {
                url: '/players',
                data: {
                    title: 'Player Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/players.html',
                        controller: 'PlayersController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.positions', {
                url: '/positions',
                data: {
                    title: 'Player Positions'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/positions.html',
                        controller: 'PositionsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.users', {
                url: '/users',
                data: {
                    title: 'User Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/users.html',
                        controller: 'UsersController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.coaches', {
                url: '/coaches',
                data: {
                    title: 'Coach Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/coaches.html',
                        controller: 'CoachesController',
                        controllerAs: 'vm'
                    }
                }
            })
        ;
    })
;
