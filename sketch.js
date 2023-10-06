const scale = 0.75;

let songA;
let duration;
let cassetteImg, reelImg;
let font;
let sideButton;
let cassetteX, cassetteY;
let lReel, rReel;
let sideA;
let songControls = new Array(4);
let controlImg = new Array(4);

function preload() {
  // load songs
  songA = loadSound("assets/From-the-Start.mp3");
  // load cassette assets
  cassetteImg = loadImage("assets/cassette.png");
  reelImg = loadImage("assets/wheelorange.png");
  // load button images
  controlImg[0] = loadImage("assets/rewindbutton.png");
  controlImg[1] = loadImage("assets/stopbutton.png");
  controlImg[2] = loadImage("assets/playbutton.png");
  controlImg[3] = loadImage("assets/forwardbutton.png");
  // load font
  font = loadFont("assets/MIXTMK_T.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);
  imageMode(CENTER);
  duration = songA.duration;
  cassetteX = windowWidth / 2;
  cassetteY = windowHeight / 2;
  print(cassetteX + " " + cassetteY);
  // create side button
  sideButton = new Button(
    cassetteX - cassetteImg.width * scale * 0.394,
    cassetteY + cassetteImg.height * scale * 0.126,
    cassetteImg.width * scale * 0.08,
    scale,
    flipSide
  );
  // create real objects
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
  // create imgButtons
  songControls[0] = new ImageButton(
    controlImg[0],
    cassetteX - cassetteImg.width * scale * 0.2,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[0].width * scale * 0.165,
    controlImg[0].height * scale * 0.165
  );

  songControls[1] = new ImageButton(
    controlImg[1],
    cassetteX - cassetteImg.width * scale * 0.06,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[1].width * scale * 0.165,
    controlImg[1].height * scale * 0.165
  );
  songControls[2] = new ImageButton(
    controlImg[2],
    cassetteX + cassetteImg.width * scale * 0.06,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[2].width * scale * 0.165,
    controlImg[2].height * scale * 0.165,
    play
  );
  songControls[3] = new ImageButton(
    controlImg[3],
    cassetteX + cassetteImg.width * scale * 0.2,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[3].width * scale * 0.165,
    controlImg[3].height * scale * 0.165
  );
}

function draw() {
  background(255);
  let position = mouseX + " " + mouseY;
  fill(0);
  textSize(20); //print moues coordinates
  textFont("Helvetica");
  text(position, 50, 50);
  // display reels
  lReel.display(0.5);
  rReel.display(0.5);
  // display cassette
  image(
    cassetteImg,
    cassetteX,
    cassetteY,
    cassetteImg.width * scale,
    cassetteImg.height * scale
  );
  textSize(40 * scale);
  fill(120);
  textFont(font);
  // print song name
  text(
    "sample text",
    cassetteX - cassetteImg.width * scale * 0.25,
    cassetteY - cassetteImg.height * scale * 0.33
  );
  // display side button
  sideButton.display();
  drawCassetteSide();
  // display 4 control buttons
  for (let i = 0; i < songControls.length; i++) {
    songControls[i].display();
  }
}

function mousePressed() {
  sideButton.isToggled();
}
