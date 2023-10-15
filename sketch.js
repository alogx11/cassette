const scale = 1;

let song;
let songs = new Array(2);
let songName;
let names = new Array(2);
let duration;
let cassetteImg, reelImg;
let font;
let sideButton;
let cassetteX, cassetteY;
let lReel, rReel;
let songControls = new Array(4);
let controlImg = new Array(4);
let circleButtons = new Array(3);
let labelButtons = new Array(3);

function preload() {
  // load songs
  songs[0] = loadSound("assets/From-the-Start.mp3");
  songs[1] = loadSound("assets/You-Know-What-I-Need.mp3");
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
  let randomI = Math.floor(Math.random() * 2);
  names = ["From the Start", "You Know What I Need"];
  song = songs[randomI];
  songName = names[randomI];
  //duration = song.duration;
  cassetteX = windowWidth / 2;
  cassetteY = windowHeight / 2;
  print(cassetteX + " " + cassetteY);
  // create side button
  sideButton = new SideButton(
    cassetteX - cassetteImg.width * scale * 0.394,
    cassetteY + cassetteImg.height * scale * 0.126,
    cassetteImg.width * scale * 0.08,
    scale
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

  // create imgButtons
  // rewind
  songControls[0] = new ImageButton(
    controlImg[0],
    cassetteX - cassetteImg.width * scale * 0.2,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[0].width * scale * 0.165,
    controlImg[0].height * scale * 0.165,
    scale,
    rewind
  );
  // stop
  songControls[1] = new ImageButton(
    controlImg[1],
    cassetteX - cassetteImg.width * scale * 0.06,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[1].width * scale * 0.165,
    controlImg[1].height * scale * 0.165,
    scale,
    stop
  );
  // play
  songControls[2] = new ImageButton(
    controlImg[2],
    cassetteX + cassetteImg.width * scale * 0.06,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[2].width * scale * 0.165,
    controlImg[2].height * scale * 0.165,
    scale,
    play
  );
  // forward
  songControls[3] = new ImageButton(
    controlImg[3],
    cassetteX + cassetteImg.width * scale * 0.2,
    cassetteY + cassetteImg.height * scale * 0.35,
    controlImg[3].width * scale * 0.165,
    controlImg[3].height * scale * 0.165,
    scale,
    forward
  );
  circleButtons[0] = new CircleButton(
    cassetteX - cassetteImg.width * scale * 0.03,
    cassetteY + cassetteImg.width * scale * 0.022,
    cassetteImg.width * scale * 0.02,
    scale
  );
  circleButtons[1] = new CircleButton(
    cassetteX,
    cassetteY + cassetteImg.width * scale * 0.022,
    cassetteImg.width * scale * 0.02,
    scale
  );
  circleButtons[2] = new CircleButton(
    cassetteX + cassetteImg.width * scale * 0.03,
    cassetteY + cassetteImg.width * scale * 0.022,
    cassetteImg.width * scale * 0.02,
    scale
  );

  labelButtons[0] = new LabelButton(
    cassetteX + cassetteImg.width * scale * 0.35,
    cassetteY + cassetteImg.width * scale * 0.17,
    cassetteImg.width * scale * 0.02,
    scale,
    "hiss"
  );
  labelButtons[1] = new LabelButton(
    cassetteX + cassetteImg.width * scale * 0.35,
    cassetteY + cassetteImg.width * scale * 0.2,
    cassetteImg.width * scale * 0.02,
    scale,
    "lofi"
  );
  labelButtons[2] = new LabelButton(
    cassetteX + cassetteImg.width * scale * 0.35,
    cassetteY + cassetteImg.width * scale * 0.23,
    cassetteImg.width * scale * 0.02,
    scale,
    "wobble"
  );
}

function draw() {
  background(255);
  let position = mouseX + " " + mouseY;
  fill(0);
  textSize(20); //print moues coordinates
  textAlign(LEFT);
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
    songName,
    cassetteX - cassetteImg.width * scale * 0.4,
    cassetteY - cassetteImg.height * scale * 0.33
  );
  // display side button
  sideButton.display();
  // display 4 control buttons
  for (let i = 0; i < songControls.length; i++) {
    songControls[i].display();
  }
  //   songControls.forEach(function (element) {
  //     element.display();
  //   });
  for (let i = 0; i < circleButtons.length; i++) {
    circleButtons[i].display();
  }

  for (let i = 0; i < labelButtons.length; i++) {
    labelButtons[i].display();
  }
}

function mousePressed() {
  if (sideButton.isToggled()) {
    sideButton.handleIt();
  }

  for (let i = 0; i < songControls.length; i++) {
    if (songControls[i].isToggled()) {
      songControls[i].handleIt();
    }
  }
  for (let i = 0; i < circleButtons.length; i++) {
    if (circleButtons[i].isToggled()) {
      circleButtons[i].handleIt();
    }
  }
  for (let i = 0; i < labelButtons.length; i++) {
    if (labelButtons[i].isToggled()) {
      labelButtons[i].handleIt();
    }
  }
}
