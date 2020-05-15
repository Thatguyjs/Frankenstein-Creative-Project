// Copyright (c) 2020 Thatguyjs All Rights Reserved.


const Game = {

	scene: 0,

	sceneList: [
		'menu', 'create', 'compare'
	],

	sceneElem: null,

	// Selected parts
	selected: [],


	// Init variables and stuff
	init: function() {
		console.log("Log repo");
		// logRepo();
		initBackground();

		Game.sceneElem = Game.getElem();
	},


	// Go to the first interactive scene
	start: async function() {

		// Stop the background
		doUpdate = false;

		// Start a transition
		initTransition();
		await startTransition();

		// Hide the background canvas
		background.classList.toggle('hidden');

		// Next scene
		this.nextScene();

	},


	// Get the active scene container
	getElem: function() {
		return document.getElementById(this.sceneList[this.scene]);
	},


	// Transition to the next scene
	nextScene: function() {
		this.sceneElem.classList.add('hidden');

		this.scene++;
		if(!this.sceneList[this.scene]) return;

		this.sceneElem = this.getElem();
		this.sceneElem.classList.remove('hidden');

		// Get buttons
		if(this.sceneElem.id === 'create') {
			let buttons = Array.from(this.sceneElem.querySelectorAll('button'));

			for(let b in buttons) {
				buttons[b].addEventListener('click', (event) => {
					Game.selectPart(event.target);
				});
			}
		}
	},


	// Select a body part
	selectPart: function(element) {
		// De-select other parts
		for(let i = 0; i < 3; i++) {
			element.parentNode.children[i].classList.remove('selected');
		}

		// Select clicked part
		element.classList.add('selected');
	},


	createMonster: async function() {
		let elements = this.sceneElem.querySelectorAll('.selected:not(#finish-monster)');
		elements = Array.from(elements);

		if(elements.length < 6) {
			alert("Select a part from each category to continue!");
			return;
		}

		// Store selected parts
		for(let e in elements) {
			this.selected.push({
				name: elements[e].innerHTML,
				category: elements[e].parentNode.getAttribute('name'),
				value: Number(elements[e].getAttribute('name'))
			});
		}

		// Transition to next scene
		initTransition();
		await startTransition();

		this.nextScene();
	}

};


window.addEventListener('load', Game.init);


// Log the repo url
function logRepo() {
	console.log("%cOh hi there. Respository link is below, if you want it.", "font-size: 20px");
	console.log("%chttps://github.com/Thatguyjs/Frankenstein-Creative-Project", "font-size: 15px");
}
