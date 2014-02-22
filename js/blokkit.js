var app = angular.module('blokkit', ['firebase']);

function main($scope, $firebase) {
	var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
	$scope.bloksObj = $firebase(fbActivities);
	//console.log(Object.keys($scope.bloks.$child('act1')));
	//console.log($scope.bloks.$child('act1').$child('details'));

	$scope.bloksObj.$on('loaded', function(snapshot) {
	 	console.log(snapshot);
	 	//$scope.thing = snapshot.act1.name;
	 	var bloks = []
	 	angular.forEach(snapshot, function(value, key){
	 		console.log(value);
	 		console.log(key);
	 		bloks.push(value);
	 	});
	 	console.log(bloks);
	 	$scope.bloks = bloks;
	 });
}