"use strict";

angular.module('app.home', ['ui.router']).config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                root: {
                    templateUrl: 'app/home/views/home.html',
                    controller: 'HomeController'
                }
            }
        })
        .state('about', {
            url: '/about',
            views: {
                root: {
                    templateUrl: 'app/home/views/about.html',
                    controller: 'HomeAboutController'
                }
            }
        })
        .state('teams', {
            url: '/teams',
            views: {
                root: {
                    templateUrl: 'app/home/views/teams.html',
                    controller: 'HomeTeamsController'
                }
            }
        })
        .state('calendar', {
            url: '/calendar',
            views: {
                root: {
                    templateUrl: 'app/home/views/calendar.html',
                    controller: 'HomeCalendarController'
                }
            }
        })
        .state('news', {
            url: '/news',
            views: {
                root: {
                    templateUrl: 'app/home/views/news.html',
                    controller: 'HomeNewsController'
                }
            }
        })
});
