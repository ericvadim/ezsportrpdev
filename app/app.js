'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

angular.module('app', [
    'ngSanitize',
    'ngAnimate',
    'restangular',
    'ui.router',
    'ui.bootstrap',

    // Smartadmin Angular Common Module
    'SmartAdmin',

    // Extra libraries
    'ui.select',
    'smart-table',
    'moment-picker',
    // 'highcharts-ng',

    // App
    'app.auth',
    'app.layout',
    //'app.chat',
    //'app.dashboard',
    //'app.calendar',
    //'app.inbox',
    'app.graphs',
    //'app.tables',
    'app.forms',
    //'app.ui',
    //'app.widgets',
    //'app.maps',
    //'app.appViews',
    //'app.misc',
    //'app.smartAdmin',
    //'app.eCommerce'
    'app.home',
    'app.admin'
])
    .config(function ($provide, $httpProvider, RestangularProvider, $locationProvider) {
        // Intercept for taking token.
        $provide.factory('tokenInjector', function ($q) {
            var sessionInjector = {
                request: function (config) {
                    if (localStorage.token) {
                        config.headers['x-auth-token'] = localStorage.token;
                    }
                    return config;
                }
            };
            return sessionInjector;
        });
        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            var errorCounter = 0;

            function notifyError(rejection) {
                var msgText = angular.isUndefined(rejection.data.message) ? rejection.data : rejection.data.message;
                $.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: msgText,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    number: ++errorCounter,
                    timeout: 6000
                });
            }

            return {
                // On request failure
                requestError: function (rejection) {
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        });

        $httpProvider.interceptors.push('tokenInjector');
        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');


        RestangularProvider.setBaseUrl(location.pathname.replace(/[^\/]+?$/, ''));

        /*$locationProvider.html5Mode({
         enabled: true,
         requireBase: false
         });*/

    })

    /*.config(['momentPickerProvider', function (momentPickerProvider) {
     momentPickerProvider.options({
     /!* Picker properties *!/
     locale:        'en',
     format:        'L LTS',
     minView:       'decade',
     maxView:       'minute',
     startView:     'year',
     autoclose:     true,
     today:         false,
     keyboard:      false,

     /!* Extra: Views properties *!/
     leftArrow:     '&larr;',
     rightArrow:    '&rarr;',
     yearsFormat:   'YYYY',
     monthsFormat:  'MMM',
     daysFormat:    'D',
     hoursFormat:   'HH:[00]',
     minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
     secondsFormat: 'ss',
     minutesStep:   5,
     secondsStep:   1
     });
     }])*/

    .run(function ($rootScope
        , $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';
    })
;