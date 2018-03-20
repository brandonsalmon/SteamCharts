var http = require('http');
var express = require('express');
var io = require('socket.io');
var path = require('path');
var port = process.env.PORT || 3000;

var config = require('./config.json');
var GamesRepository = require('./repositories/gamesRepository.js');
var HttpService = require('./services/httpService.js');
var SteamApiService = require('./services/steamApiService.js');
var SteamService = require('./services/steamService.js');
var IoServer = require('./ioServer.js');
var Server = require('./server.js');

var gamesRepository = new GamesRepository();
var httpService = new HttpService(http);
var steamApiService = new SteamApiService(httpService, config.steamApiKey);
var steamService = new SteamService(steamApiService, gamesRepository);
var ioServer = new IoServer(io, steamService, gamesRepository);
var server = new Server(http, express, path, ioServer, port);

server.start();
