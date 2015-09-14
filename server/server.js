function server(http, express, steamService, gamesRepository) {
    var self = this;

    self.http = http;
    self.express = express;
    self.steamService = steamService;
    self.gamesRepository = gamesRepository;

    self.app;
    self.server;

    self.start = function () {
        self.app = self.express();
        self.server = self.http.Server(self.app);

        self.app.use(self.express.static(__dirname + '/../public'));

        self.app.param('steamId', function (req, res, next, steamId) {
            req.steamId = steamId;
            next();
        });

        self.app.get('/populate/:steamId', function (req, res) {
            console.log('populating ' + req.steamId);
            self.steamService.populate(req.steamId);
            res.send('populating');
        });

        self.app.get('/data', function (req, res) {
            var games = self.gamesRepository.getGames();
            res.send(games);
        })

        self.server.listen(3000, function () {
            console.log('listening on *:3000');
        });
    }
}

module.exports = server;
