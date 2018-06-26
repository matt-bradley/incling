angular.module('tilesandtasksapp')
    .controller('TasksCtrl', ['$scope', 'TasksService', '$uibModal',
        function ($scope, TasksService, $uibModal) {
            var tasks = []
            TasksService.initTasks().then(function successCallback(response) {
                for (var task in response.data) {
                    tasks.push(response.data[task]);
                    $scope.tasks = tasks;
                }
            }, function error(resp, a) {
                // error handling
            });


            $scope.openModalAddTask = function (data) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: "static/views/modals/addTaskModal.html",
                    controller: "addTaskModalCtrl",
                    windowTopClass: 'project-modal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {}
                });
                modalInstance.result.then(function (selectedItem) {
                    //$scope.selected = selectedItem;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }

            $scope.remove = function (task) {

                TasksService.removeTask(task).then(function (resp) {
                    console.log(resp)
                }, function (err) {
                    console.log(err)
                })
            }

        }])
    .controller('addTaskModalCtrl', ['$scope', '$uibModalInstance', '$http', 'formlyVersion',
        function ($scope, $uibModalInstance, $http, formlyVersion) {
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
                    type: 'textbox',
                    templateOptions: {
                        label: 'Description'
                    }
                },
                {
                    key: 'tile',
                    type: 'number',
                    templateOptions: {
                        label: 'tile'
                    }
                }
            ];

            $scope.originalFields = angular.copy($scope.fields);

            $scope.onSubmit = function () {
                TasksService.addTask($scope.model).then(function (resp) {
                    console.log(resp)
                })
            }

        }])
