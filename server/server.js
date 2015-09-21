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

    self.registerRoutes = function () {
        self.app.get('/', function (req, res) {
            var filePath = self.publicDirectory + '/index.html';
            res.sendFile(filePath);
        });
        self.app.get('/scripts.js', function (req, res) {
            var filePath = self.publicDirectory + '/scripts.js';
            res.sendFile(filePath);
        });
        self.app.get('/styles.css', function (req, res) {
            var filePath = self.publicDirectory + '/styles.css';
            res.sendFile(filePath);
        });
    };
}

module.exports = server;
