var app = angular.module('blokkit', ['firebase']);

function main($scope, $firebase) {
	var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
	$scope.bloks = $firebase(fbActivities);
	//console.log(Object.keys($scope.bloks.$child('act1')));
	//console.log($scope.bloks.$child('act1').$child('details'));

	$scope.bloks.$on('loaded', function(snapshot) {
		console.log(snapshot);
		$scope.thing = snapshot.act1.name;
	});
}