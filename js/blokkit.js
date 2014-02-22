var app = angular.module('blokkit', ['firebase']);

function main($scope, $firebase) {
	var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
	$scope.bloks = $firebase(fbActivities);

	// $scope.activities.$on('change', function() {
	// 	console.log($scope.activities.act1.name);
	// 	$scope.act1 = $scope.activities.act1.name;
	// });
}