angular.module('tilesandtasksapp').service('TilesService', ['$http', 'API', function ($http, API) {
    var tiles = []

    return {
        initTiles: function () {
            $http.get(API.url + 'tiles/').then(function successCallback(response) {
                for (var tile in response.data) {
                    tiles.push(response.data[tile]);
                }
            });
            return tiles;
        }
    }

}])