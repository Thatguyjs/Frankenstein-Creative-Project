// Copyright (c) 2020 Thatguyjs All Rights Reserved.


const Game = {

	scene: 0,

	sceneList: [
		'menu', 'create', 'compare'
	],

	sceneElem: null,

	// Selected parts
	selected: [],

	// Frankenstein monster scores
	frankenstein: {
		'intelligence': 86,
		'strength': 98,
		'agility': 66,
		'precision': 35,
		'speed': 100
	},


	// Init variables and stuff
	init: function() {
		logRepo();
		initBackground();

		Game.sceneElem = Game.getElem();
	},


	// Restart the game
	restart: function() {
		if(window.confirm("You will lose all progress if you restart!")) {
			window.location.reload();
		}
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

		this.score = 0;

		// Store selected parts
		for(let e in elements) {
			this.selected.push({
				name: elements[e].innerHTML,
				category: elements[e].parentNode.getAttribute('name'),
				value: Number(elements[e].getAttribute('name'))
			});
		}

		// Set scores on next scene
		this.setScores(this.frankenstein, 1);
		this.setScores(this.getScores(), 0);

		// Transition to next scene
		initTransition();
		await startTransition();

		this.nextScene();
	},


	// Get range of different scores (0 - 100)
	getScores: function() {
		let base = {};

		for(let s in this.selected) {
			base[this.selected[s].category] = this.selected[s].value;
		}

		return {
			'intelligence': Math.floor(Gfx.map(base.head + (base.torso / 4), 0, 125, 0, 100)),
			'strength': Math.floor(Gfx.map(
				base.torso + base.arms / 2 + base.hands / 5 + base.legs / 2 + base.feet / 5,
				0, 240, 0, 100
			)),
			'agility': Math.floor(Gfx.map(
				base.torso / 2 + base.arms / 4 + base.hands + base.legs / 4 + base.feet,
				0, 300, 0, 100
			)),
			'precision': Math.floor(Gfx.map(
				base.head / 2 + base.torso / 4 + base.arms + base.hands + base.feet / 4,
				0, 300, 0, 100
			)),
			'speed': Math.floor(Gfx.map(base.legs + base.feet / 2, 0, 150, 0, 100))
		};
	},


	// Display scores & matching paragraph
	setScores: function(scores, which) {
		let base = document.getElementById("compare");

		// Get average
		let total = 0;
		let values = 0;

		for(let s in scores) {
			total += scores[s];
			values++;
		}

		scores.total = Math.floor(total / values);

		// Display scores
		for(let s in scores) {
			let elem = base.querySelector(`div[name=${s}]`).children[which];
			elem.style.width = scores[s] + '%';
			elem.children[0].innerHTML = scores[s] + '';
		}

		// Display the correct paragraph
		if(which === 0) {
			base = document.getElementById("encounter");

			let paragraphs = base.querySelectorAll('p');
			let chosen = 0;

			if(scores.total < this.frankenstein.total) {
				let diff = this.frankenstein.total - scores.total;
				chosen = diff >= 25 ? 0 : (diff <= 5 ? 2 : 1);
			}
			else chosen = 2;

			paragraphs[Math.floor(chosen)].classList.remove('hidden');
		}
	}

};

window.addEventListener('load', Game.init);


// Log the repo url
function logRepo() {
	console.log("%cOh hi there. Repository link is below, if you want it.", "font-size: 20px");
	console.log("%chttps://github.com/Thatguyjs/Frankenstein-Creative-Project", "font-size: 15px");
}
