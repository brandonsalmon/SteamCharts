/* global __dirname */

function server(http, express, path, io, config, port) {
    var self = this;

    self.http = http;
    self.path = path;
    self.io = io;
    self.express = express;

    self.mode = config.mode || 'release';
    self.clientDirectory = self.path.resolve(__dirname + '/../client');
    self.compiledDirectory = self.path.resolve(__dirname + '/../compiled/' + self.mode);

    self.app;
    self.server;

    self.start = function () {
        self.app = self.express();
        self.server = self.http.Server(self.app);

        self.registerRoutes();

        self.io.registerIo(self.server);

        self.server.listen(port, function () {
            console.log('listening on *:' + port);
        });
    }

    self.registerRoutes = function () {
        self.app.use(express.static(self.clientDirectory + '/public'));
        self.app.use(express.static(self.clientDirectory + '/templates'));
        self.app.use(express.static(self.compiledDirectory));

        self.app.get('*', function (req, res) {
            var filePath = self.clientDirectory + '/templates/base-' + self.mode + '.html';
            res.sendFile(filePath);
        });
    };
}

module.exports = server;
