angular.module('tilesandtasksapp')
    .controller('TilesCtrl', ['$scope', 'TilesService', '$uibModal', 'TasksService',
        function ($scope, TilesService, $uibModal, TasksService) {
            var tiles = [];
            TilesService.initTiles().then(function successCallback(response) {
                for (var tile in response.data) {
                    tiles.push(response.data[tile]);
                    $scope.tiles = tiles;
                }
                TilesService.setTiles(tiles)
            }, function error(resp, a) {
                // error handling
            });


            $scope.openModalAddTaskToTile = function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "static/views/modals/addTaskModal.html",
                    controller: "addTaskToTileModalCtrl",
                    windowTopClass: 'project-modal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        tile: data
                    }
                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.removeTask = function (task) {
                TasksService.removeTask(task).then(function (resp) {
                    console.log(resp)
                }, function (err) {
                    console.log(err)
                })
            };

            // $scope.removeTile = function (task) {
            //     TasksService.removeTask(task).then(function (resp) {
            //         console.log(resp)
            //     }, function (err) {
            //         console.log(err)
            //     })
            // };

        }])
    .controller('addTaskToTileModalCtrl', ['$scope', '$uibModalInstance', 'formlyVersion', 'TasksService', 'TilesService', 'tile',
        function ($scope, $uibModalInstance, formlyVersion, TasksService, TilesService, tile) {
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.model = {};
            $scope.options = {};
            $scope.fields = [
                {
                    key: 'title',
                    type: 'input',
                    templateOptions: {
                        label: 'Task Title'
                    }
                },
                {
                    key: 'order',
                    type: 'input',
                    templateOptions: {
                        label: 'Order'
                    }
                },
                {
                    key: 't_type',
                    type: 'input',
                    templateOptions: {
                        label: 'Task Type'
                    }
                },
                {
                    key: 'desc',
                    type: 'input',
                    templateOptions: {
                        label: 'Description'
                    }
                }
            ];

            $scope.originalFields = angular.copy($scope.fields);

            $scope.onSubmit = function () {
                $scope.model.tile = tile.id;
                TasksService.addTask($scope.model).then(function (resp) {
                    TilesService.addTaskToTile(tile, resp)
                })
            };

        }]);

