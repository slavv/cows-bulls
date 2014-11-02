'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ui.router',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
])
.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'partials/home',
      controller: 'HomeCtrl'
    })
    .state('game', {
      url: "/game/:id",
      templateUrl: 'partials/game',
      controller: 'GameCtrl',
      resolve: {
        game: ['$stateParams', 'Game', function($stateParams, Game) {
          return Game.get($stateParams.id);
        }]
      }
    })
});
