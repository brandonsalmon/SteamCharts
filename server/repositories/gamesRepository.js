function gamesRepository() {
    var self = this;

    self.users = {};

    self.getGames = function (steamId) {
        var result = [];

        if (self.users[steamId] && self.users[steamId].games) {
            result = self.users[steamId].games;
        }

        return result;
    }

    self.getGamesCount = function (steamId) {
        return self.getGames(steamId).length;
    }

    self.getGame = function (steamId, index) {
        return self.getGames(steamId)[index];
    }

    self.storeGames = function (steamId, result) {
        self.users[steamId] = result;
    }

    self.storeGameDetails = function storeGameDetails(steamId, index, details) {
        if (self.users[steamId] && self.users[steamId].games[index]) {
            self.users[steamId].games[index] = details;
        }
    }

    self.setPopulated = function (steamId, isPopulated) {
        if (self.users[steamId]) {
            self.users[steamId].populated = isPopulated;
        }
    }

    self.isPopulated = function (steamId) {
        var result = false;

        if (self.users[steamId]) {
            result = self.users[steamId].populated;
        }

        return result;
    }
}

module.exports = gamesRepository;
