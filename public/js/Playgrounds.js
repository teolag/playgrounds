const Playgrounds = (function() {
	let playgrounds = [];

	function getAll() {
		fetch("/api/playgrounds")
			.then(data => data.json())
			.then(ps => {
				playgrounds = ps;
				updateDistanceAndBearing();
				PubSub.fire("playgroundsUpdated");
			});
	}

	function updateDistanceAndBearing() {
		playgrounds.forEach(p => {
			const pos = {lat: parseFloat(p.latitude), lng: parseFloat(p.longitude)};
			p.distance = Math.round(calcDistance(startPos, pos));
			p.bearing = Math.round(calcBearing(startPos, pos));
		});
	}

	function forEach(func) {
		playgrounds.forEach(func);
	}

	function map(func) {
		return playgrounds.map(func);
	}

	return {getAll, forEach, map, updateDistanceAndBearing};

}());