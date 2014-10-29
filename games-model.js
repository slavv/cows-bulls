module.exports = (function() {
  var cowsGame = require('./cows-game');
  var games = {};

  return {
    games: games,
    newGame: cowsGame.newGame
  };
})();