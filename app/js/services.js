var services = angular.module('ReportApp.Services', []);
services.factory('CategoryService', function ($http) {

    var requestUrl = function () {
        return $http({
            method: 'GET',
            url: '/app/data/categories.json'
        });
    };

    return {
        getCategory: function (id) {
            requestUrl().then(function (data) {
                return data.data[id];
            }, function (err) {
                return [];
            });
        }
    };
});
services.factory('ConversionService', function ($http, $q) {
    return {
        getDataByDay: function (date) {
            return $q(function (reslove, reject) {
                $http({
                    method: 'GET',
                    url: '/app/data/conversion.json?date=' + date
                })
                .then(reslove, reject);
            });
        },
        getDataAvg: function (date) {
            var start = moment(date);
            var end = moment(date);
            return $q(function (reslove, reject) {
                $http({
                    method: 'GET',
                    url: '/app/data/conversion.json?start=' + start + '&end=' + end
                })
                .then(reslove, reject);
            });
        }
    };
    
});
services.factory('ConverageService', function ($http, $q) {
    return {
        getData: function (date) {
            var start = moment(date);
            var end = moment(date);
            return $q(function (reslove, reject) {
                $http({
                    method: 'GET',
                    url: '/app/data/converage.json?start=' + start + '&end=' + end
                })
                .then(reslove, reject);
            });
        }
    };
});