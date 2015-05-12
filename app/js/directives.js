var directives = angular.module('ReportApp.Directives', ['ReportApp', 'ReportApp.Filters']);
directives.directive('echarts', function () {
    return {
        restrict: 'AE',
        scope: {
            refresh: '@'
        },
        link: function (scope, element, attr) {
            scope.mychart = echarts.init(element[0]);
            scope.mychart.showLoading({
                text: '正在努力的读取数据中...'
            });
   
            var watch = scope.$watch('refresh', function (newValue, oldValue, scope) {
                if (newValue != oldValue && scope.$parent.data) {
                    var d = scope.$parent.data;
                    scope.mychart.hideLoading();
                    scope.mychart.setOption(d);
                    watch();
                }
            });
        }
    };
});

directives.directive('datepicker', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            'date': '=',
            'update': '&'
        },
        link: function (scope, element, attr) {
            element.datepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayHighlight: true
            }).on('changeDate', function (e) {
                scope.date = $('#search-input').val();
                var fn = $parse(scope.update);
                scope.$apply(function () {
                    fn(scope.date);
                });
            });
        }
    };
}]);
directives.directive('search', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            search: '&'
        },
        link: function (scope, element, attr) {
            element.bind('click', function (event) {
                var date = $('#search-input').val();
                var fn = $parse(scope.search);
                scope.$apply(function () {
                    event.stopPropagation();
                    event.preventDefault();
                    fn(date);
                });
            });
        }
    };
}]);