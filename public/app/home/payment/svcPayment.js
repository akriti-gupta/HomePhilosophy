	angular.module('app').service("payment", function($http, $q, $location) {
		
		var package = -1;
		var pkgPerRoom = [];
		var packageArr = [];

		var storePayPkg = function(pkg){
			package = pkg;
		}

		var getPayPkg = function(){
			return package;
		}

		var clearPayPkg = function(){
			package = -1;
		}

		var storePkgPerRoom = function(roomInfo,pkgInfo){
			var pkgArr = getPackages();
			if(roomInfo!=null && pkgInfo!=null){
				for(var i =0; i<pkgInfo.length;i++){
					pkgPerRoom.push({"roomId":roomInfo[i].roomId,"roomName":roomInfo[i].roomName,"pkgId":pkgInfo[i].id,"pkgName":pkgArr[pkgInfo[i].id-1].name});
				} 
			}
		}

		var getPkgPerRoom = function(){
			return pkgPerRoom;
		}

		var clearPkgPerRoom = function(){
			pkgPerRoom.length=0;
		}

		var getPackages = function(){
			//Get this info from DB.
			packageArr = [
		  						{'id':1,'name':"Simple",'pkgValue':350,value:1},
		  					    {'id':2,'name':"Classic",'pkgValue':600,value:2},
		  					    {'id':3,'name':"Premium",'pkgValue':1000,value:3},
		  					    {'id':4,'name':"Custom",'pkgValue':0,value:4}
		  	];
			return packageArr;
		}

		return {
			    storePayPkg: storePayPkg,
			    getPayPkg: getPayPkg,
			    clearPayPkg: clearPayPkg,
			    storePkgPerRoom: storePkgPerRoom,
			    getPkgPerRoom: getPkgPerRoom,
			    getPackages: getPackages,
			    clearPkgPerRoom: clearPkgPerRoom
			}
	});