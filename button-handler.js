// function passed into play button when pressed.
function play() {
  if (!song.isPlaying()) {
    cassetteState = 2;
    song.play();
  }
}

// stops the song
function stop() {
  if (song.isPlaying()) {
    // we need to disable effects when we flip the sides.
    for (let i = 0; i < labelButtons.length; i++) {
      if (labelButtons[i].toggled) {
        labelButtons[i].toggled = labelButtons[i].handleIt();
      }
    }
    // change state to stop reels from moving
    cassetteState = 1;
    song.pause();
  }
}

// called when forward button is hit
function forward() {
  if (song.isPlaying()) {
    // fastFoward = true;
    song.pause();
    // change state to change reel speed
    cassetteState = 3;
    // we want to pause the song and play the reel sound for 2.5 seconds
    setTimeout(stopForward, 2500);
    // play forward/rewind sound while stopFoward is timedout
    fowardSound.play();
  }
}

function stopForward() {
  song.play();
  if (song.currentTime() + 10 >= song.duration()) {
    // cant go beyond end of song. jump to end
    song.jump(song.duration() - song.currentTime());
  } else {
    song.jump(song.currentTime() + 10); // jump 10 second further into song
  }
  cassetteState = 2;
}

function rewind() {
  if (song.isPlaying()) {
    song.pause();
    // change state to change reel speed
    cassetteState = 0;
    // we want to pause the song and play the reel sound for 2.5 seconds
    setTimeout(stopForward, 2500);
    // play forward/rewind sound while stopRewind is timedout
    fowardSound.play();
  }
}

// helper function for when rewind button is pressed
function stopRewind() {
  // rewind complete, play song again
  song.play();
  if (song.currentTime() - 10 <= 0) {
    // cant go to negative time, back to beginning of song
    song.jump(0);
  } else {
    song.jump(song.currentTime() - 10); // jump 10 seconds back in song
  }
  // set state to 2 to have normal speed
  cassetteState = 2;
}

// called when the cassette is flipped
function flip() {
  if (song.isPlaying()) {
    // pause song on the current side and handle disabling effects
    stop();
  }
  // song is paused
  cassetteState = 1;
  // can be simplified with a !index ?
  index = Math.abs(index - 1);
  // flip the song and songname
  song = songs[index];
  songName = names[index];
  // flip the reels
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
    wobble = true; // songrate when on is handled in draw
  } else {
    wobble = false;
    song.rate(1); // song rate should be normal when wobble is turned off
  }
  return wobble;
}

// play lofi effect
function playLofi() {
  if (song.isPlaying() && !lofi) {
    lofiFilter.freq(2200); // reduce filter. cuts out highend
    lofi = true;
  } else {
    lofiFilter.freq(21000); // play normal freqencies
    lofi = false;
  }
  return lofi;
}

// display gif of lofigirl
function displayLofiGirl() {
  image(
    lofiGirl,
    cassetteX,
    cassetteY - scale * cassetteImg.height * 0.075,
    lofiGirl.width * scale * cassetteImg.width * 0.00045, // scale img down to fit in box
    lofiGirl.height * scale * cassetteImg.width * 0.00045
  );
}

function displayWaveform() {
  push();
  // get array data of waveform
  let waveform = fft.waveform();
  // left and rightmost positions of box
  let xMin = cassetteX - scale * cassetteImg.width * 0.095;
  let xMax = cassetteX + scale * cassetteImg.width * 0.095;
  // min and max values of waveform
  let yMin = cassetteY - scale * cassetteImg.height * 0.163;
  let yMax = cassetteY + scale * cassetteImg.height * 0.0095;
  strokeWeight(scale * 2);
  colorMode(HSB, 255);
  // set color to red
  stroke(0, 255, 255);
  noFill();
  // called for vertex
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    //map i value from 0 to wave length to be between the left nad right side of box
    let x = map(i, 0, waveform.length, xMin, xMax);
    // map waveform[i] to be inside box
    let y = map(waveform[i], -1, 1, yMin, yMax);
    vertex(x, y);
  }
  endShape();
  pop();
}

/*
handler function when the spectrum button is enabled
*/
function displaySpectrum() {
  push();
  // analyze
  let spectrum = fft.analyze();
  // left and rightmost positions of box
  let xMin = cassetteX - scale * cassetteImg.width * 0.095;
  let xMax = cassetteX + scale * cassetteImg.width * 0.095;
  // min and max values of waveform
  let yMin = cassetteY - scale * cassetteImg.height * 0.163;
  let yMax = cassetteY + scale * cassetteImg.height * 0.0095;
  let y = cassetteY - cassetteImg.height * 0.077 * scale;
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    // set HSB to use spectrum [i] value to set color for rect
    colorMode(HSB, 255);
    fill(spectrum[i], 255, 255);
    // map x pos to be inside of the box
    let x = map(i, 0, spectrum.length, xMin, xMax);
    // map height of rect to the value of spectrum[i]
    let h = map(spectrum[i], 0, 255, yMax, yMin) - yMax * scale;
    rect(x, y, (xMax - xMin) / spectrum.length, h);
  }
  pop();
}

/* 
handler called when myButton is toggled
*/
function myVisual() {
  lReel.giveStroke();
  rReel.giveStroke();
}
