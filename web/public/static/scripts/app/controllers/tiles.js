angular.module('tilesandtasksapp')
    .controller('TilesCtrl', ['$scope', 'TilesService',
        function ($scope, TilesService) {
            var tiles = []
            TilesService.initTiles().then(function successCallback(response) {
                for (var tile in response.data) {
                    tiles.push(response.data[tile]);
                    $scope.tiles = tiles;
                }
                TilesService.setTiles(tiles)
            }, function error(resp, a) {
                // error handling
            });


        }])
