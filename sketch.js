﻿const scale = 1; // change scale for visuals
let index; // index for song array
let song; // song playing
let songs = new Array(2);
let songName; // name of song playing
let names = new Array(2);
let cassetteImg, reelImg, lofiGirl; // images
let font;
let sideButton; // button obj
let cassetteX, cassetteY; //center x,y
let lReel, rReel; //reel obj
let songControls = new Array(4); // array of img buttons to cnotrol cassette
let controlImg = new Array(4); // array of imgs used in display for img buttons
let circleButtons = new Array(3); // array of cicle bittons
let labelButtons = new Array(3); // array of label buttons
let spinSpeed; // speed the reels spin
let cassetteState; // 0 rewind, 1 pause, 2 play, 3 foward
let fowardSound; // sound played when forward/rewind clicked
let hissSound; // his sound for hiss effect
let hiss, wobble, lofi; // booleans used to control audio effects
let lofiFilter; // filter used to create lofi effect
let fft; // fft
let myButton; // my visual button

let wobbleNoise = 1;

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
  // rewind/fast forward sound
  fowardSound = loadSound("./assets/fastforward.mp3");
  hissSound = loadSound("./assets/hiss.mp3");
  //lofi girl
  lofiGirl = loadImage("./assets/lofigirl.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);
  imageMode(CENTER);
  // audio effects
  hiss = false;
  wobble = false;
  lofi = false;
  // index for the song. randomly choose starting song
  index = Math.floor(Math.random() * 2);
  names = ["From the Start", "You Know What I Need"];
  song = songs[index];
  songName = names[index];
  // rate the reels spin
  spinSpeed = 0.5;
  // center of cassette
  cassetteX = windowWidth / 2;
  cassetteY = windowHeight / 2;
  print(cassetteX + " " + cassetteY);
  // create side button
  sideButton = new SideButton(
    cassetteX - cassetteImg.width * scale * 0.394,
    cassetteY + cassetteImg.height * scale * 0.126,
    cassetteImg.width * scale * 0.08,
    scale,
    flip
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
  // lofi girl
  circleButtons[0] = new CircleButton(
    cassetteX - cassetteImg.width * scale * 0.03,
    cassetteY + cassetteImg.width * scale * 0.022,
    cassetteImg.width * scale * 0.02,
    scale,
    displayLofiGirl
  );
  // spectrum wave
  circleButtons[1] = new CircleButton(
    cassetteX,
    cassetteY + cassetteImg.width * scale * 0.022,
    cassetteImg.width * scale * 0.02,
    scale,
    displaySpectrum
  );
  // wave form
  circleButtons[2] = new CircleButton(
    cassetteX + cassetteImg.width * scale * 0.03,
    cassetteY + cassetteImg.width * scale * 0.022,
    cassetteImg.width * scale * 0.02,
    scale,
    displayWaveform
  );
  // hiss button
  labelButtons[0] = new LabelButton(
    cassetteX + cassetteImg.width * scale * 0.35,
    cassetteY + cassetteImg.width * scale * 0.17,
    cassetteImg.width * scale * 0.02,
    scale,
    "hiss",
    playHiss
  );
  // lofi button
  labelButtons[1] = new LabelButton(
    cassetteX + cassetteImg.width * scale * 0.35,
    cassetteY + cassetteImg.width * scale * 0.2,
    cassetteImg.width * scale * 0.02,
    scale,
    "lofi",

    playLofi
  );
  // wobble
  labelButtons[2] = new LabelButton(
    cassetteX + cassetteImg.width * scale * 0.35,
    cassetteY + cassetteImg.width * scale * 0.23,
    cassetteImg.width * scale * 0.02,
    scale,
    "wobble",
    playWobble
  );
  // lofi filter
  lofiFilter = new p5.LowPass();
  songs[0].disconnect();
  songs[1].disconnect();
  songs[0].connect(lofiFilter);
  songs[1].connect(lofiFilter);
  lofiFilter.freq(21000);
  // initialize fft
  fft = new p5.FFT();
  // my visualizer button
  myButton = new CircleButton(
    cassetteX,
    cassetteY + cassetteImg.width * scale * 0.05,
    cassetteImg.width * scale * 0.02,
    scale,
    myVisual
  );
}

function draw() {
  background(255);
  noStroke();
  // check cassetteState and use to set speed of reels
  switch (cassetteState) {
    case 0: // rewind
      spinSpeed = -10;
      break;
    case 1: // pause
      spinSpeed = 0;
      break;
    case 2: // play
      spinSpeed = 0.5;
      break;
    case 3: // forward
      spinSpeed = 10;
      break;
    default:
      spinSpeed = 0;
  }
  // dispaly reels, spinSpeed set by cassette state
  lReel.display(spinSpeed);
  rReel.display(spinSpeed);
  // check if we are displaying circle button visual
  for (let i = 0; i < circleButtons.length; i++) {
    if (circleButtons[i].toggled) {
      circleButtons[i].handleIt();
    }
  }
  // display cassette
  image(
    cassetteImg,
    cassetteX,
    cassetteY,
    cassetteImg.width * scale,
    cassetteImg.height * scale
  );
  // print song name on cassette
  textSize(40 * scale);
  fill(120);
  textFont(font);
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
  // diaply circle buttons
  for (let i = 0; i < circleButtons.length; i++) {
    circleButtons[i].display();
  }
  // display label buttons
  for (let i = 0; i < labelButtons.length; i++) {
    labelButtons[i].display();
  }
  if (wobble) {
    //labelButtons[2].handleIt();
    let wobbleVal = noise(wobbleNoise);
    let val = map(wobbleVal, 0, 1, -0.1, 0.1);
    song.rate(1 + val);
    wobbleNoise += 0.005;
    print(song.rate());
  }
  /*
  i didnt need this ifs but they were required for previous submission
   */
  if (lofi) {
    print("lofi");
  }
  if (hiss) {
    print("hiss");
  }
  // display for my visual button
  myButton.display();
  if (myButton.toggled) {
    myButton.handleIt();
  }
}

// check if a button was pressed. if pressed call handler to have button perform its function
function mousePressed() {
  if (sideButton.isToggled()) {
    sideButton.handleIt();
  }
  if (myButton.isToggled()) {
    myButton.handleIt();
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
      labelButtons[i].toggled = labelButtons[i].handleIt();
    }
  }
}
