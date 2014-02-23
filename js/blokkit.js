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

function main($scope, $firebase, ShowAddForm, DB) {

	$scope.showAddForm = ShowAddForm;
	$scope.bloks = [];

	//$scope.bloks = DB.activities;
	var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
	
	fbActivities.on('value', function(snapshot) {
		if(snapshot.val() == null) {
			alert("not existing");
		} 
		else {
		 	angular.forEach(snapshot.val(), function(value, key){
		 		$scope.bloks.push(value);
		 	});
		}
	});
}

function form($scope, $firebase, ShowAddForm, DB) {

	$scope.showAddForm = ShowAddForm;

	$scope.submitForm = function() {
		$scope.activities = DB.activities;

		//var name = $scope.activity.verbose_name.toLowerCase().replace(' ', '_')
		$scope.activity.categories = "";
		if ($scope.activity.category1) {$scope.activity.categories = $scope.activity.categories + "sports "}
		if ($scope.activity.category2) {$scope.activity.categories = $scope.activity.categories + "design "}
		if ($scope.activity.category3) {$scope.activity.categories = $scope.activity.categories + "coding "}
		if ($scope.activity.category4) {$scope.activity.categories = $scope.activity.categories + "games "}
		if ($scope.activity.category5) {$scope.activity.categories = $scope.activity.categories + "tv "}
		if ($scope.activity.category6) {$scope.activity.categories = $scope.activity.categories + "books "}
		if ($scope.activity.category7) {$scope.activity.categories = $scope.activity.categories + "movies "}
		
		var now = Date.now();

		$scope.activity.updated_at = now;
		$scope.activity.$priority = now;
		$scope.activity.likes = 0;

		$scope.activities.$add({'activity': $scope.activity})

		$scope.activityForm.$setPristine();
		$scope.activity = {};
		$scope.showAddForm.shown = false;
	};
}