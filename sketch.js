let song;
let duration;
let cassetteImg, reelImg;
let font;
let scale = 1;
let angle = 0;
let sideButton;
let cassetteX, cassetteY;

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
  print("center x: " + cassetteX + " center y: " + cassetteY);
  print(
    "width: " +
      cassetteImg.width * scale +
      " height: " +
      cassetteImg.height * scale
  );
}

function draw() {
  background(255);
  let position = mouseX + " " + mouseY;
  fill(0);
  textSize(20); //print moues coordinates
  textFont("Helvetica");
  text(position, 50, 50);
  displayMagTape();
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
  displayReel();
  angle += 0.5;
  sideButton.display();
}

function displayMagTape() {
  // tape circle
  fill(0);
  print(cassetteX - cassetteImg.width * 0.21 * scale);
  ellipse(
    cassetteX - cassetteImg.width * 0.21 * scale,
    cassetteY - cassetteImg.height * 0.077 * scale,
    reelImg.width * 3 * scale,
    reelImg.width * 3 * scale
  );
  ellipse(
    cassetteX + cassetteImg.width * 0.21 * scale,
    cassetteY - cassetteImg.height * 0.077 * scale,
    reelImg.width * 3 * scale,
    reelImg.width * 3 * scale
  );
  // white circle in the middle of tape
  fill(255);
  ellipse(
    cassetteX - cassetteImg.width * 0.21 * scale,
    cassetteY - cassetteImg.height * 0.077 * scale,
    reelImg.width * scale,
    reelImg.width * scale
  );
  ellipse(
    cassetteX + cassetteImg.width * 0.21 * scale,
    cassetteY - cassetteImg.height * 0.077 * scale,
    reelImg.width * scale,
    reelImg.width * scale
  );
}

function displayReel() {
  push();
  print(cassetteX - cassetteImg.width * 0.21);
  translate(
    cassetteX - cassetteImg.width * scale * 0.21,
    cassetteY - cassetteImg.height * 0.077 * scale
  );
  rotate(radians(angle));
  image(reelImg, 0, 0, reelImg.width * scale, reelImg.height * scale);
  pop();
  push();
  translate(
    cassetteX + cassetteImg.width * scale * 0.21,
    cassetteY - cassetteImg.height * 0.077 * scale
  );
  rotate(radians(angle));
  image(reelImg, 0, 0, reelImg.width * scale, reelImg.height * scale);
  pop();
}
