function steamService(steamApiService, gamesRepository) {
    var self = this;

    self.steamApiService = steamApiService;
    self.gamesRepository = gamesRepository;

    self.populate = function (steamId) {
        var callback = function (result) {
            self.gamesRepository.storeGames(result.response);
            self.loadGamesRecursive(0, steamId);
        }

        self.steamApiService.GetOwnedGames(steamId, callback)
    }

    self.loadGamesRecursive = function (index, steamId) {
        var gamesCount = self.gamesRepository.getGamesCount();

        if (index < gamesCount) {
            var callback = function (result) {
                self.gamesRepository.storeGameDetails(index, result);
                self.loadGamesRecursive(index + 1, steamId);
            }

            var game = self.gamesRepository.getGame(index);
            self.steamApiService.GetPlayerAchievements(game.appid, steamId, callback);
        }
    }
}

module.exports = steamService;
