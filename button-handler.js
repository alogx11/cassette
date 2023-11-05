// function passed into play button when pressed.
function play() {
  if (!song.isPlaying()) {
    cassetteState = 2;
    print("playing");
    song.play();
  }
}

function stop() {
  if (song.isPlaying()) {
    // we need to disable effects when we flip the sides.
    for (let i = 0; i < labelButtons.length; i++) {
      if (labelButtons[i].toggled) {
        labelButtons[i].toggled = labelButtons[i].handleIt();
      }
    }
    cassetteState = 1;
    print("stopping");
    song.pause();
  }
}

function forward() {
  if (song.isPlaying()) {
    // fastFoward = true;
    song.pause();
    cassetteState = 3;
    setTimeout(stopForward, 2500);
    fowardSound.play();
  }
}

function stopForward() {
  song.play();
  if (song.currentTime() + 10 >= song.duration()) {
    song.jump(song.duration() - song.currentTime());
  } else {
    song.jump(song.currentTime() + 10);
  }
  cassetteState = 2;
}

function rewind() {
  if (song.isPlaying()) {
    song.pause();
    cassetteState = 0;
    setTimeout(stopForward, 2500);
    fowardSound.play();
  }
}

function stopRewind() {
  song.play();
  if (song.currentTime() - 10 <= 0) {
    song.jump(0);
  } else {
    song.jump(song.currentTime() - 10);
  }
  cassetteState = 2;
}

function flip() {
  if (song.isPlaying()) {
    // pause song on the current side and handle disabling effects
    stop();
  }
  // song is paused
  cassetteState = 1;
  print(index);
  // can be simplified with a !index ?
  index = Math.abs(index - 1);
  song = songs[index];
  songName = names[index];
  rReel.flipReel();
  lReel.flipReel();
}

// play hiss sound
function playHiss() {
  if (song.isPlaying()) {
    if (!hissSound.isPlaying()) {
      // loop hiss sound becuase mp3 is limited length
      hissSound.setLoop(true);
      hissSound.play();
      hiss = true;
    } else {
      // if the song isnt playing, we dont want the hiss to play
      hissSound.pause();
      hiss = false;
    }
  }
  return hiss;
}

//play wobble effect
function playWobble() {
  if (song.isPlaying() && !wobble) {
    wobble = true;
  } else {
    wobble = false;
    song.rate(1);
  }
  return wobble;
}

// play lofi effect
function playLofi() {
  if (song.isPlaying() && !lofi) {
    lofiFilter.freq(2200);
    lofi = true;
  } else {
    lofiFilter.freq(21000);
    lofi = false;
  }
  return lofi;
}

// display gif of lofigirl
function displayLofiGirl() {
  print("display lofi girl");
  image(
    lofiGirl,
    cassetteX,
    cassetteY - scale * cassetteImg.height * 0.075,
    lofiGirl.width * scale * cassetteImg.width * 0.00045,
    lofiGirl.height * scale * cassetteImg.width * 0.00045
  );
}

function displayWaveform() {
  push();
  let waveform = fft.waveform();
  // left and rightmost positions of box
  let xMin = cassetteX - scale * cassetteImg.width * 0.095;
  let xMax = cassetteX + scale * cassetteImg.width * 0.095;
  // min and max values of waveform
  let yMin = cassetteY - scale * cassetteImg.height * 0.163;
  let yMax = cassetteY + scale * cassetteImg.height * 0.0095;
  strokeWeight(scale * 2);
  colorMode(HSB, 255);
  stroke(0, 255, 255);
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, xMin, xMax);
    let y = map(waveform[i], -1, 1, yMin, yMax);
    vertex(x, y);
  }
  endShape();
  pop();
}

function displaySpectrum() {
  push();
  let spectrum = fft.analyze();
  // left and rightmost positions of box
  let xMin = cassetteX - scale * cassetteImg.width * 0.095;
  let xMax = cassetteX + scale * cassetteImg.width * 0.095;
  // min and max values of waveform
  let yMin = cassetteY - scale * cassetteImg.height * 0.163;
  let yMax = cassetteY + scale * cassetteImg.height * 0.0095;
  let y = cassetteY - cassetteImg.height * 0.077 * scale;
  noStroke();
  fill(0, 255, 0);
  for (let i = 0; i < spectrum.length; i++) {
    // fill(spectrum[i].toString(16));
    colorMode(HSB, 255);
    fill(spectrum[i], 255, 255);
    let x = map(i, 0, spectrum.length, xMin, xMax);
    let h = map(spectrum[i], 0, 255, yMax, yMin) - yMax * scale;
    rect(x, y, (xMax - xMin) / spectrum.length, h);
  }
  pop();
}

function myVisual() {
  lReel.giveStroke();
  rReel.giveStroke();
}
