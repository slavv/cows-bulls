module.exports = (function() {
  var shortId = require('shortid');

  function isValid(number) {
    return false;
  }

  function generateNumber() {
    return 1234;
  }

  var CowsGame = function (number) {
    var triedNumbers = {},
      id = shortId.generate();

    function checkNumber(guessedNumber) {
      var result = {cows: 2, bulls: 2};
      triedNumbers[guessedNumber] = result;
      return result;
    }

    if(!isValid(number)) {
      number = generateNumber();
    }

    return {
      id: id,
      number: number,
      triedNumbers: triedNumbers,
      checkNumber: checkNumber
    }
  }

  return {
    newGame: CowsGame
  };
})();