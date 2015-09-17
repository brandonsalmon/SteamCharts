function ioServer(socketIo, steamService, gamesRepository) {
    var self = this;

    self.socketIo = socketIo;
    self.steamService = steamService;
    self.gamesRepository = gamesRepository;

    self.users = {};

    self.registerSocket = function (socket) {
        console.log('connect: ' + socket.conn.id);
        self.users[socket.conn.id] = { connId: socket.conn.id, steamId: null };

        socket.on('disconnect', function (message) { self.disconnect(socket, message) });
        socket.on('link account', function (message) { self.linkAccount(socket, message) });
    };

    self.linkAccount = function (socket, steamId) {
        console.log('linkAccount: ' + socket.conn.id + ', ' + steamId);
        self.users[socket.conn.id].steamId = steamId;
        self.steamService.populate(steamId, function (game) {
            self.gameUpdate(socket, game);
        });
    };

    self.gameUpdate = function (socket, game) {
        console.log('gameUpdate: ' + socket.conn.id + ', ' + game);
        socket.emit('gameUpdate', game);
    };

    self.disconnect = function (socket) {
        console.log('disconnect: ' + socket.conn.id);
        self.users[socket.conn.id] = undefined;
    };

    self.registerIo = function (server) {
        self.io = self.socketIo(server);
        self.io.on('connection', self.registerSocket);
    };
}

module.exports = ioServer;
