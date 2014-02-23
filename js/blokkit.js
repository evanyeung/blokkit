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

app.directive('liblok', function() {
	return {
		restrict: 'A',
		"link": function (scope, element, attrs) {

			element.on('click', function() {
				if (!element.hasClass('detailView'))
				{
					var bloks = document.getElementsByClassName('blok');
					for(var i = 0; i < bloks.length; i++){removeClass(bloks[i], 'detailView');}

					element.addClass('detailView');
				}
				else
				{
					element.removeClass('detailView');
				}
			});
		}
	}
});

function main($scope, $firebase) {

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

	$scope.showDetails = false;
}