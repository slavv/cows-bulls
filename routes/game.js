var express = require('express');
var router = require('express').Router();

module.exports = function (gamesModel) {
  router.post('/', function(req, res) {
    var number = req.body.data && req.body.data.number;
    var gameId = gamesModel.createGame(number, req.session.uid);
    res.json({ id: gameId });
  });

  router.get('/', function(req, res) {
    var userId = req.session.uid;
    var id = req.query.id;
    var game = gamesModel.getGame(id);
    var result = game.getGameState(userId);
    res.json(result);
  });

  router.post('/guess', function(req, res) {
    var id = req.body.id;
    var number = req.body.number;
    var game = gamesModel.getGame(id);
    var result = game.guessNumber(number, req.session.uid);
    res.json(result);
  });

  router.post('/join', function(req, res) {
    var id = req.body.id;
    var isBot = req.body.isBot;
    var game = gamesModel.getGame(id);
    game.addPlayer(isBot ? 'bot' : req.session.uid);
    res.end();
  });

  router.get('/list', function(req, res) {
    var games = gamesModel.listGames(req.session.uid);
    res.json(games)
  });  

  return router;
}