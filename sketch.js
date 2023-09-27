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
let cassetteImg, reelImg;
let font;
let cassetteScale = 0.5;

function preload() {
  song = loadSound("assets/From-the-Start.mp3");
  cassetteImg = loadImage("assets/cassette.png");
  font = loadFont("assets/MIXTMK_T.ttf");
  reelImg = loadImage("assets/wheelorange.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  duration = song.duration;
}

function draw() {
  background(255);
  let position = mouseX + " " + mouseY;
  fill(0);
  textSize(20);
  textFont("Helvetica");
  text(position, 50, 50);
  image(
    cassetteImg,
    100,
    100,
    cassetteImg.width * cassetteScale,
    cassetteImg.height * cassetteScale
  );
  textSize(15);
  fill(120);
  textFont(font);
  text("sample text", 142, 140);
  displayReel();
}

function displayReel() {
  push();
  imageMode(CENTER);
  image(
    reelImg,
    230,
    214,
    reelImg.width * cassetteScale,
    reelImg.height * cassetteScale
  );
  pop();
}
