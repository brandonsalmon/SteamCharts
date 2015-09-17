/* global __dirname */

function server(http, express, path, io) {
    var self = this;

    self.http = http;
    self.path = path;
    self.io = io;
    self.express = express;

    self.publicDirectory = self.path.resolve(__dirname + '/../public');

    self.app;
    self.server;

    self.start = function () {
        self.app = self.express();
        self.server = self.http.Server(self.app);

        self.registerRoutes();

        self.io.registerIo(self.server);

        self.server.listen(3000, function () {
            console.log('listening on *:3000');
        });
    }

    // self.populate = function (steamId, response) {
    //     self.steamService.populate(steamId);
    //     response.send('populating');
    // };

    // self.getData = function (steamId, response) {
    //     var games = self.gamesRepository.getGames();
    //     response.send(games);
    // };

    self.registerRoutes = function () {
        //self.app.use(self.express.static(__dirname + '/../public'));

        // self.app.param('steamId', function (req, res, next, steamId) {
        //     req.steamId = steamId;
        //     next();
        // });

        self.app.get('/', function (req, res) {
            var filePath = self.publicDirectory + '/index.html';
            res.sendFile(filePath);
        });
        self.app.get('/js/', function (req, res) {
            var filePath = self.publicDirectory + '/scripts.js';
            res.sendFile(filePath);
        });
        self.app.get('/css/', function (req, res) {
            var filePath = self.publicDirectory + '/css/site.css';
            res.sendFile(filePath);
        });

        // self.app.get('/populate/:steamId', function (req, res) {
        //     console.log('Populating ' + req.steamId);
        //     self.populate(req.steamId, res);
        // });

        // self.app.get('/data/:steamId', function (req, res) {
        //     console.log('Get data ' + req.steamId);
        //     self.getData(req.steamId, res);
        // })
    };
}

module.exports = server;
