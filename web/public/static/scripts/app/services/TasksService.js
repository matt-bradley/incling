angular.module('tilesandtasksapp').service('TasksService', ['$http', 'API', function ($http, API) {
    var allTasks = [];

    return {
        initTasks: function () {
            return $http.get(API.url + 'tasks/');
        },
        setTasks: function (tasks_in) {
            allTasks = tasks_in;
            return allTasks
        },
        getTasks: function () {
            return allTasks
        }
    }

}])