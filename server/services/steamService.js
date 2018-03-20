function steamService(steamApiService, gamesRepository) {
    var self = this;

    self.steamApiService = steamApiService;
    self.gamesRepository = gamesRepository;

    self.populate = function (steamId, gamePopulatedCallback) {
        var callback = function (result) {
            self.gamesRepository.storeGames(steamId, result.response);
            if (self.loadGamesRecursive(0, steamId, gamePopulatedCallback)) {
                self.gamesRepository.setPopulated(steamId, true);
            }
        }

        self.steamApiService.GetOwnedGames(steamId, callback)
    }

    self.loadGamesRecursive = function (index, steamId, gamePopulatedCallback) {
        var gamesCount = self.gamesRepository.getGamesCount(steamId);
        var game = self.gamesRepository.getGame(steamId, index);

        if (index < gamesCount) {
            var callback = function (result) {
                var gameName = 'App' + game.appid;
                var achievements = {
                    total: 0,
                    achieved: 0,
                    percent: 0
                };
                if (result.playerstats.success) {
                    gameName = result.playerstats.gameName;
                    if (result.playerstats.achievements) {
                        achievements = result.playerstats.achievements.reduce((prev, current) => {
                            var total = prev.total + 1;
                            var achieved = prev.achieved + current.achieved;
                            var percent = achieved / total * 100;

                            return {
                                total,
                                achieved,
                                percent
                            }
                        }, achievements);
                    }
                }
                var details = {
                    appid: game.appid,
                    gameName: gameName,
                    playtime: game.playtime_forever,
                    total: achievements.total,
                    achieved: achievements.achieved,
                    percent: achievements.percent
                };

                self.gamesRepository.storeGameDetails(steamId, index, details);
                var populated = self.gamesRepository.getGame(steamId, index);
                if (!gamePopulatedCallback(populated) || !self.loadGamesRecursive(index + 1, steamId, gamePopulatedCallback)) {
                    return false;
                }
            }

            self.steamApiService.GetPlayerAchievements(game.appid, steamId, callback);
        }
    }
}

module.exports = steamService;
