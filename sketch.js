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
  song = loadSound("assets/scv-pit.mp3");
}

function setup() {
  createCanvas(800, 800);
  background(0);
  duration = song.duration;
}

function draw() {
  print(song.currentTime());
  fill(255, 0, 0);
  let val = map(time, 0, duration, 0, width);
  rect(0, 0, val, height);
}

function mousePressed() {
  print("moues press");
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.setVolume(0.5);
    song.play();
    duration = song.duration;
    print(duration);
  }
}

function keyPressed() {
  if (key == "r") {
    song.rate(0.5);
  }
  if (key == "p") {
    song.pan(-1);
  }
}
