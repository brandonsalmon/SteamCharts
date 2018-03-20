/* global __dirname */

function server(http, express, path, io, port) {
    var self = this;

    self.http = http;
    self.path = path;
    self.io = io;
    self.express = express;

    self.clientDirectory = self.path.resolve(__dirname + '/../dist');

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
        self.app.use(express.static(self.clientDirectory));

        self.app.get('*', function (req, res) {
            var filePath = self.clientDirectory + '/index.html';
            res.sendFile(filePath);
        });
    };
}

module.exports = server;
