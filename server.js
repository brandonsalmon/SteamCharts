var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.use(express.static(__dirname + '/public'));



var games;

app.get('/populate', function (req, res) {
    var options = {
        host: 'api.steampowered.com',
        path: '/IPlayerService/GetOwnedGames/v0001/?key=' + steamApiKey + '&steamid=' + steamId + '&format=json'
        //path: '/ISteamUser/GetPlayerSummaries/v0002/?key=' + steamApiKey + '&steamids=' + steamId
        //path: '/ISteamUserStats/GetPlayerAchievements/v0001/?appid=35140&key=' + steamApiKey + '&steamid=' + steamId + '&format=json'
        //path: '/ISteamUserStats/GetUserStatsForGame/v0002/?appid=35140&key=' + steamApiKey + '&steamid=' + steamId
    };

    callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {

            games = JSON.parse(str).response;

            loadGame(0);

            res.send('populating');
        });
    }

    http.request(options, callback).end();
})

function loadGame(i) {
    if (i < games.games.length) {
        var options2 = {
            host: 'api.steampowered.com',
            //path: '/IPlayerService/GetOwnedGames/v0001/?key=' + steamApiKey + '&steamid=' + steamId + '&format=json'
            //path: '/ISteamUser/GetPlayerSummaries/v0002/?key=' + steamApiKey + '&steamids=' + steamId
            path: '/ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + games.games[i].appid + '&key=' + steamApiKey + '&steamid=' + steamId + '&format=json'
            //path: '/ISteamUserStats/GetUserStatsForGame/v0002/?appid=35140&key=' + steamApiKey + '&steamid=' + steamId
        };

        callback2 = function (responses) {
            var str = '';

            responses.on('data', function (chunk) {
                str += chunk;
            });

            responses.on('end', function () {

                var gamesDetails = JSON.parse(str);

                games.games[i].details = gamesDetails;

                loadGame(i + 1);
            });
        }

        http.request(options2, callback2).end();
    }
}

app.get('/data', function (req, res) {
    res.send(games);
})

server.listen(3000, function () {
    console.log('listening on *:3000');
});
