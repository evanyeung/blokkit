var app = angular.module('blokkit', ['firebase']);

app.directive('liblok', function() {
	return {
		restrict: 'A',
		"link": function (scope, element, attrs) {
			element.on('click', function() {
				if (!element.hasClass('detailView'))
				{
					element.addClass('detailView');;
					scope.templateUrl = 'detailBlok.html'
				}
				else
				{
					element.removeClass('detailView');
					scope.templateUrl = 'blok.html'
				}
			});
		}
	}
});

// "link": function (scope, element, attrs) {
// 			jQuery('.blok').click(function(event){
// 				var blok = jQuery(event.target);
// 				blok.addClass('expanded');
// 			});
// 		}

function main($scope, $firebase) {
	$scope.templateUrl = 'blok.html'
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