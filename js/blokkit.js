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

// app.filter('query', function() {
// 	return function(input, attribute) {
// 	if (!angular.isObject(input)) return input;

// 	var array = [];
// 	for(var objectKey in input) {
// 		array.push(input[objectKey]);
// 	}

// 	return array;
// 	}
// });

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
		$scope.activities.$add({'activity': $scope.activity})

		$scope.activityForm.$setPristine();
		$scope.activity = {};
		$scope.showAddForm.shown = false;
	};
}