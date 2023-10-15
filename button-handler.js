// function passed into play button when pressed.
function play() {
  print(songA);
  if (!songA.isPlaying()) {
    print("playing");
    songA.play();
  }
}

function stop() {
  if (songA.isPlaying()) {
    print("stopping");
    songA.pause();
  }
}

function forward() {
  if (songA.isPlaying()) {
    print("forward");
    //songA.rate(2);
  }
}

function rewind() {
  if (songA.isPlaying()) {
    print("forward");
    // songA.rate(-2);
  }
}
