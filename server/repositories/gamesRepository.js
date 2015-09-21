function gamesRepository() {
    var self = this;

    self.games = {};

    self.getGames = function (steamId) {
        return self.games[steamId] || [];
    }

    self.getGamesCount = function (steamId) {
        return (self.games[steamId] || []).length;
    }

    self.getGame = function (steamId, index) {
        return (self.games[steamId] || [])[index];
    }

    self.storeGames = function (steamId, result) {
        self.games[steamId] = result.games;
    }

    self.storeGameDetails = function storeGameDetails(steamId, index, details) {
        if (self.games[steamId] && self.games[steamId][index]) {
            self.games[steamId][index].details = details;
        }
    }
}

module.exports = gamesRepository;
