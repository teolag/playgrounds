console.log("EXECUTE LIST");

const PlaygroundList = (function() {
	let list;

	function init() {
		list = document.querySelector(".playground-list");
		list.addEventListener("click", listClick, false);

		PubSub.listen('playgroundsUpdated', data => {
			console.log("UPDATED", data);
			update();
		}, true);
	}

	function update() {
		list.innerHTML = Playgrounds.map(printPlayground).join('');
	}

	function printPlayground(p) {
		return `
			<div class="playground-list__row" data-id="${p._id}">
				<span class="playground__name">${p.name}</span>
				<span class="playground__distance">${p.distance}m</span>
				<span class="playground__bearing">, bearing: ${p.bearing}</span>
				<button type="button" class="playground__edit">E</button>
				<button type="button" class="playground__delete">D</button>
			</div>
		`;
	}

	function listClick(e) {
		if(e.target.classList.contains('playground__edit')) {
			const id = e.target.parentElement.dataset.id;
			PlaygroundEditor.load(id);
			PlaygroundMap.jumpToMarker(id);
		} else if(e.target.classList.contains('playground__delete')) {
			const id = e.target.parentElement.dataset.id;
			PlaygroundEditor.remove(id);
		}
	}

	return {update, init};
}());