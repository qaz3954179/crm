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
                .then(function (data) {
                    var categories = [],
                        barArr = [],
                        lineArr = [];
                    for (var i = data.data.length - 1; i >= 0; i--) {
                        var d = data.data[i];
                        categories.push(d.date);
                        barArr.push(d.count);
                        lineArr.push(d.percent * 100);
                    }
                    reslove({
                        tooltip : {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        legend: {
                            data:['手机登陆用户', '手机登陆占比']
                        },
                        yAxis : [
                            {
                                type : 'value',
                                name : '手机登陆用户',
                                axisLabel : {
                                    formatter: '{value}'
                                }
                            },
                            {
                                type : 'value',
                                name : '手机登陆占比',
                                axisLabel : {
                                    formatter: '{value}%'
                                }
                            }
                        ],
                        xAxis : [
                            {
                                type : 'category',
                                data : categories
                            }
                        ],
                        series : [

                            {
                                name: '手机登陆用户',
                                type: 'bar',
                                data: barArr
                            },
                            {
                                name: '手机登陆占比',
                                type: 'line',
                                data: lineArr
                            }
                        ]
                    })
                }, function (err) {
                    reject({
                        xAxis : [
                            {
                                type : 'category',
                                data : []
                            }
                        ],
                        series : [

                            {
                                name: '手机登陆用户',
                                type: 'bar',
                                data: []
                            },
                            {
                                name: '手机登陆占比',
                                type: 'line',
                                data: []
                            }
                        ]
                    });
                });
            });
        }
    };
});