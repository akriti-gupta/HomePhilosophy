angular.module('app').service("custView", function() {
        var project = [];
       
        var setUserProject = function (data){
        	project = data;
        }
        var getUserProject = function(){
        	return project;
        }

        var clearUserProject = function(){
                project.length = 0;
        }
        return {
                    setUserProject: setUserProject,
                    getUserProject: getUserProject,
                    clearUserProject: clearUserProject
                };
});