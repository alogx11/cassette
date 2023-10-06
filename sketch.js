const scale = 1;

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
  let rwdButton = loadImage("assets/rewindbutton.png");
  let stopButton = loadImage("assets/stopbutton.png");
  let playButton = loadImage("assets/playbutton.png");
  let fwdButton = loadImage("assets/forwardbutton.png");
  controlImg = {
    rwdButton,
    stopButton,
    playButton,
    fwdButton,
  };
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

  // rwdButton = new ImageButton(
  //   controlImg[0],
  //   420,
  //   560,
  //   rewindImg.width / 6,
  //   rewindImg.height / 6
  // );
  // stopButton = new ImageButton(
  //   controlImg[1],
  //   510,
  //   560,
  //   stopImg.width / 6,
  //   stopImg.height / 6
  // );
  // playButton = new ImageButton(
  //   controlImg[2],
  //   590,
  //   560,
  //   playImg.width / 6,
  //   playImg.height / 6,
  //   play
  // );
  // fwdButton = new ImageButton(
  //   controlImg[3],
  //   680,
  //   560,
  //   fwdImg.width / 6,
  //   fwdImg.height / 6
  // );
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
    cassetteX,
    cassetteY,
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
