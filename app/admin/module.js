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
            .state('app.admin.clubadmin', {
                url: '/club-admin',
                data: {
                    title: 'Club Administrator Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/club-admin.html',
                        controller: 'ClubAdminController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.refereeGrades', {
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
            .state('app.admin.managers', {
                url: '/managers',
                data: {
                    title: 'Team Managers'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/managers.html',
                        controller: 'ManagersController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.competitions', {
                url: '/competitions',
                data: {
                    title: 'Competitions'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/competitions.html',
                        controller: 'CompetitionsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.leagues', {
                url: '/leagues',
                data: {
                    title: 'Leagues'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/leagues.html',
                        controller: 'LeaguesController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.gameSchedules', {
                url: '/game_schedules',
                data: {
                    title: 'Game Schedules'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/game-schedules.html',
                        controller: 'GameSchedulesController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.recordItems', {
                url: '/record-items',
                data: {
                    title: 'Record Items'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/record-items.html',
                        controller: 'RecordItemsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.gameRecords', {
                url: '/game-records',
                data: {
                    title: 'Game Records'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/game-records.html',
                        controller: 'GameRecordsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.refereeRecords', {
                url: '/referee-records',
                data: {
                    title: 'Referee Records'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/referee-records.html',
                        controller: 'RefereeRecordsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.persons', {
                url: '/persons',
                data: {
                    title: 'Person Management'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/persons.html',
                        controller: 'PersonsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.admin.importPersons', {
                url: '/import-persons',
                data: {
                    title: 'Import Person Data'
                },
                views: {
                    "content@app": {
                        templateUrl: 'app/admin/views/import-persons.html',
                        controller: 'ImportPersonsController'
                    }
                }
            })
        ;
    })
;
