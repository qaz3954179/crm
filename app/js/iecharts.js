var iecharts = angular.module('ReportApp.iEcharts', []);
iecharts.provider('echartsProvider', function () {
    function getOption() {}

    var provider = {
        $get: function ($window) {
            var echarts = echarts || $window.echarts;
            function getEcharts(el, type) {
                var chart = echarts.init(el);
                var opt = getOption(type);
                chart.setOption(opt);
                return chart;
            }
            return {
                getEcharts: getEcharts
            };
        }
    };
    return provider;
});