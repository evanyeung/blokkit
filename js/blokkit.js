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

app.directive('gallery', function() {
	return {
		restrict: 'A',
		scope: {
			activities: '='
		},
		templateUrl: 'bloks.html'
	};
});

function main($scope, $firebase, ShowAddForm) {

	$scope.showAddForm = ShowAddForm;

	//firebase instance
	var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
	//bind it to angular object
	$scope.bloksObj = $firebase(fbActivities);

	$scope.bloksObj.$on('loaded', function(snapshot) {

	 	var bloks = []
	 	angular.forEach(snapshot, function(value, key){
	 		bloks.push(value);
	 	});

	 	$scope.bloks = bloks;
	 });
}

function form($scope, $firebase, ShowAddForm) {

	$scope.showAddForm = ShowAddForm;

	$scope.submitForm = function() {
		console.log($scope.activity);
		console.log("Hello");
	};
}