/// <reference path="../../lib/p5.global-mode.d.ts"/>

function setup()
{
    createCanvas(800, 600);
    background(50, 50, 50);
}

function draw()
{
    //background(90);

    line(400, 300, mouseX, mouseY);

    fill(random(0, 255), random(0, 255), random(0, 255));
    circle(mouseX, mouseY, 30);
}

function mousePressed()
{
    background(50, 50, 50);
}