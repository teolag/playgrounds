const Geolocation = (function() {
	let watchID;
	const watchers = [];

	function startWatch() {
		watchID = navigator.geolocation.watchPosition(positionUpdated);
	}

	function stopWatch() {
		navigator.geolocation.clearWatch(watchID);
	}

	function addWatcher(callback) {
		watchers.push(callback);
	}

	function removeWatcher(callback) {
		const i = watchers.findIndex(callback);
		if(i >= 0) {
			watchers.splice(i, 1);
		}
	}

	function positionUpdated(position) {
		const pos = {lat: position.coords.latitude, lng: position.coords.longitude};
		console.log("Position updated", position);
		watchers.forEach(callback => {
			callback(position);
		});
	}

	function getPosition() {
		return new Promise(function(resolve, reject) {
			navigator.geolocation.getCurrentPosition(function(position) {
				//const pos = {lat: position.coords.latitude, lng: position.coords.longitude};
				resolve(position);
			}, function(err) {
				reject(err);
			});
		});
	}

	return {
		getPosition,
		startWatch,
		stopWatch,
		addWatcher,
		removeWatcher
	};
}())