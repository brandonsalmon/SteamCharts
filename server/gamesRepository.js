function gamesRepository() {
	var self = this;

	self.games = [];

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
}

module.exports = gamesRepository;
