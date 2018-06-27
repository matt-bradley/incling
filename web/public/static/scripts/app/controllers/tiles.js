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

            $scope.addNewTile = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "static/views/modals/addNewTileModal.html",
                    controller: "addNewTileModalCtrl",
                    windowTopClass: 'project-modal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {}
                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.deleteTileConfirm = function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "static/views/modals/modalDeleteTileConfirm.html",
                    controller: "deleteTileModalCtrl",
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

            $scope.deleteTaskConfirm = function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "static/views/modals/modalDeleteTaskConfirm.html",
                    controller: "deleteTaskModalCtrl",
                    windowTopClass: 'project-modal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        task: data
                    }
                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };

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
                        task: data
                    }
                });
                modalInstance.result.then(function (selectedItem) {

                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };


        }])
    .controller('addNewTileModalCtrl', ['$scope', '$uibModalInstance', 'formlyVersion', 'TasksService', 'TilesService',
        function ($scope, $uibModalInstance, formlyVersion, TasksService, TilesService) {
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.model = {};
            $scope.options = {};
            $scope.fields = [
                {
                    key: 'datetime',
                    type: 'datetimepicker',
                    templateOptions: {
                        label: 'Date',
                        datepickerPopup: 'dd-MMMM-yyyy'
                    },
                },
                {
                    key: 'status_live',
                    type: 'select',
                    templateOptions: {
                        label: 'Status'
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


        }])
    .controller('addTaskToTileModalCtrl', ['$scope', '$uibModalInstance', 'formlyVersion', 'TasksService', 'TilesService',
        function ($scope, $uibModalInstance, formlyVersion, TasksService, TilesService) {
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

        }])
    .controller('deleteTileModalCtrl', ['$scope', '$uibModalInstance', 'formlyVersion', 'TasksService', 'TilesService', 'tile',
        function ($scope, $uibModalInstance, formlyVersion, TasksService, TilesService, tile) {
            var t = tile;
            $scope.removeTile = function () {
                TasksService.removeTask(t).then(function (resp) {
                    console.log(resp)
                }, function (err) {
                    console.log(err)
                })
            };

        }])
    .controller('deleteTaskModalCtrl', ['$scope', '$uibModalInstance', 'formlyVersion', 'TasksService', 'task',
        function ($scope, $uibModalInstance, formlyVersion, TasksService, task) {
            var t = task;
            $scope.removeTask = function () {
                TasksService.removeTask(t).then(function (resp) {
                    console.log(resp)
                }, function (err) {
                    console.log(err)
                })
            };
        }]);



