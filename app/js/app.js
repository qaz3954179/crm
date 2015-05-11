
var reportApp = angular.module('ReportApp', [
    'ui.router', 
    'ReportApp.Controllers',
    'ReportApp.Services',
    'ReportApp.Directives']);

reportApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/user/converage', '/user');
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
                controller: ['$scope', 'navbarObj', function ($scope, navbarObj) {
                    $scope.navbarList = navbarObj.data;
                }]
            }
        }
    }).state('index.user', {
        url: '/user',
        views: {
            'filter@index': {
                templateUrl: '/app/tpls/filter.html'
            },
            'category@index': {
                templateUrl: '/app/tpls/category.html',
                controller: 'CategoryCtrl'
            },
            'content@index': {
                templateUrl: '/app/tpls/user/content.html',
                controller: 'CategoryCtrl'
            },
            'conversion@index.user': {
                templateUrl: '/app/tpls/user/conversion.html',
                controller: 'ConversionCtrl'
            },
            'converage@index.user': {
                templateUrl: '/app/tpls/user/converage.html',
                controller: 'ConverageCtrl'
            }
        }
    });
}]);
