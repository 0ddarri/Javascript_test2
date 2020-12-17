/// <reference path="../../lib/p5.global-mode.d.ts"/>

function setup()
{
    createCanvas(800, 600);
    //background(96, 96, 96);
}

function draw()
{
    background(96, 96, 96);

    textSize(20);
    noStroke();
    fill(255, 0, 0);
    text(parseInt(mouseX), 0, mouseY);
    stroke(255, 0, 0);
    line(0, mouseY, windowWidth, mouseY);
    
    noStroke();
    fill(0, 255, 0);
    text(parseInt(mouseY), mouseX, 30);
    stroke(0, 255, 0);
    line(mouseX, 0, mouseX, windowHeight);
}