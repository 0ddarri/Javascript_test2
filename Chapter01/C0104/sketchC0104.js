/// <reference path="../../lib/p5.global-mode.d.ts"/>

let mass = [];
let positionX = [];
let positionY = [];
let velocityX = [];
let velocityY = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
	createCanvas(1280, 720);
	noStroke();
	fill(random(0, 255), random(0, 255), random(0, 255), 192);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
	background(32);
	//fill(random(0, 255), random(0, 255), random(0, 255), 192);
	for (var particleA = 0; particleA < mass.length; particleA++) {
		var accelerationX = 0, accelerationY = 0;
		
		for (var particleB = 0; particleB < mass.length; particleB++) {
			if (particleA != particleB) {
				var distanceX = positionX[particleB] - positionX[particleA];
				var distanceY = positionY[particleB] - positionY[particleA];

				var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
				if (distance < 0.5) distance = 0.5;

				var force = (distance - 200) * mass[particleB] / distance;
				accelerationX += force * distanceX;
				accelerationY += force * distanceY;
			}
		}
		
		velocityX[particleA] = velocityX[particleA] * 0.3 + accelerationX * mass[particleA];
		velocityY[particleA] = velocityY[particleA] * 0.3 + accelerationY * mass[particleA];
	}
	
	for (var particle = 0; particle < mass.length; particle++) {
		positionX[particle] += velocityX[particle];
		positionY[particle] += velocityY[particle];
		
		ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function addNewParticle() 
{
	mass.push(random(0.003, 0.03));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(0);
	velocityY.push(0);

	if(mass.length > 300)
	{
		mass.shift();
		positionX.shift();
		positionY.shift();
		velocityX.shift();
		velocityY.shift();
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseClicked() {
	addNewParticle();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function mouseDragged() {
	addNewParticle();
}