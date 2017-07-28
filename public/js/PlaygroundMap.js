console.log("EXECUTE MAP");

const PlaygroundMap = (function() {
	const markers = [];
	let map,
		coordsDiv;



	function init(center, zoom) {
		coordsDiv = document.querySelector("#coords");

		map = new google.maps.Map(document.getElementById('playground-map'), {zoom, center});


		map.addListener('click', function(e) {
			console.log("CLock", e);
			PlaygroundEditor.editPositionValues(e.latLng.lng(), e.latLng.lat());
		});

		PubSub.listen('playgroundsUpdated', data => {
			Playgrounds.forEach(p => {
				const pos = {lat: parseFloat(p.latitude), lng: parseFloat(p.longitude)};
				PlaygroundMap.addMarker(pos, p.name, p._id);
			});
	    }, true);
	}

	function setPosition(position, zoom) {
		map.panTo(position);
		coordsDiv.textContent = `lat: ${position.lat}, lng: ${position.lng}`;
		//map.setZoom(zoom);
	}

	function jumpToMarker(playgroundId) {
		const marker = getMarker(playgroundId);
		if(marker) {
			setPosition(marker.position, 18);
		}
	}

	function addMarker(position, title, playgroundId) {
		console.log("Add marker", position);
		const marker = new google.maps.Marker({
			position,
			map,
			title,
		    animation: google.maps.Animation.DROP,
		    playgroundId
		});

		marker.addListener('click', function(e) {
			const infowindow = new google.maps.InfoWindow({
				content: marker.title
			}).open(map, marker);
		});

		marker.addListener('dragend', function(e) {
			console.log("%s was moved to long:%s, lat:%s", marker.title, e.latLng.lng(), e.latLng.lat(), marker.playgroundId);
			PlaygroundEditor.editPositionValues(e.latLng.lng(), e.latLng.lat());
		});

		markers.push(marker);
	}

	function getMarker(playgroundId) {
		return markers.find(m => m.playgroundId === playgroundId);
	}

	function enableMarkerDrag(playgroundId) {
		const marker = getMarker(playgroundId);
		if(marker) {
			marker.setDraggable(true);
		}
	}

	function disableMarkerDrag(playgroundId) {
		const marker = getMarker(playgroundId);
		if(marker) {
			marker.setDraggable(false);
		}
	}


	return {init, addMarker, enableMarkerDrag, disableMarkerDrag, jumpToMarker, setPosition};
}());