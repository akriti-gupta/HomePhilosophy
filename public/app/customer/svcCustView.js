angular.module('app').service("custViewSvc", function() {
        var route=' ';

        var setRequester = function(originRoute){
            route = originRoute;
        }

        var getRequester = function(){
            return route ;
        }
        var clearRequester = function(){
            route=' ';
        }
        return {
                    setRequester: setRequester,
                    getRequester: getRequester,
                    clearRequester: clearRequester
                };
});
