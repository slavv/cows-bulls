'use strict';

// Declare app level module which depends on views, and components
angular.module('CowsBulls', ['ngRoute'])
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