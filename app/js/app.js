
var reportApp = angular.module('ReportApp', [
    'ui.router', 
    'ReportApp.Controllers',
    'ReportApp.Services',
    'ReportApp.Directives',
    'ReportApp.Filters']);

reportApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .when('/user/{path:.*}', '/user')
        .when('/trade/{path:.*}', '/trade');

    $stateProvider.state('index', {
        abstract: true,
        resolve: {
            navbarObj: function ($http) {
                return $http({
                    method: 'GET',
                    url: '/app/data/navbar.json'
                });
            },
            categoryObj: function ($http, $q) {
                return $http.get('/app/data/categories.json')
                        .then(function (res) {
                            return $q(function (resove, reject) {
                                if (res.status == 200) {
                                    resove(res.data);
                                } else {
                                    reject([]);
                                }
                            });
                        });
            }
        },
        views: {
            '': {
                templateUrl: '/app/tpls/main.html'
            },
            'navbar': {
                templateUrl: '/app/tpls/navbar.html',
                controller: ['$scope', '$state', 'navbarObj', function ($scope, $state, navbarObj) {
                    var list = [];
                    $.each(navbarObj.data, function (index, val) {
                        if (val.url === $state.current.name) {
                            $.extend(val, {
                                active: 'active'
                            });
                        }
                        list.push(val);
                    })
                    $scope.navbarList = list;
                }]
            }
        }
    }).state('index.user', {
        url: '/user?date',
        views: {
            'filter@index': {
                templateUrl: '/app/tpls/filter.html',
                controller: 'FilterCtrl'
            },
            'category@index': {
                templateUrl: '/app/tpls/category.html',
                controller: 'CategoryCtrl'
            },
            'content@index': {
                templateUrl: '/app/tpls/content.html',
                controller: 'CategoryCtrl'
            },
            'conversion@index.user': {
                templateUrl: '/app/tpls/user/conversion.html',
                controller: 'ConversionCtrl'
            },
            'converage@index.user': {
                templateUrl: '/app/tpls/user/converage.html',
                controller: 'ConverageCtrl'
            },
            'dataPerDay@index.user': {
                template: '<h1>UV:{{d.uv}}</h1>',
                controller: function ($scope) {
                    $scope.d = {
                        uv: 25000
                    };
                }
            }
        }
    }).state('index.trade', {
        url: '/trade?date',
        views: {
            'filter@index': {
                templateUrl: '/app/tpls/filter.html',
                controller: 'FilterCtrl'
            },
            'category@index': {
                templateUrl: '/app/tpls/category.html',
                controller: 'CategoryCtrl'
            },
            'content@index': {
                templateUrl: '/app/tpls/content.html',
                controller: 'CategoryCtrl'
            },
            'p2p@index.trade': {
                templateUrl: '/app/tpls/trade/p2p.html',
                controller: 'P2PCtrl'
            }
        }
    });
}]);
