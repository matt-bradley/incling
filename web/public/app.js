(function () {
    'use strict';
    var url = "127.0.0.1:8000/";
    angular.module('tilesandtasksapp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'ngRoute',
        'ngCookies',
        'ngStorage',
        'ngMessages',
        'ngSanitize'
    ])
        .service('API', function () {
            var static_base = url;
            var base_url = url;
            return {
                static: static_base,
                url: base_url
            };
        })
        .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider',
            function ($stateProvider, $httpProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
                $ocLazyLoadProvider.config({
                    debug: false,
                    events: false
                });

                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(true);


                $stateProvider
                    .state('site', {
                        'abstract': true,
                        template: '<div ui-view />'
                    })

                    .state('user', {
                        parent: 'site',
                        url: '/',
                        views: {
                            'content@': {
                                template: '<div ui-view="appContent"></div>'
                            }
                        },
                        resolve: {
                            loadMyFile: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'tilesandtasksapp',
                                    files: [
                                        'static/scripts/app/services/TilesService.js'
                                    ]
                                });
                            }
                        }
                    })
                    .state('user.tiles', {
                        views: {
                            'appContent@user': {
                                templateUrl: 'static/views/app/tiles.html',
                                controller: 'TilesCtrl'
                            }
                        },
                        url: '/tiles',
                        resolve: {
                            loadMyFile: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'tilesandtasksapp',
                                    files: [
                                        'static/scripts/app/controllers/tiles.js'
                                    ]
                                });
                            }
                        }
                    })
                    .state('user.tasks', {
                        views: {
                            'appContent@user': {
                                templateUrl: 'static/views/app/tasks.html',
                                controller: 'TasksCtrl'
                            }
                        },
                        url: '/tiles',
                        resolve: {
                            loadMyFile: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'tilesandtasksapp',
                                    files: [
                                        'static/scripts/app/controllers/tasks.js'
                                    ]
                                });
                            }
                        }
                    });


            }])
})();
