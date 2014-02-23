var app = angular.module('blokkit', ['firebase']);

function hasClass(elem, className) {
    return new RegExp(" " + className + " ").test(" " + elem.className + " ");
}

function removeClass(elem, className) {
    if(hasClass(elem, className))
    {
        elem.className = elem.className.replace(className, "");
    }
}

app.factory('ShowAddForm', function(){
	return {'shown': false};
});

app.factory('DB', function($firebase){
	var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
	activities = $firebase(fbActivities);
	return {'activities': activities}
});

app.directive('gallery', function() {
	return {
		restrict: 'A',
		scope: {
			activities: '='
		},
		templateUrl: 'bloks.html'
	};
});

function main($scope, $firebase, ShowAddForm, DB) {

	$scope.showAddForm = ShowAddForm;

	$scope.bloks = DB.activities;

	//$scope.bloks.$on('loaded', function(snapshot) {

	 	// var bloks = []
	 	// angular.forEach(snapshot, function(value, key){
	 	// 	bloks.push(value);
	 	// });
	 	//$scope.activities.$bind('$scope', bloks);
	 	//$scope.bloks = bloks;
	 //});
}

function form($scope, $firebase, ShowAddForm, DB) {

	$scope.showAddForm = ShowAddForm;

	$scope.submitForm = function() {
		$scope.activities = DB.activities;

		//var name = $scope.activity.verbose_name.toLowerCase().replace(' ', '_')
		$scope.activities.$add({'activity': $scope.activity})

		$scope.activityForm.$setPristine();
		$scope.activity = {};
		$scope.showAddForm.shown = false;
	};
}