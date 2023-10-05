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
