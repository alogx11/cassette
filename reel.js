class Reel {
  constructor(x, y, reelImg, scale, cassetteW, cassetteH, left) {
    this.left = left;
    this.reelImg = reelImg;
    this.scale = scale;
    this.x = x;
    this.left
      ? (this.x -= cassetteW * 0.21 * scale)
      : (this.x += cassetteW * 0.21 * scale);
    this.y = y - cassetteH * 0.077 * scale;
    this.angle = 0;
  }

  display(increment) {
    this.displayMagTape();
    this.displayReel();
    this.angle += increment;
  }

  displayMagTape() {
    // tape circle
    fill(0);
    ellipse(
      this.x,
      this.y,
      this.reelImg.width * 3 * this.scale,
      this.reelImg.width * 3 * this.scale
    );
    // white circle in the middle of tape
    fill(255);
    ellipse(
      this.x,
      this.y,
      this.reelImg.width * this.scale,
      this.reelImg.width * this.scale
    );
  }

  displayReel() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    image(
      this.reelImg,
      0,
      0,
      this.reelImg.width * this.scale,
      this.reelImg.height * this.scale
    );
    pop();
  }
}
