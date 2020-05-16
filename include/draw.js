// Copyright (c) 2020 Thatguyjs All Rights Reserved.


let Gfx = {
	canvas: null,
	context: null,

	// Use canvas element for drawing
	useCanvas: function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	},

	// Resize active canvas
	resizeCanvas: function(width, height) {
		if(!width && width !== 0) width = window.innerWidth;
		if(!height && height !== 0) height = window.innerHeight;

		this.canvas.width = width;
		this.canvas.height = height;
	},


	// Clear canvas
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},


	// Map a value to another range
	map: function(value, start1, stop1, start2, stop2) {
		return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
	},


	// Return a color string from values
	color: function(r, g, b, a) {
		if(!r && r !== 0) r = 0;
		if(!g && g !== 0) g = r, b = r;
		if(!b && b !== 0) a = g, g = r, b = r;
		if(!a && a !== 0) a = 1;

		return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
	},


	// Set the fill color
	fill: function(r, g, b, a) {
		this.context.fillStyle = this.color(r, g, b, a);
	},

	// Remove fill color
	noFill: function() {
		this.context.fillStyle = "rgba(0, 0, 0, 0)";
	},


	// Set the stroke color
	stroke: function(r, g, b, a) {
		this.context.strokeStyle = this.color(r, g, b, a);
	},

	// Remove stroke color
	noStroke: function() {
		this.context.strokeStyle = "rgba(0, 0, 0, 0)";
	},

	// Set stroke thickness
	strokeWeight: function(weight) {
		this.context.lineWidth = weight;
	},


	// Set the background color
	background: function(r, g, b, a) {
		let color = this.context.fillStyle;

		this.fill(r, g, b, a);
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.fillStyle = color;
	},

	// Draw a rectangle
	rect: function(x, y, w, h) {
		this.context.beginPath();
		this.context.rect(x, y, w, h);
		this.context.fill();
		this.context.stroke();
	},

	// Draw a circle
	circle: function(x, y, r) {
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2*Math.PI);
		this.context.fill();
		this.context.stroke();
	}
};


/*
	OBJECTS
*/


// Mouse tracking
Gfx.mouse = {x: 0, y: 0};

document.onmousemove = function(event) {
	Gfx.mouse.x = event.clientX;
	Gfx.mouse.y = event.clientY;
}


// Basic button
class Button {
	constructor(x=0, y=0, w=80, h=25) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.hovering = false;

		this.onhover = function() {};
		this.onclick = function() {};

		document.addEventListener('click', this.click);
	}

	click() {
		console.log('aaa');

		console.log(this);
		if(this.hovering) {
			console.log("Clicked!");
		}
	}

	update() {
		if(Gfx.mouse.x > this.x && Gfx.mouse.x < this.x+this.width &&
		Gfx.mouse.y > this.y && Gfx.mouse.y < this.y+this.height) {

			if(!this.hovering) {
				this.hovering = true;
				this.onhover();
			}
		}
		else {
			if(this.hovering) {
				this.hovering = false;
			}
		}
	}

	render() {
		Gfx.fillStyle = "red";
		Gfx.rect(this.x, this.y, this.width, this.height);
	}
}

Gfx.Button = Button;
Button = undefined;


// Basic particle
class Particle {
	constructor(x, y, width, height, render=null, update=null) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.calls = [render, update];
	}

	render() {
		if(!this.calls[0]) throw new Error("No appropriate render function");
		this.calls[0](this);
	}

	update() {
		if(!this.calls[1]) throw new Error("No appropriate update function");
		this.calls[1](this);
	}
}

Gfx.Particle = Particle;
Particle = undefined;


// Basic particle system
class ParticleSystem {
	constructor(render=null, update=null) {
		this.particles = [];
		this.length = 0;

		this.calls = [render, update];
	}

	// Set the render / update functions
	init(render, update) {
		if(render) this.calls[0] = render;
		if(update) this.calls[1] = update;

		for(let l = 0; l < this.length; l++) {
			this.particles[l].calls = this.calls;
		}
	}


	// Add a new particle
	add(particle) {
		if(!particle.calls[0]) particle.calls[0] = this.calls[0];
		if(!particle.calls[1]) particle.calls[1] = this.calls[1];

		this.particles.push(particle);

		return ++this.length;
	}

	// Replace a particle
	set(index, particle) {
		if(index >= this.length) return;

		this.particles[index] = particle;
	}

	// Remove a particle
	remove(index) {
		if(index >= this.length) return;

		this.particles[index] = null;

		// Remove excess particles
		while(this.particles[this.length - 1] === null) {
			this.particles.splice(--this.length, 1);
		}

		return --this.length;
	}


	// Render the particle system
	render() {
		for(let l = 0; l < this.length; l++) {
			this.particles[l].render();
		}
	}

	// Update the particle system
	update() {
		for(let l = 0; l < this.length; l++) {
			this.particles[l].update();
		}
	}
}

Gfx.ParticleSystem = ParticleSystem;
ParticleSystem = undefined;
