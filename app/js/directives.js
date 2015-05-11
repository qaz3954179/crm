var directives = angular.module('ReportApp.Directives', []);
directives.directive('echarts', function () {
    return {
        restrict: 'AE',
        scope: {
            refresh: '@'
        },
        link: function (scope, element, attr) {
            scope.mychart = echarts.init(element[0]);
            switch (attr.type) {
                case 'funnel':
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
                            data : ['网站访问uv', '日活跃用户数', '注册用户数', '验证手机数', '开通汇付', '首次充值用户数', '首次投资用户数']
                        },
                        calculable : true,
                        series : [
                            {
                                name: '漏斗图',
                                type: 'funnel',
                                width: '60%',
                                data: [
                                    {value: 0, name: '网站访问uv'},
                                    {value: 0, name: '日活跃用户数'},
                                    {value: 0, name: '注册用户数'},
                                    {value: 0, name: '验证手机数'},
                                    {value: 0, name: '开通汇付'},
                                    {value: 0, name: '首次充值用户数'},
                                    {value: 0, name: '首次投资用户数'},
                                    {value: 0, name: '注册且投资用户数'}
                                ]
                            }
                        ]
                    };
                    break;
                case 'bar_line':
                    var opt = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        legend: {
                            data:['手机登陆用户','手机登陆占比']
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ['']
                            }
                        ],
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
                                    formatter: '{value} %'
                                }
                            }
                        ],
                        series : [

                            {
                                name:'手机登陆用户',
                                type:'bar',
                                data:['']
                            },
                            {
                                name:'手机登陆占比',
                                type:'line',
                                data:['']
                            }
                        ]
                    };
                    break;
            }
                    
            scope.mychart.setOption(opt);
            var watch = scope.$watch('refresh', function (newValue, oldValue, scope) {
                if (newValue != oldValue && scope.$parent.data) {
                    var d = scope.$parent.data;
                    scope.mychart.setOption(d);
                    //watch();
                }
            });
        }
    };
});

directives.directive('datepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.find('input').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayHighlight: true
            });

            element.find('button').on('click', function () {
                alert('search');
            });
        }
    };
});