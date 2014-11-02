module.exports = (function() {
  var cowsGame = require('./cows-game');
  var gamesMap = {};

  function createGame() {
    var game = cowsGame.newGame.bind(null, arguments)();
    gamesMap[game.id] = game;
    return game.id;
  }

  function getGame(id) {
    return gamesMap[id];
  }

  function listGames(userId) {
    var keys = Object.keys(gamesMap);
    return keys.map(function (key) {
      return gamesMap[key].getGameState(userId);
    });
  }

  return {
    getGame: getGame,
    createGame: createGame,
    listGames: listGames
  };
})();