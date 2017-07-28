PubSub.pubSubDebug(true);

Playgrounds.getAll();
PlaygroundList.init();
PlaygroundEditor.init();

const startPos = {lat: 59.35417, lng: 17.88704};

function initMap() {
	console.log("init map");
	PlaygroundMap.init(startPos, 19);
	//PlaygroundMap.setPosition()
}


const createButton = document.querySelector(".playground-create-button");
createButton.addEventListener("click", e => {
	PlaygroundEditor.create();
});


Geolocation.addWatcher(data => {
	console.log("Watching... Set position");
	PlaygroundMap.setPosition({lat: data.coords.latitude, lng: data.coords.longitude});
});
Geolocation.startWatch();



function calcDistance(from, to) {
	const R = 6371e3; // metres
	const φ1 = toRadians(from.lat);
	const φ2 = toRadians(to.lat);
	const Δφ = toRadians(to.lat-from.lat);
	const Δλ = toRadians(to.lng-from.lng);

	const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	const d = R * c;
	return d;
}

function calcBearing(from, to) {
	const φ1 = toRadians(from.lat),
		  φ2 = toRadians(to.lat);
    const Δλ = toRadians(to.lng - from.lng);

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
    const θ = Math.atan2(y, x);

    return (toDegrees(θ)+360) % 360;
}

function toRadians(deg) {
	return deg * Math.PI / 180;
}
function toDegrees(rad) {
	return rad * 180 / Math.PI;
}


const serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}