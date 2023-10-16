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
    song.pause();
  }
  cassetteState = 1;
  print(index);
  index = Math.abs(index - 1);
  song = songs[index];
  songName = names[index];
}

function playHiss() {
  if (song.isPlaying()) {
    if (!hissSound.isPlaying()) {
      hissSound.setLoop(true);
      hissSound.play();
      hiss = true;
    } else {
      hissSound.pause();
      hiss = false;
    }
  }
  return hiss;
}

function playWobble() {
  if (song.isPlaying()) {
    wobble = !wobble;
  }
  return wobble;
}

function playLofi() {
  if (song.isPlaying()) {
    lofi = !lofi;
  }
  return lofi;
}
