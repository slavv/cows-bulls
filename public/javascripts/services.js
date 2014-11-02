'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .service('Game', ['$http', function ($http) {
    function create() {
      return $http.post('/game');
    }

    function guess(id, number) {
      return $http.post('/game/guess', {
          number: number,
          id: id
      });
    }

    function join(id, isBot) {
      return $http.post('/game/join', {
          id: id,
          isBot: !!isBot
      });
    }

    function list() {
      return $http.get('/game/list');
    }

    function get(id) {
      return $http({
        method: 'GET',
        url: '/game',
        params: {
          id: id,
          timestamp: Date.now()
        }
      });
    }

    return {
      create: create,
      get: get,
      guess: guess,
      list: list,
      join: join
    }
  }]);

