let song;
let duration;
let cassetteImg, reelImg;
let font;
let scale = 1;
let sideButton;
let cassetteX, cassetteY;
let lReel, rReel;

function preload() {
  song = loadSound("assets/From-the-Start.mp3");
  cassetteImg = loadImage("assets/cassette.png");
  font = loadFont("assets/MIXTMK_T.ttf");
  reelImg = loadImage("assets/wheelorange.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);
  imageMode(CENTER);
  duration = song.duration;
  sideButton = new Button(133, 253, 31);
  cassetteX = windowWidth / 2;
  cassetteY = windowHeight / 2;
  lReel = new Reel(
    cassetteX,
    cassetteY,
    reelImg,
    scale,
    cassetteImg.width,
    cassetteImg.height,
    true
  );
  rReel = new Reel(
    cassetteX,
    cassetteY,
    reelImg,
    scale,
    cassetteImg.width,
    cassetteImg.height,
    false
  );
}

function draw() {
  background(255);
  let position = mouseX + " " + mouseY;
  fill(0);
  textSize(20); //print moues coordinates
  textFont("Helvetica");
  text(position, 50, 50);
  lReel.display(0.5);
  rReel.display(0.5);

  image(
    cassetteImg,
    windowWidth / 2,
    windowHeight / 2,
    cassetteImg.width * scale,
    cassetteImg.height * scale
  );
  textSize(40 * scale);
  fill(120);
  textFont(font);
  text(
    "sample text",
    cassetteX - cassetteImg.width * scale * 0.33,
    cassetteY - cassetteImg.height * scale * 0.33
  );
  sideButton.display();
}
