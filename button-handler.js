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
    if (song.currentTime() + 10 >= song.duration()) {
      song.jump(song.duration() - song.currentTime());
    } else {
      song.jump(song.currentTime() + 10);
    }
  }
}

function rewind() {
  if (song.isPlaying()) {
    print("forward");
    if (song.currentTime() - 10 <= 0) {
      song.jump(0);
    } else {
      song.jump(song.currentTime - 10);
    }
  }
}

function flip() {
  if (song.isPlaying()) {
    song.pause();
  }
  print(index);
  index = Math.abs(index - 1);
  song = songs[index];
  songName = names[index];
}
