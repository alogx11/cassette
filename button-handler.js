// function passed into play button when pressed.
function play() {
  if (!song.isPlaying()) {
    print("playing");
    song.play();
  }
}

function stop() {
  if (song.isPlaying()) {
    print("stopping");
    song.pause();
  }
}

function forward() {
  if (song.isPlaying()) {
    print("forward");
    //songA.rate(2);
  }
}

function rewind() {
  if (song.isPlaying()) {
    print("forward");
    // songA.rate(-2);
  }
}

function flip() {}
