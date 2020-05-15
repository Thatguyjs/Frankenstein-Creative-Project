// Copyright (c) 2020 Thatguyjs All Rights Reserved.


const Game = {

	scene: 0,

	sceneList: [
		'menu', 'create', 'finish', 'view'
	],

	sceneElem: null,


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
		let section = element.parentNode.getAttribute('name');

		let name = element.innerHTML;
		let value = element.className;

		// TEMP
		console.log(section, name, value);
	}

};


window.addEventListener('load', Game.init);


// Log the repo url
function logRepo() {
	console.log("%cOh hi there. Respository link below, if you want it.", "font-size: 20px");
	console.log("%chttps://github.com/Thatguyjs/Frankenstein-Creative-Project", "font-size: 15px");
}
