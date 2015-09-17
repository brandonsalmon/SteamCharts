var http = require('http');
var express = require('express');
var io = require('socket.io');
var path = require('path');

var steamApiKey = require('./steamApiKey.json');
var GamesRepository = require('./server/repositories/gamesRepository.js');
var HttpService = require('./server/services/httpService.js');
var SteamApiService = require('./server/services/steamApiService.js');
var SteamService = require('./server/services/steamService.js');
var IoServer = require('./server/ioServer.js');
var Server = require('./server/server.js');

var gamesRepository = new GamesRepository();
var httpService = new HttpService(http);
var steamApiService = new SteamApiService(steamApiKey.steamApiKey, httpService);
var steamService = new SteamService(steamApiService, gamesRepository);
var ioServer = new IoServer(io, steamService, gamesRepository);
var server = new Server(http, express, path, ioServer);

server.start();
