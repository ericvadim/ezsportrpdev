"use strict";

angular.module('app.auth', [
    'ui.router'
//        ,
//        'ezfb',
//        'googleplus'
]).config(function ($stateProvider
//        , ezfbProvider
//        , GooglePlusProvider
    ) {
//        GooglePlusProvider.init({
//            clientId: authKeys.googleClientId
//        });
//
//        ezfbProvider.setInitParams({
//            appId: authKeys.facebookAppId
//        });

    $stateProvider.state('login', {
        url: '/login',
        views: {
            root: {
                templateUrl: 'app/auth/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            }
        },
        data: {
            title: 'Login',
            htmlId: 'extr-page'
        },
        resolve: {
            srcipts: function(lazyScript){
                return lazyScript.register([
                    'build/vendor.ui.js'
                ])

            }
        }
    })

    .state('register', {
        url: '/register',
        views: {
            root: {
                templateUrl: 'app/auth/views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            }
        },
        data: {
            title: 'Register',
            htmlId: 'extr-page'
        },
        resolve: {
            srcipts: function(lazyScript){
                return lazyScript.register([
                    'build/vendor.ui.js'
                ])

            }
        }
    })
    .state('forgotPassword', {
        url: '/forgot-password',
        views: {
            root: {
                templateUrl: 'app/auth/views/forgot-password.html',
                controller: 'ForgotPasswordCtrl',
                controllerAs: 'vm'
            }
        },
        data: {
            title: 'Forgot Password',
            htmlId: 'extr-page'
        },
        resolve: {
            srcipts: function(lazyScript){
                return lazyScript.register([
                    'build/vendor.ui.js'
                ])

            }
        }
    })
    .state('userActivate', {
        url: '/userActivate/:token',
        views: {
            root: {
                templateUrl: 'app/auth/views/activate.html',
                controller: 'UserActivateCtrl',
                controllerAs: 'vm'
            }
        },
        data: {
            title: 'Activate',
            htmlId: 'extr-page'
        },
        resolve: {
            srcipts: function(lazyScript){
                return lazyScript.register([
                    'build/vendor.ui.js'
                ])

            }
        }
    })

    .state('congratulation', {
        url: '/congratulation',
        views: {
            root: {
                templateUrl: 'app/auth/views/congratulation.html'
            }
        },
        data: {
            title: 'Congratulation',
            htmlId: 'congratulation-page'
        }
    })

    .state('lock', {
        url: '/lock',
        views: {
            root: {
                templateUrl: 'app/auth/views/lock.html'
            }
        },
        data: {
            title: 'Locked Screen',
            htmlId: 'lock-page'
        }
    })


}).constant('authKeys', {
    googleClientId: '',
    facebookAppId: ''
});
