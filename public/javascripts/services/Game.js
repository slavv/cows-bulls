var module = angular.module('CowsBulls')

module.service('Game', ['$http', '$q', function ($http, $q) {
  $http.post('/game', )
  return {
    create: create,
    guessNumber: guessNumber
  }
}]);

angular.module('cowsBulls', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      templateUrl: 'views/index.html',
      controller: 'HomeCtrl'
    });

    $routeProvider.when('/game/:gameId', {
      templateUrl: 'views/game.html',
      controller: 'HomeCtrl',
      resolve: {
        gameId: ['$routeParams', function ($routeParams) {
          return {id: $routeParams.id};
        }]
      }
    });
  }]);