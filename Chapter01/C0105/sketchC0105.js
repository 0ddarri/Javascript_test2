/// <reference path="../../lib/p5.global-mode.d.ts"/>

// Mutual repulsion, with optional gravity

var myParticles = [];
var nParticles = 500;
var maxRadius = 500;
var clicked = false;
var margin = 20
var oldMouseX = 0
var oldMouseY = 0
var count = 0

//let speed = 0;
//==========================================================



function setup() {
    createCanvas(1280, 720);
    noStroke()

    for (var i = 0; i < nParticles; i++) 
    {
        var radius = random(0, maxRadius)
        var angle = random(0, TWO_PI)
        var rx = cos(angle) * radius + width / 2
        var ry = sin(angle) * radius + height / 2
        // var rx = random(width/2 - radius, width/2 + radius);
        // var ry = random(height/2 - radius, height/2 + radius);
        myParticles[i] = new Particle(random(5, 7));
        myParticles[i].set(rx, ry);
    }
}


function keyPressed() {
    for (var i = 0; i < myParticles.length; i++) {
        myParticles[i].px = random(width);
        myParticles[i].py = random(height);
    }
}


//==========================================================
function draw() {
    if (oldMouseX == mouseX && oldMouseY == mouseY) {
        count += 1
    } else {
        count = 0
    }
    print(count)
    background(255);

    var gravityForcex = 0;
    var gravityForcey = 0.05;
    var mutualRepulsionAmount = .5;
    var mouseMutualRepulsionAmount = 500;


    for (var i = 0; i < myParticles.length; i++) {
        var ithParticle = myParticles[i];
        var px = ithParticle.px;
        var py = ithParticle.py;


        for (var j = 0; j < i; j++) {
            var jthParticle = myParticles[j];
            var qx = jthParticle.px;
            var qy = jthParticle.py;

            var dx = px - qx;
            var dy = py - qy;
            var dh = sqrt(dx * dx + dy * dy);
            if (dh > 1.0) {

                var componentInX = dx / dh;
                var componentInY = dy / dh;
                var proportionToDistanceSquared = 1.0 / (dh * dh);

                var repulsionForcex = mutualRepulsionAmount * componentInX * proportionToDistanceSquared;
                var repulsionForcey = mutualRepulsionAmount * componentInY * proportionToDistanceSquared;

                ithParticle.addForce(repulsionForcex, repulsionForcey); // add in forces
                jthParticle.addForce(-repulsionForcex, -repulsionForcey); // add in forces
            }
        }

        var dMouseX = px - mouseX
        var dMouseY = py - mouseY
        var dMouse = sqrt(dMouseX ** 2 + dMouseY ** 2);

        if (dMouse < 400 && dMouse > 8) {

            var mouseComponentInX = dMouseX / dMouse;
            var mouseComponentInY = dMouseY / dMouse;
            var mouseProportionToDistanceSquared = 1.0 / (dMouse ** 2);

            var mouseRepulsionForcex = (mouseMutualRepulsionAmount) * mouseComponentInX * mouseProportionToDistanceSquared;
            var mouseRepulsionForcey = (mouseMutualRepulsionAmount) * mouseComponentInY * mouseProportionToDistanceSquared;

            if (count < 200) {
                ithParticle.addForce(-mouseRepulsionForcex, -mouseRepulsionForcey);


            } else { }
        } else { }


    }
    for (var i = 0; i < myParticles.length; i++) {
        myParticles[i].bPeriodicBoundaries = false;
        myParticles[i].bElasticBoundaries = true;

        // var distanceFromCenter = getDistance(width/2, height/2, myParticles[i].px, myParticles[i].py)
        // if(distanceFromCenter <= maxRadius ){
        //   myParticles[i].update();
        // } // update all locations
        myParticles[i].update();
    }

    for (var i = 0; i < myParticles.length; i++) {
        myParticles[i].render(); // draw all particles
    }

    fill(200, 200, 200);
    noStroke();
    textSize(20);
    textFont('Avenir')

    if (clicked == false) {
        text("Mouse over a dot!", margin * 12 + width / 2 - 60, height / 2);
    }

    oldMouseX = mouseX
    oldMouseY = mouseY
}


//==========================================================
//========================================================== 
function Particle(size) {
    this.px = 0;
    this.py = 0;
    this.vx = 0;
    this.vy = 0;
    this.damping = 0.96;
    this.mass = 1.0;
    this.bLimitVelocities = true;
    this.bPeriodicBoundaries = false;
    this.bElasticBoundaries = true;
    this.size = size


    this.set = function (x, y) {
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
        this.damping = 0.96;
        this.mass = 1.0;
    }

    this.addForce = function (fx, fy) {
        ax = fx / this.mass;
        ay = fy / this.mass;
        this.vx += ax;
        this.vy += ay;
    }

    this.update = function () {
        this.vx *= this.damping;
        this.vy *= this.damping;
        this.limitVelocities();
        this.handleBoundaries();
        this.px += this.vx;
        this.py += this.vy;
    }

    this.limitVelocities = function () {
        if (this.bLimitVelocities) {
            var speed = sqrt(this.vx * this.vx + this.vy * this.vy);
            var maxSpeed = 10;
            if (speed > maxSpeed) {
                this.vx *= maxSpeed / speed;
                this.vy *= maxSpeed / speed;
            }
        }
    }

    this.inBounds = function () {
        return (this.px < width && this.px > 0 && this.py < height && this.py > 0);
    }

    this.handleBoundaries = function () {
        var distanceFromCenter = getDistance(width / 2, height / 2, this.px, this.py)
        // if(distanceFromCenter > maxRadius){
        //   this.px = this.px * .999 + width/2 * .001
        //   this.py = this.py * .999 + height/2 * .001
        // }
        // if(distanceFromCenter > maxRadius){
        //   if(this.px>width/2 + maxRadius)this.vx=-this.vx;
        //   if(this.px<width/2 - maxRadius)this.vx=-this.vx;
        //   if(this.py>height/2 + maxRadius)this.vy=-this.vy;
        //   if(this.py<height/2 - maxRadius)this.vy=-this.vy;      
        // }

        // if(distanceFromCenter > maxRadius){
        //   if(this.px>width/2 + maxRadius)this.px-=maxRadius* 2;
        //   if(this.px<width/2 - maxRadius)this.px+=maxRadius* 2;
        //   if(this.py>height/2 + maxRadius)this.py-=maxRadius * 2;
        //   if(this.py<height/2 - maxRadius)this.py+=maxRadius * 2;     
        // }
        if (this.bPeriodicBoundaries) {
            if (this.px > width) this.px -= width;
            if (this.px < 0) this.px += width;
            if (this.py > height) this.py -= height;
            if (this.py < 0) this.py += height;
        } else if (this.bElasticBoundaries) {
            if (this.px > width) this.vx = -this.vx;
            if (this.px < 0) this.vx = -this.vx;
            if (this.py > height) this.vy = -this.vy;
            if (this.py < 0) this.vy = -this.vy;
        }
    }
    this.render = function (size) {
        var distance = getDistance(mouseX, mouseY, this.px, this.py)
        var factor = map(distance, 0, 75, 3, 1)
        if (distance >= 75) 
        {
            var size = this.size + log(abs(this.vx) * 50)
            //speed++;
        } else 
        {
            clicked = true
            var size = (this.size + log(abs(this.vx) * 50)) * factor
            //speed--;
        }
        var opacity = map(size, 0, 40, 100, 255)
        let speed = map(size,0, 70, 150, 255)

        // var opacity = map(size, 0, 100, 3, 1)
        fill(speed, 0, 0, opacity)

        ellipse(this.px, this.py, size, size);
    }
}

function getDistance(x1, y1, x2, y2) {
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}