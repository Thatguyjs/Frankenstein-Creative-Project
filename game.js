// Copyright (c) 2020 Thatguyjs All Rights Reserved.


const Game = {

	scene: 0,

	sceneList: [
		'menu', 'create', 'finish', 'view'
	],

	sceneElem: null,


	// Init variables and stuff
	init: function() {
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
	}

};


window.addEventListener('load', Game.init);
