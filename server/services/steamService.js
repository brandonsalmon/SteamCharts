function steamService(steamApiService, gamesRepository) {
    var self = this;

    self.steamApiService = steamApiService;
    self.gamesRepository = gamesRepository;

    self.populate = function (steamId, gamePopulatedCallback) {
        var callback = function (result) {
            self.gamesRepository.storeGames(steamId, result.response);
            self.loadGamesRecursive(0, steamId, gamePopulatedCallback);
        }

        self.steamApiService.GetOwnedGames(steamId, callback)
    }

    self.loadGamesRecursive = function (index, steamId, gamePopulatedCallback) {
        var gamesCount = self.gamesRepository.getGamesCount(steamId);

        if (index < gamesCount) {
            var callback = function (result) {
                self.gamesRepository.storeGameDetails(steamId, index, result);
                var game = self.gamesRepository.getGame(steamId, index);
                gamePopulatedCallback(game);
                self.loadGamesRecursive(index + 1, steamId, gamePopulatedCallback);
            }

            var game = self.gamesRepository.getGame(steamId, index);
            self.steamApiService.GetPlayerAchievements(game.appid, steamId, callback);
        }

        self.gamesRepository.setPopulated(steamId, true);
    }
}

module.exports = steamService;
