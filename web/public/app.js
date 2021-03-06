(function () {
    'use strict';
    var url = "http://localhost:8000/";
    angular.module('tilesandtasksapp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'ngRoute',
        'ngCookies',
        'ngStorage',
        'ngMessages',
        'ngSanitize',
        'formly',
        'formlyBootstrap',
    ])
        .service('API', function () {
            var static_base = url;
            var base_url = url;
            return {
                static: static_base,
                url: base_url
            };
        })

        .config([
            '$stateProvider',
            '$httpProvider',
            '$urlRouterProvider',
            '$ocLazyLoadProvider',
            '$locationProvider',
            'formlyConfigProvider',
            function ($stateProvider, $httpProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, formlyConfigProvider) {
                formlyConfigProvider.setType([
                    {
                        name: 'custom',
                        templateUrl: 'custom.html'
                    },
                    {
                        name: 'datetimepicker',
                        template: '<br><datetimepicker ng-model="model[options.key]" show-spinners="true" date-format="M/d/yyyy" date-options="dateOptions"></datetimepicker>',
                        wrapper: ['bootstrapLabel'],
                        defaultOptions: {
                            templateOptions: {
                                label: 'Time',
                                minDate: '04/01/2016'
                            }
                        }
                    }]);

                $ocLazyLoadProvider.config({
                    debug: false,
                    events: false
                });

                $urlRouterProvider.otherwise('/0/tiles');
                $locationProvider.html5Mode(true);


                $stateProvider
                    .state('site', {
                        'abstract': true,
                        template: '<div ui-view />'
                    })

                    .state('user', {
                        parent: 'site',
                        url: '/0',
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
                                        '/static/scripts/app/controllers/tiles.js'
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
                                        '/static/scripts/app/controllers/tasks.js'
                                    ]
                                });
                            }
                        }
                    });


            }])
})();
