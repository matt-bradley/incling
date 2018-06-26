angular.module('tilesandtasksapp').service('TilesService', ['$http', 'API', function ($http, API) {
    var tiles = []

    return {
        initTiles: function () {
            return  $http.get(API.url + 'tiles/');
        },
        setTiles: function (tiles_in) {
            tiles = tiles_in
            return tiles
        },
        getTiles: function () {
            return tiles
        },
        getTileByID: function (tile) {
            for( tile in tiles){
                if(tiles[tile].id = tile){
                    return tiles[tile]
                }
            }
        }
    }

}])