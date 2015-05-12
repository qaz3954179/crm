var filters = angular.module('ReportApp.Filters', []);
filters.filter('percent', function () {
    return function (val) {
        return (val * 100).toFixed(2) + '%';
    };
});