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
let angle = 0;
let button;

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
  displayMagTape();
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
  angle += 0.5;
}
function displayMagTape() {
  fill(0);
  ellipse(230, 214, 150, 150);
  ellipse(417.5, 214, 150, 150);
  fill(255);
  ellipse(230, 214, 50, 50);
  ellipse(417.5, 214, 50, 50);
}

function displayReel() {
  push();
  imageMode(CENTER);
  translate(230, 214);
  rotate(radians(angle));
  image(
    reelImg,
    0,
    0,
    reelImg.width * cassetteScale,
    reelImg.height * cassetteScale
  );
  pop();
  push();
  imageMode(CENTER);
  translate(417.5, 214);
  rotate(radians(angle));
  image(
    reelImg,
    0,
    0,
    reelImg.width * cassetteScale,
    reelImg.height * cassetteScale
  );
  pop();
}
