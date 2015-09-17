function gamesRepository() {
    var self = this;

    self.games = { games: [] };
    self.populated = false;

    self.getGames = function () {
        return self.games;
    }

    self.getGamesCount = function () {
        return self.games.games.length;
    }

    self.getGame = function (index) {
        return self.games.games[index];
    }

    self.storeGames = function (result) {
        self.games = result;
    }

    self.storeGameDetails = function storeGameDetails(index, details) {
        self.games.games[index].details = details;
    }

    self.setPopulated = function (steamId, isPopulated) {
        self.populated = isPopulated;
    }

    self.isPopulated = function (steamId) {
        return self.populated;
    }
}

module.exports = gamesRepository;
