<reference path="../../lib/p5.global-mode.d.ts"/>

function setup()
{
    createCanvas(800, 600);
    //background(96, 96, 96);
}

function draw()
{
    background(90);
    
}

function mousePressed()
{
    circle(mouseX, mouseY, 10);
}