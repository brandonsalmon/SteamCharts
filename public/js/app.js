var app = angular.module('steamCharts', []);

app.controller('ChartController', ['$scope', '$http', function ($scope, $http) {
    var self = this;

    $scope.data = 'N/A';

    $scope.initialize = function () {
        self.initializeChart();
        var chartPercents = [];
        var chartGames = [];
        for (var a = 0; a <= 20; a++) {
            chartPercents.push({ x: a * 5, y: 0 });
        }

        $http.get('/data').success(function (data, status, headers, config) {
            $scope.data = data;

            var gameTotal = 0;
            var gameCount = 0;

            for (var i in data.games) {
                var game = data.games[i];

                game.achieved = 0;
                game.total = 0;
                game.percent = 0;

                if (game.details && game.details.playerstats.success) {
                    for (var j in game.details.playerstats.achievements) {
                        var achievement = game.details.playerstats.achievements[j];

                        game.total++;

                        if (achievement.achieved) {
                            game.achieved++;
                        }
                    }
                    if (game.total > 0) {
                        game.percent = game.achieved / game.total * 100;

                        gameTotal += game.percent;
                        gameCount++;

                        chartPercents[Math.ceil(game.percent / 5)].y++;

                        if (game.percent > 0) {
                            chartGames.push({ name: game.details.playerstats.gameName, y: game.percent })
                        }
                    }
                }
            }

            $scope.overallPercent = gameTotal / gameCount;

            chartGames = _.sortBy(chartGames, function (game) { return game.y; });
            chartGamesCategories = _.pluck(chartGames, 'name');

            self.chart.series[0].setData(chartPercents);
            self.chart2.xAxis[0].setCategories(chartGamesCategories);
            self.chart2.series[0].setData(chartGames);
        }).error(function (data, status, headers, config) {
            $scope.data = '';
        });
    };

    self.initializeChart = function () {
        self.chart = $('#chart').highcharts({
            chart: {
                type: 'area',
                inverted: false
            },
            series: [{ name: 'Number of games' }],
            xAxis: {
                min: 0,
                max: 100,
                labels: { format: '{value:,.0f}%' }
            }
        }).highcharts();
        self.chart2 = $('#chart2').highcharts({
            chart: { type: 'column' },
            series: [{ name: 'Percent of Achievements Earned' }],
            tooltip: {
                valueDecimals: 0,
                valueSuffix: '%'
            },
            xAxis: {
                categories: [],
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                labels: { format: '{value:,.0f}%' }
            }
        }).highcharts();
    };
}]);