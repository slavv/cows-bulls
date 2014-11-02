'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AppCtrl', function ($scope, $http) {

    // $http({
    //   method: 'GET',
    //   url: '/'
    // })
    // .success(function (data, status, headers, config) {
    //   $scope.name = data.name;
    // })
    // .error(function (data, status, headers, config) {
    //   $scope.name = 'Error!';
    // });

  })
  .controller('HomeCtrl', ['$scope', '$state', '$timeout','Game', function ($scope, $state, $timeout, Game) {
    var timeoutId;

    $scope.createGame = function (withBot) {
      Game.create().then(function (game) {
        Game.join(game.data.id, withBot).then(function () {
          $state.go('game', {id: game.data.id});
        })
      });
    }

    function refreshData() {
      Game.list().then(function (games) {
        $scope.games = games.data;
        timeoutId = $timeout(refreshData, 5000);
      });
    }

    refreshData();

    $scope.$on('$destroy', function(){
      $timeout.cancel(timeoutId);
    });

  }])
  .controller('GameCtrl', ['$scope', '$timeout', 'game', 'Game', function ($scope, $timeout, game, Game) {
    var timeoutId;
    function refreshData() {
      Game.get(game.data.id).then(function (game) {
        $scope.game = game.data;
        timeoutId = $timeout(refreshData, 5000);
      });
    }

    refreshData();

    $scope.sendGuess = function (number) {
      Game.guess($scope.game.id, number).then(function (data) {
        $scope.guess = '';
        $scope.game.tried.push(data.data);
      });
    }

    $scope.$on('$destroy', function(){
      $timeout.cancel(timeoutId);
    });
  }]);
