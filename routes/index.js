var express = require('express');
var router = require('express').Router();

module.exports = function (gamesModel) {
  router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  router.get('/game', function(req, res) {
    var game = gamesModel.newGame(req.params.number);
    gamesModel.games[game.id] = game;
    res.json({id: game.id}});
  });

  router.get('/guess', function(req, res) {
    var game = gamesModel.games[req.params.gameId];
    var result = game.guessNumber(req.params.number);
    res.json(result: result);
  });

  return router;
}