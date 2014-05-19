var fbActivities = new Firebase('https://blokkit.firebaseio.com/activities');
//fbActivities.push({'activity': bloks[0]})

document.getElementById('dump-btn').onclick = function(){
	fbActivities.once('value', function(dataSnapshot){
		var data = dataSnapshot.val();
		var activityList = [];
		for(var key in data){
			activityList.push(data[key].activity)
		}
		var data = JSON.stringify(activityList);
		document.getElementById('dump').innerHTML = data;
	});
};

document.getElementById('restore-btn').onclick = function(){
	var textArea = document.getElementById('restore-text');
	var data = JSON.parse(textArea.value);
	for(var i=0; i < data.length; i++){
		fbActivities.push({'activity': data[i]});
	}
	textArea.value = '';
	document.getElementById('dump').innerHTML = 'Data Restored!';
}
