var controllers = angular.module('ReportApp.Controllers', ['ReportApp']);
controllers.controller('ConversionCtrl', function ($scope, $http, $state, $stateParams, ConversionService, categoryObj) {
    ConversionService.getDataByDay('2015-05-07').then(function (data) {
        var d = data.data;
        var sum = Math.max(d.uv || 1000, d.summary, d.registed, d.valided, d.huifu, d.firstRecharge, d.firstInvest, d.registedAndInvested);
        var opt = {
            series: [
            {
                data: [
                    {value: d.uv / sum * 100, name: '网站访问uv(' + (d.uv / sum * 100).toFixed(2) + '%)'},
                    {value: d.summary / sum * 100, name: '日活跃用户数(' + (d.summary / sum * 100).toFixed(2) + '%)'},
                    {value: d.registed / sum * 100, name: '注册用户数(' + (d.registed / sum * 100).toFixed(2) + '%)'},
                    {value: d.valided / sum * 100, name: '验证手机数(' + (d.valided / sum * 100).toFixed(2) + '%)'},
                    {value: d.huifu / sum * 100, name: '开通汇付(' + (d.huifu / sum * 100).toFixed(2) + '%)'},
                    {value: d.firstRecharge / sum * 100, name: '首次充值用户数(' + (d.firstRecharge / sum * 100).toFixed(2) + '%)'},
                    {value: d.firstInvest / sum * 100, name: '首次投资用户数(' + (d.firstInvest / sum * 100).toFixed(2) + '%)'},
                    {value: d.registedAndInvested / sum * 100, name: '注册且投资用户数(' + (d.registedAndInvested / sum * 100).toFixed(2) + '%)'},
                ]
            }
            ]
        };
        $scope.d = d;
        $scope.data = opt;
        $scope.refresh = true;
    });
    ConversionService.getDataAvg('2015-05-07').then(function (data) {
        $scope.avg = data.data;
    });
});
controllers.controller('CategoryCtrl', function ($scope, $http, $state, $stateParams, categoryObj) {
    $scope.categories = categoryObj.conversion;
});
controllers.controller('ConverageCtrl', function ($scope, $http, $state, $stateParams, ConverageService) {
    ConverageService.getData('2015-05-07')
    .then(function (data) {
        $scope.data = data;
        $scope.refresh = true;
    });
    
});