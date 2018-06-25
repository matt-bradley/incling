angular.module('tilesandtasksapp')
    .controller('TasksCtrl', ['$scope', 'TasksService',
        function ($scope, TasksService) {
            var tasks = []
            TasksService.initTasks().then(function successCallback(response) {
                for (var task in response.data) {
                    tasks.push(response.data[task]);
                    $scope.tasks = tasks;
                }
            }, function error(resp, a) {
                // error handling
            });

            $scope.remove = function (task) {

                TasksService.removeTask(task).then(function (resp) {
                    console.log(resp)
                }, function (err) {
                    console.log(err)
                })
            }

        }])
