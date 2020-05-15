// Copyright (c) 2020 Thatguyjs All Rights Reserved.


// Background setup
const background = document.getElementById("background");

function resize() {
	Gfx.resizeCanvas(window.innerWidth, window.innerHeight);
}


// Background particles
const backParticles = new Gfx.ParticleSystem();

backParticles.init(

	// Render
	function(p) {
		if(p.y - p.width > Gfx.canvas.height) return;

		if(p.width > 20)
			p.width -= Math.random() / 10;

		Gfx.circle(p.x, p.y, p.width);
	},

	// Update
	function(p) {
		p.x += Math.random() * 0.4;
		p.y -= Math.random() / 2 + 0.5;

		if(p.y + p.width <= 0) {
			p.x = (Math.random() - 0.5) * Gfx.canvas.width * 1.5,
			p.y = Math.random() * Gfx.canvas.height * 1.5 + Gfx.canvas.height + 80;
			p.width = 80;
		}
	}

);


function initBackground() {
	Gfx.useCanvas(background);

	window.addEventListener('resize', resize);
	resize();

	// Generate particles
	if(!backParticles.particles.length) {
		for(let i = 0; i < 200; i++) {
			backParticles.add(new Gfx.Particle(
				(Math.random() - 0.5) * Gfx.canvas.width * 1.5,
				Math.random() * Gfx.canvas.height * 1.5 + Gfx.canvas.height + 80,
				80
			));
		}
	}

	update();
}


let doUpdate = true;

function update() {
	Gfx.clear();
	Gfx.fill(36);
	Gfx.noStroke();

	backParticles.render();
	backParticles.update();

	if(doUpdate) window.requestAnimationFrame(update);
}
