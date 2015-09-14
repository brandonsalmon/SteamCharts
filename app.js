var http = require('http');
var express = require('express');

var settings = require('./settings.json');
var GamesRepository = require('./server/gamesRepository.js');
var HttpService = require('./server/httpService.js');
var SteamApiService = require('./server/steamApiService.js');
var SteamService = require('./server/steamService.js');
var Server = require('./server/server.js');

var gamesRepository = new GamesRepository();
var httpService = new HttpService(http);
var steamApiService = new SteamApiService(settings.steamApiKey, httpService);
var steamService = new SteamService(steamApiService, gamesRepository);
var server = new Server(http, express, steamService, gamesRepository);

server.start();
