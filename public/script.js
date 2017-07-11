



const PlaygroundEditor = (function() {
	const form = document.forms.playgroundEditor;

	form.addEventListener("submit", submit, false);


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
	}


}());







const serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}