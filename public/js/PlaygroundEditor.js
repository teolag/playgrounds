console.log("EXECUTE EDITOR");

const PlaygroundEditor = (function() {
	let form;
	let getPositionButton;

	function init() {
		form = document.forms.playgroundEditor;
		form.addEventListener("submit", submit, false);

		getPositionButton = document.querySelector(".get-position-button");
		getPositionButton.addEventListener("click", e => {
			console.log("get posss!!");
			getPositionButton.textContent = "...";
			Geolocation.getPosition().then(data => {
				console.log("data getted", data);
				getPositionButton.textContent = "här";
				editPositionValues(data.coords.longitude, data.coords.latitude);
			});
		});
	}

	function create() {
		form.reset();
	}

	function load(playgroundId) {
		fetch("/api/playgrounds/" + playgroundId).then(data => data.json()).then(p => {
			console.log("playground loaded", p);
			form.elements.id.value = p._id;
			form.elements.name.value = p.name;
			form.elements.longitude.value = p.longitude;
			form.elements.latitude.value = p.latitude;

			PlaygroundMap.enableMarkerDrag(p._id);
		});
	}

	function editPositionValues(lng, lat) {
		form.elements.longitude.value = lng;
		form.elements.latitude.value = lat;
	}

	function remove(playgroundId) {
		fetch("/api/playgrounds/" + playgroundId, {method: 'delete'})
			.then(data => data.json()).then(p => {
				console.log("playground deleted");
				PlaygroundList.update();
			});
	}

	function submit(e) {
		const id = form.elements.id.value;
		let actionUrl;
		if(id) {
			actionUrl = "/api/playgrounds/" + id;
		} else {
			actionUrl = "/api/playgrounds";
		}

		const data = {
			name: form.elements.name.value,
			longitude: form.elements.longitude.value,
			latitude: form.elements.latitude.value
		};

		const xhr = new XMLHttpRequest();
		xhr.addEventListener("load", saveCallback);
		xhr.open("POST", actionUrl);
		xhr.responseType = "json";
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(data));

		console.log("SPARA");
		e.preventDefault();
	}

	function saveCallback(e) {
		console.log("saveCallback", e);
		PlaygroundList.update();
		create();
	}

	return {init, create, load, remove, editPositionValues};
}());