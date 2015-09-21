/* global humanizeDuration */
/* global app */
/* global $ */
/* global _ */

app.controller('ChartController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
    var self = this;

    $scope.data = [];
    $scope.perfectGames = [];
    $scope.playtime = 0;
    $scope.steamId;

    $scope.linkAccount = function () {
        $scope.data = [];
        $scope.perfectGames = [];
        $scope.playtime = 0;
        socket.emit('link account', $scope.steamId);
    };

    $scope.filterMoment = function () {
        return humanizeDuration($scope.playtime * 60 * 1000);
    };

    socket.on('gameUpdate', function (game) {
        $scope.data.push(game);
        $scope.recalculateCharts();
    });

    socket.on('allGamesUpdate', function (games) {
        $scope.data = games;
        $scope.recalculateCharts();
    });

    $scope.recalculateCharts = function () {
        var chartGames = [];
        var chartPercents = [];
        var perfectGames = [];
        var pieTimes = [];
        var gameValues = [];
        for (var a = 0; a <= 20; a++) {
            chartPercents.push({ x: a * 5, y: 0 });
        }

        var gameTotal = 0;
        var gameCount = 0;
        var playtime = 0;

        for (var i in $scope.data) {
            var game = $scope.data[i];

            game.achieved = 0;
            game.total = 0;
            game.percent = 0;
            game.name = '';

            if (game.details && game.details.playerstats.success) {
                game.name = game.details.playerstats.gameName;
                for (var j in game.details.playerstats.achievements) {
                    var achievement = game.details.playerstats.achievements[j];

                    game.total++;

                    if (achievement.achieved) {
                        game.achieved++;
                    }
                }
                if (game.total > 0) {
                    game.percent = game.achieved / game.total * 100;

                    if (game.percent == 100) {
                        perfectGames.push(game);
                    }

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

            if (game.playtime_forever) {
                playtime += game.playtime_forever;
                pieTimes.push({name:game.name,y:game.playtime_forever});
            }
        }

        $scope.perfectGames = perfectGames;
        $scope.playtime = playtime;
        $scope.overallPercent = gameTotal / gameCount;

        pieTimes = _.sortBy(pieTimes, function (game) { return game.y *-1; });
        var totalTime = 0;
        var renderPie = [];
        var other = 0;
        _.each(pieTimes, function (game) {
            if (game.y/playtime > .02) {
                renderPie.push(game);
            } else {
                other += game.y;
             }
            totalTime += game.y;
        });
        if (other > 0) {
            renderPie.push({name:'Other', y: other})
         }

        chartGames = _.sortBy(chartGames, function (game) { return game.y; });
        var chartGamesCategories = _.pluck(chartGames, 'name');

        self.chart.series[0].setData(chartPercents);
        self.chart2.xAxis[0].setCategories(chartGamesCategories);
        self.chart2.series[0].setData(chartGames);
        self.chart3.series[0].setData(gameValues);
        self.chart4.series[0].setData(renderPie);
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
            plotOptions: { column: {
                pointPadding: 0,
                groupPadding: 0.1,
                borderWidth: 0,
                shadow: false}},
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
        self.chart4 = $('#chart4').highcharts({
            chart: { type: 'pie',
                backgroundColor: null },
            title: { text: 'Playtime' },
            tooltip: {
                pointFormatter: function () {return humanizeDuration(this.y * 60 * 1000); }
            },
            series: [{ name: 'Games' }]
        }).highcharts();
    };
}]);