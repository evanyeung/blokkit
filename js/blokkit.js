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

app.factory('ShowForm', function(){
	return {'shown': false,
			'currentBlokk': {activity: {}}};
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

function main($scope, $firebase, ShowForm, DB) {

	$scope.showForm = ShowForm;
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

	$scope.edit = function(blok){
		$scope.showForm.currentBlokk = blok;
		//console.log(blok);
		//console.log(ShowForm.currentBlokk.activity);
		$scope.showForm.shown = true;
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

		fbActivities.child(id).setWithPriority(blok, now);
	}
}

function form($scope, $firebase, ShowForm, DB) {

	$scope.showForm = ShowForm;

	$scope.submitForm = function() {
		//console.log($scope.showForm.currentBlokk);

		//var name = $scope.showForm.activity.verbose_name.toLowerCase().replace(' ', '_')
		$scope.showForm.currentBlokk.activity.categories = "";
		if ($scope.showForm.currentBlokk.activity.category1) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "sports ";
			//delete $scope.showForm.currentBlokk.activity['category1'];
		}
		if ($scope.showForm.currentBlokk.activity.category2) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "design ";
			//delete $scope.showForm.currentBlokk.activity['category2'];
		}
		if ($scope.showForm.currentBlokk.activity.category3) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "coding ";
			//delete $scope.showForm.currentBlokk.activity['category3'];
		}
		if ($scope.showForm.currentBlokk.activity.category4) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "games ";
			//delete $scope.showForm.currentBlokk.activity['category4'];
		}
		if ($scope.showForm.currentBlokk.activity.category5) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "tv ";
			//delete $scope.showForm.currentBlokk.activity['category5'];
		}
		if ($scope.showForm.currentBlokk.activity.category6) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "books ";
			//delete $scope.showForm.currentBlokk.activity['category6'];
		}
		if ($scope.showForm.currentBlokk.activity.category7) {
			$scope.showForm.currentBlokk.activity.categories = $scope.showForm.currentBlokk.activity.categories + "movies ";
			//delete $scope.showForm.currentBlokk.activity['category7'];
		}
		
		var now = Date.now();

		$scope.showForm.currentBlokk.activity.updated_at = now;
		$scope.showForm.currentBlokk.activity.$priority = now;

		//console.log($scope.showForm.currentBlokk);

		//edit
		if($scope.showForm.currentBlokk.id){
			//should have a function to connect
			var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');

			//similar code to like. probably make a function
			var id = $scope.showForm.currentBlokk.id;
			delete $scope.showForm.currentBlokk['id'];
			delete $scope.showForm.currentBlokk['$$hashKey'];
			delete $scope.showForm.currentBlokk.activity['$priority'];
			console.log($scope.showForm.currentBlokk);
			fbActivities.child(id).setWithPriority($scope.showForm.currentBlokk, now);

		}
		//new
		else {
			$scope.showForm.currentBlokk.activity.likes = 0;
			//TODO: connect the same way as the others
			$scope.activities = DB.activities;
			$scope.activities.$add({'activity': $scope.showForm.currentBlokk.activity})
		}
		
		$scope.activityForm.$setPristine();
		$scope.showForm.currentBlokk = {activity: {}};
		$scope.showForm.shown = false;
	};
}