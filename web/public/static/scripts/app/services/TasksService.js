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
        },
        updateTasks: function (task) {
            var url = API.url + 'tasks/' + task.id +'/';
            return $http.put(url)
        },
        removeTask: function (task) {
            var url = API.url + 'tasks/' + task.id +'/';
            return $http.delete(url)
        },
        addTask: function (task) {
            var url = API.url + 'tasks/';
            return $http.post(url, task)
        },
    }

}])