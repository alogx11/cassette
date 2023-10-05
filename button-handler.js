// handler function for flipping sideButton
function flipSide() {
  print("flipping");
  sideA = !sideButton.getState();
}

function drawCassetteSide() {
  textSize(50 * scale);
  textAlign(CENTER);
  textFont("Helvetica");
  fill(255);
  let side = sideA ? "A" : "B";
  text(
    side,
    sideButton.getX(),
    sideButton.getY() + cassetteImg.height * scale * 0.03
  );
}

// function passed into play button when pressed.
function play() {
  if (!song.isPlaying()) {
    song.play();
  }
}
