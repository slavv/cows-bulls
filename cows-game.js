module.exports = (function() {
  var NUMBER_LENGTH = 4;
  var multplier = Math.pow(10, NUMBER_LENGTH - 1);
  var shortId = require('shortid');

  function guessNext(tried) {
    var minCount = multplier * 10;
    var chosen = 0;
    if (tried.length === 0) {
      return 1234;
    }
    for (var i = multplier; i < multplier * 10; i++) {
      var newTried;
      var count = 0;
      if (isPossible(i, tried)) {
        newTried = tried.slice();
        newTried.push(i);
        for (var j = multplier; j < multplier * 10; j++) {
          if (isPossible(j, tried)) {
            count ++
          }
        }
        if (count < minCount) {
          console.log(i);
          minCount = count;
          chosen = i 
        }
      } 
    }
    return chosen;
  }

  function isPossible(number, tried) {
    return isValid(number) && tried.every(function (triedNumber) {
      var result = checkNumber(triedNumber.number, number);
      return result.cows === triedNumber.result.cows && 
        result.bulls === triedNumber.result.bulls;
    });
  }

  function generateNumber() {
    var number;
    do {
      number = Math.floor(Math.random()* 9 * multplier) + multplier
    } while(!isValid(number))
    return number;
  }

  function isValid(number) {
    var numberString = number + '';
    var used = {};
    return numberString.length === NUMBER_LENGTH && numberString.split('').every(function (digit) {
      var isUsed = used[digit];
      used[digit] = true
      return !isUsed;
    });
  }

  function checkNumber(number, realNumber) {
    var numberString = number + '';
    var realNumberString = realNumber + '';
    var result = {
      cows: 0,
      bulls: 0
    }
    numberString.split('').forEach(function (digit, index) {
      var digitPos = realNumberString.indexOf(digit);
      if (digitPos !== -1) {
        if (digitPos === index) {
          result.bulls++;
        } else {
          result.cows++;
        }
      }
    });
    return result;
  }

  var CowsGame = function (number, userId) {
    var tried = [],
      id = shortId.generate(),
      players = [],
      playerOnTurn = null,
      ownerId = userId,
      number;

    function guessNumber(guessedNumber, playerId) {
      if (playerId !== playerOnTurn || !isValid(guessedNumber)) {
        return null;
      }
      var indexOfNext = players.indexOf(playerId) + 1;
      playerOnTurn = players[indexOfNext % players.length]
      var result = {
        number: guessedNumber,
        result: checkNumber(guessedNumber, number)
      }
      tried.push(result);
      return result;
    }

    function getGameState(userId) {
      if (playerOnTurn === 'bot') {
        guessNumber(guessNext(tried), playerOnTurn);
      }
      return {
        id: id, 
        tried: tried,
        playerIsOnTurn: playerOnTurn === userId,
        playerIsOwner: ownerId === userId
      }
    }

    function addPlayer(userId) {
      if (!userId) {
        userId = 'bot';
      }
      if (players.length === 0) {
        playerOnTurn = userId;
      }
      players.push(userId);
    }

    number = generateNumber();

    return {
      id: id,
      number: number,
      guessNumber: guessNumber,
      addPlayer: addPlayer,
      getGameState: getGameState
    }
  }

  return {
    newGame: CowsGame
  };
})();