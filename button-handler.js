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
    let wobbleVal = noise(wobbleNoise);
    let val = map(wobbleVal, 0, 1, -0.3, 0.3);
    song.rate(1 + val);
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
