function steamApiService(httpService, apiKey) {
    var self = this;

    self.apiKey = apiKey;
    self.httpService = httpService;

    self.GetOwnedGames = function (steamId, callback) {
        var options = {
            host: 'api.steampowered.com',
            path: '/IPlayerService/GetOwnedGames/v0001/?key=' + self.apiKey + '&steamid=' + steamId + '&format=json'
        };

        self.httpService.getJson(options, callback);
    }

    self.GetPlayerAchievements = function GetPlayerAchievements(appid, steamId, callback) {
        var options = {
            host: 'api.steampowered.com',
            path: '/ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + appid + '&key=' + self.apiKey + '&steamid=' + steamId + '&format=json'
        };

        self.httpService.getJson(options, callback);
    }
}

module.exports = steamApiService;
