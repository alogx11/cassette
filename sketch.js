/*
TODO:
Button Object

Enum cassettee states

flipButton()

Modifier Boutton()

cassettee object ?
*/

let song;
let duration;

function preload() {
  song = loadSound("assets/From-the-Start.mp3");
}

function setup() {
  createCanvas(800, 800);
  background(0);
  duration = song.duration;
}

function draw() {}
