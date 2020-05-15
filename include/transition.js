// Copyright (c) 2020 Thatguyjs All Rights Reserved.


// Smoothly transition between scenes
const transition = document.getElementById("transition");


function initTransition() {
	Gfx.useCanvas(transition);
	Gfx.resizeCanvas(window.innerWidth, window.innerHeight);
}


async function startTransition() {
	return new Promise((res, rej) => {
		let system = new Gfx.ParticleSystem();
		let pNum = Math.round(Gfx.canvas.width / 35);

		let part = 0;
		let passed = 0;

		system.init(

			// Render
			function(p) {
				Gfx.circle(p.x, p.y, p.width);
			},

			// Update
			function(p) {
				if(p.y + p.width <= 0 && p.height > 0) {
					p.height = -1;
					passed++;
				}
				else if(p.height < 0) {
					return;
				}

				p.y -= p.height;
			}

		);

		for(let i = 0; i < pNum; i++) {
			system.add(new Gfx.Particle(
				i * (Gfx.canvas.width / pNum),
				Gfx.canvas.height + Math.random() * 100,
				Math.random() * 10 + 20,
				Math.random() * 8 + 10
			));
		}

		function frame() {
			Gfx.fill(28, 22, 24);
			Gfx.noStroke();

			system.render();
			system.update();

			if(passed >= pNum) {

				if(part > 0) {
					Gfx.context.globalCompositeOperation = 'source-over';
					return;
				}

				Gfx.context.globalCompositeOperation = 'destination-out';

				for(let pt in system.particles) {
					system.particles[pt].y = Gfx.canvas.height + Math.random() * 100;
					system.particles[pt].height = Math.random() * 8 + 10;
				}

				passed = 0;
				part++;
				res();
			}

			window.requestAnimationFrame(frame);
		}

		frame();
	});
}
