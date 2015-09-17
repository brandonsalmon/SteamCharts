/* global app */
/* global $ */
/* global _ */

app.controller('ChartController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
    var self = this;

    $scope.data = [];
    $scope.steamId;

    $scope.linkAccount = function () {
        socket.emit('link account', $scope.steamId);
    };

    socket.on('gameUpdate', function (game) {
        $scope.data.push(game);
        $scope.recalculateCharts();
    });

    $scope.recalculateCharts = function () {
        var chartPercents = [];
        var chartGames = [];
        var gameValues = [];
        for (var a = 0; a <= 20; a++) {
            chartPercents.push({ x: a * 5, y: 0 });
        }

        var gameTotal = 0;
        var gameCount = 0;

        for (var i in $scope.data) {
            var game = $scope.data[i];

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
                        chartGames.push({ name: game.details.playerstats.gameName, y: game.percent });

                        if (game.percent < 100) {
                            gameValues.push({ id: game.details.playerstats.gameName, x: game.total - game.achieved, y: 100 / game.total });
                        }
                    }
                }
            }
        }

        $scope.overallPercent = gameTotal / gameCount;

        chartGames = _.sortBy(chartGames, function (game) { return game.y; });
        var chartGamesCategories = _.pluck(chartGames, 'name');

        self.chart.series[0].setData(chartPercents);
        self.chart2.xAxis[0].setCategories(chartGamesCategories);
        self.chart2.series[0].setData(chartGames);
        self.chart3.series[0].setData(gameValues);
    };

    $scope.getData = function () {
        $http.get('/data').success(function (data, status, headers, config) {
            $scope.data = data;
            $scope.recalculateCharts();
        }).error(function (data, status, headers, config) {
            $scope.data = [];
        });
    };

    $scope.initialize = function () {
        self.chart = $('#chart').highcharts({
            chart: {
                type: 'areaspline',
                inverted: false,
                backgroundColor: null
            },
            title: { text: 'Games by Completion' },
            series: [{ name: 'Number of games' }],
            xAxis: {
                min: 0,
                max: 100,
                labels: { format: '{value:,.0f}%' }
            }
        }).highcharts();
        self.chart2 = $('#chart2').highcharts({
            chart: { type: 'column'},
            series: [{ name: 'Percent of Achievements Earned' }],
            title: { text: 'Overall Completion' },
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
        self.chart3 = $('#chart3').highcharts({
            chart: { type: 'scatter', zoomType: 'x',
                backgroundColor: null },
            title: { text: 'Value per Achievement' },
            series: [{ name: 'Games' }],
            tooltip: {
                valueDecimals: 2,
                valueSuffix: '%'
            },
            xAxis: {
                title: { text: 'Remaining' },
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                title: { text: '% per achievement' },
                labels: { format: '{value:,.2f}%' },
                min: 0
            }
        }).highcharts();
    };
}]);