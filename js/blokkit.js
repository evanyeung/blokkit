var app = angular.module('blokkit', ['firebase', 'ngAnimate']);

function hasClass(elem, className) {
    return new RegExp(" " + className + " ").test(" " + elem.className + " ");
}

function addClass(elem, className)
{
    if(!hasClass(elem, className))
    {
        elem.className += " " + className;
    }
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

app.directive('tab', function() {
	return function(scope, element) {
				element.on('click', function() {

					var tabs = document.getElementsByClassName('tab');
					for (var i in tabs) {
						console.log(tabs[i]);
						console.log(hasClass(tabs[i], 'active'));
						removeClass(tabs[i], 'active');
					}

					element.addClass('active');
				});
			}
});

function main($scope, $firebase, ShowAddForm, DB) {

	$scope.showAddForm = ShowAddForm;
	$scope.category = ""
	$scope.max_bloks = 6;

	var fbActivitiesAll = new Firebase('https://blokkit.firebaseio.com/activities');
	var fbActivities = fbActivitiesAll.limit($scope.max_bloks);

	function loadData(snapshot) {

		if(snapshot.val() == null) {
			console.log("not existing");
		} 
		else {
			var bloks = [];
		 	angular.forEach(snapshot.val(), function(value, key){
		 		value.id = key;
		 		bloks.push(value);
		 	});

		 	//reverses the order as firbase returns them by priority
		 	var sortedBloks = [];
		 	var length = bloks.length
		 	for(var i = 0; i < length; i++) {
		 		sortedBloks.push(bloks.pop());
		 	}

		 	$scope.bloks = sortedBloks;
		}
	}

	fbActivities.on('value', function(snapshot) {
		loadData(snapshot);
	});

	$scope.load_more = function() {
		$scope.max_bloks += 3;

		var fbActivities = fbActivitiesAll.limit($scope.max_bloks);
		fbActivities.on('value', function(snapshot) {
			loadData(snapshot);
		});
	};

	$scope.setCategory = function(category)
	{
		$scope.category = category;
	}

	$scope.like = function(blok) {
		
		var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
		var id = blok.id;
		delete blok['id'];
		delete blok['$$hashKey'];

		var now = Date.now();
		blok.updated_at = now;
		blok.activity.likes += 1;

		console.log(blok);
		console.log('about to write');
		fbActivities.child(id).setWithPriority(blok, now);
		console.log('written');
	}
}

function form($scope, $firebase, ShowAddForm, DB) {

	$scope.showAddForm = ShowAddForm;

	$scope.submitForm = function() {
		$scope.activities = DB.activities;

		//var name = $scope.activity.verbose_name.toLowerCase().replace(' ', '_')
		$scope.activity.categories = "";
		if ($scope.activity.category1) {
			$scope.activity.categories = $scope.activity.categories + "sports ";
			delete $scope.activity['category1'];
		}
		if ($scope.activity.category2) {
			$scope.activity.categories = $scope.activity.categories + "design ";
			delete $scope.activity['category2'];
		}
		if ($scope.activity.category3) {
			$scope.activity.categories = $scope.activity.categories + "coding ";
			delete $scope.activity['category3'];
		}
		if ($scope.activity.category4) {
			$scope.activity.categories = $scope.activity.categories + "games ";
			delete $scope.activity['category4'];
		}
		if ($scope.activity.category5) {
			$scope.activity.categories = $scope.activity.categories + "tv ";
			delete $scope.activity['category5'];
		}
		if ($scope.activity.category6) {
			$scope.activity.categories = $scope.activity.categories + "books ";
			delete $scope.activity['category6'];
		}
		if ($scope.activity.category7) {
			$scope.activity.categories = $scope.activity.categories + "movies ";
			delete $scope.activity['category7'];
		}
		
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