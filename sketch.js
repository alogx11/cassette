let song;
let duration;
let cassetteImg, reelImg;
let font;
let scale = 0.75;
let sideButton;
let cassetteX, cassetteY;
let lReel, rReel;
let sideA;

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
  cassetteX = windowWidth / 2;
  cassetteY = windowHeight / 2;
  print(cassetteX + " " + cassetteY);
  sideButton = new Button(
    cassetteX - cassetteImg.width * scale * 0.394,
    cassetteY + cassetteImg.height * scale * 0.126,
    cassetteImg.width * scale * 0.08,
    scale,
    flipSide
  );
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
  sideA = !sideButton.getState();
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
    cassetteX - cassetteImg.width * scale * 0.25,
    cassetteY - cassetteImg.height * scale * 0.33
  );
  sideButton.display();
  drawCassetteSide();
}

function mousePressed() {
  sideButton.isToggled();
}

function flipSide() {
  print("flipping");
  if (!sideButton.getState()) {
    sideA = false;
  } else {
    sideA = true;
  }
}

function drawCassetteSide() {
  textSize(50 * scale);
  textAlign(CENTER);
  textFont("Helvetica");
  fill(255);
  print(sideA ? "A" : "B");
  let side = sideA ? "A" : "B";
  print(side);
  text(
    side,
    sideButton.getX(),
    sideButton.getY() + cassetteImg.height * scale * 0.03
  );
}
