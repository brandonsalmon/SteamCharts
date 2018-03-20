/* global humanizeDuration */
/* global app */
/* global $ */
/* global _ */

app.controller('ChartController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {
    var self = this;

    $scope.refreshAccount = function () {
        $scope.data = [];
        $scope.perfectGames = [];
        $scope.playtime = 0;
        socket.emit('refresh account', $scope.steamId);
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
        var achievementTimes = [];
        var perfectAchievementTimes = [];
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
                        chartGames.push({ name: game.name, y: game.percent });

                        if (game.percent < 100) {
                            gameValues.push({ id: game.name, x: game.total - game.achieved, y: 100 / game.total });
                        }
                    }
                }
            }

            if (game.playtime_forever) {
                playtime += game.playtime_forever;
                pieTimes.push({ name: game.name, y: game.playtime_forever });

                if (game.achieved > 0) {
                    game.timePerAchievement = Math.ceil(game.playtime_forever / game.achieved);
                    achievementTimes.push({ name: game.name, y: game.timePerAchievement });

                    if (game.percent == 100) {
                        perfectAchievementTimes.push({ name: game.name, y: game.timePerAchievement });
                    }
                }
            }
        }

        $scope.perfectGames = perfectGames;
        $scope.playtime = playtime;
        $scope.overallPercent = gameTotal / gameCount;

        pieTimes = _.sortBy(pieTimes, function (game) { return game.y * -1; });
        var totalTime = 0;
        var renderPie = [];
        var other = 0;

        for (var pieIndex in pieTimes) {
            var pieGame = pieTimes[pieIndex];
            if (pieIndex < 10) {//pieGame.y / playtime > 0.01) {
                renderPie.push(pieGame);
            }
            else {
                other += pieGame.y;
            }

            totalTime += pieGame.y;
        }

        if (other > 0) {
            renderPie.push({ name: 'Other', y: other })
        }

        achievementTimes = _.sortBy(achievementTimes, function (game) { return game.y; });
        perfectAchievementTimes = _.sortBy(perfectAchievementTimes, function (game) { return game.y; });

        self.chart.series[0].setData(chartPercents);


        var series1 = [];
        var series2 = [];
        var series3 = [];
        var series4 = [];
        var filteredGames = _.filter($scope.data, function (game) {
            var showUnachieved = game.achieved > 0 || $scope.showUnachieved;
            var showUnplayed = game.playtime_forever > 0 || $scope.showUnplayed;
            var showPerfectOnly = game.percent == 100 || !$scope.showPerfectOnly;

            return showUnachieved && showUnplayed && showPerfectOnly;
        });
        var sortedGames = _.sortBy(filteredGames, function (game) { return game[$scope.sort]; });
        var categories = [];
        _.each(sortedGames, function (game) {
            series1.push({ y: game.percent });
            series2.push({ y: game.playtime_forever });
            series3.push({ y: game.achieved });
            series4.push({ y: game.total });
            categories.push(game.name);
        });

        self.chart2.series[0].setData(series1);
        self.chart2.series[1].setData(series2);
        self.chart2.series[2].setData(series3);
        self.chart2.series[3].setData(series4);
        self.chart2.xAxis[0].setCategories(categories);
        self.chart2.xAxis[0].update({ labels: { enabled: categories.length < 50 } });

        self.chart3.series[0].setData(gameValues);
        self.chart4.series[0].setData(renderPie);
        self.chart5.series[0].setData(achievementTimes);
        self.chart6.series[0].setData(perfectAchievementTimes);
    };

    $scope.getData = function () {
        $http.get('/data').success(function (data, status, headers, config) {
            $scope.data = data;
            $scope.recalculateCharts();
        }).error(function (data, status, headers, config) {
            $scope.data = [];
        });
    };
}]);