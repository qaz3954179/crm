var controllers = angular.module('ReportApp.Controllers', ['ReportApp', 'ReportApp.Filters']);
controllers.controller('FilterCtrl', function ($scope, $state, $stateParams) {
    $scope.url = $state.$current.url.sourcePath;
    var date = $stateParams.date || moment().format('YYYY-MM-DD');
    $scope.date = date;
    $scope.search = function (date) {
        $state.go('index.user', {
            date: date
        });
    };
    $scope.update = function (date) {
        $scope.date = date;
    };
});
controllers.controller('CategoryCtrl', function ($scope, $http, $state, $stateParams, categoryObj) {
    $scope.categories = categoryObj[$state.current.name.replace('index.', '')];
});
controllers.controller('ConversionCtrl', function ($scope, $http, $state, $stateParams, ConversionService, categoryObj) {
    var date = $stateParams.date || moment().format('YYYY-MM-DD');
    ConversionService.getDataByDay(date).then(function (data) {
        var d = data.data;
        var sum = Math.max(d.uv || 1000, d.summary, d.registed, d.valided, d.huifu, d.firstRecharge, d.firstInvest, d.registedAndInvested);
        var opt = {
            title : {
                text: '漏斗图',
                subtext: '全站用户注册转化'
            },
            tooltip : {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}%'
            },
            toolbox: {
                show : true,
                feature : {
                    saveAsImage : {show: true}
                }
            },
            legend: {
                data : ['网站访问uv', '日活跃用户数', '注册用户数', '验证手机数', '开通汇付', '首次充值用户数', '首次投资用户数', '注册且投资用户数']
            },
            calculable : true,
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    width: '60%',
                    data: [
                        {
                            value: (d.uv / sum * 100).toFixed(2),
                            name: '网站访问uv'
                        }, {
                            value: (d.summary / sum * 100).toFixed(2),
                            name: '日活跃用户数'
                        }, {
                            value: (d.registed / sum * 100).toFixed(2),
                            name: '注册用户数'
                        }, {
                            value: (d.valided / sum * 100).toFixed(2),
                            name: '验证手机数'
                        }, {
                            value: (d.huifu / sum * 100).toFixed(2),
                            name: '开通汇付'
                        }, {
                            value: (d.firstRecharge / sum * 100).toFixed(2),
                            name: '首次充值用户数'
                        }, {
                            value: (d.firstInvest / sum * 100).toFixed(2),
                            name: '首次投资用户数'
                        }, {
                            value: (d.registedAndInvested / sum * 100).toFixed(2),
                            name: '注册且投资用户数'
                        }
                   ]
                }
            ]
        };
        $scope.d = d;
        $scope.data = opt;
        $scope.refresh = true;
    });
    ConversionService.getDataAvg(date).then(function (data) {
        $scope.avg = data.data;
    });
});
controllers.controller('ConverageCtrl', function ($scope, $http, $state, $stateParams, ConverageService) {
    var date = $stateParams.date || moment().format('YYYY-MM-DD');
    ConverageService.getData(date)
    .then(function (data) {
        var categories = [],
            barArr = [],
            lineArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var d = data.data[i];
            categories.push(d.date);
            barArr.push(d.count);
            lineArr.push(d.percent * 100);
        }
        var opt = {
            tooltip : {
                trigger: 'axis',
                formatter: '{a0} : {c0} <br/>{a1} : {c1}%'
            },
            toolbox: {
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
                    data : categories,
                    axisLabel: {
                        rotate: 45
                    }
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
                    yAxisIndex: 1,
                    data: lineArr
                }
            ]
        };
        $scope.data = opt;
        $scope.refresh = true;
    }, function (err) {
        $scope.data = {};
    });
    
});

controllers.controller('P2PCtrl', function ($scope, $http,  $state, $stateParams) {
    $scope.d = {};
})