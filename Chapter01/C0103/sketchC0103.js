/// <reference path="../../lib/p5.global-mode.d.ts"/>

function setup()
{
    createCanvas(800, 600);
    background(96, 96, 96);
}

function draw()
{

}

function mousePressed()
{
    stroke(random(0, 255), random(0, 255), random(0, 255));
    fill(random(0, 255), random(0, 255), random(0, 255));1
    square(random(50, 750), random(50, 550), random(10, 50));
}