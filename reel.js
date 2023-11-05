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
    this.maxW = this.reelImg.width * 3 * this.scale;
    this.minW = this.reelImg.width * 2 * this.scale;
    this.setStroke = false;
    this.hue = 0;
    this.weight = scale * hue * 0.05;
  }

  display(increment) {
    this.displayMagTape();
    this.displayReel();
    if (increment != null) {
      if (sideButton.getState()) {
        increment *= -1;
      }
      this.angle += increment;
    } else {
      this.angle += 0.5;
    }
  }

  displayMagTape() {
    // tape circle
    fill(0);
    let tempW = song.currentTime() / song.duration();
    if (this.left) {
      tempW = 1 - tempW;
    }
    tempW = map(tempW, 0, 1, this.minW, this.maxW);
    if (wobble) {
      let wobbleVal;
      if (this.left) {
        wobbleVal = noise(wobbleNoise);
      } else {
        wobbleVal = noise(wobbleNoise + 100);
      }
      let val = map(wobbleVal, 0, 1, -10, 10);
      // wobbleNoise is incrememted in draw when wobble is true
      tempW += val;
    }
    push();
    if (this.setStroke) {
      colorMode(HSB, 255);
      stroke(this.hue, 255, 255);
      strokeWeight(this.weight);
    }
    ellipse(this.x, this.y, tempW, tempW);
    // white circle in the middle of tape
    fill(255);
    noStroke();
    let val = 0;
    if (wobble) {
      let wobbleVal = noise(wobbleNoise + random(0, 10));
      val = map(wobbleVal, 0, 1, -0.3, 0.3);
    } else {
      val = 0;
    }
    ellipse(
      this.x + val,
      this.y,
      this.reelImg.width * this.scale,
      this.reelImg.width * this.scale
    );
    pop();
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

  flipReel() {
    this.left = !this.left;
  }

  giveStroke() {
    if (song.isPlaying()) {
      // we are only visualizing when song is playing
      this.setStroke = true;
      colorMode(HSB, 255);
      fft.analyze();
      //set hue and weight of stoke based on bass energy
      this.hue = fft.getEnergy("bass");
      this.weight = scale * this.hue * 0.05;
    } else {
      this.hue = 0;
      this.weight = 0;
      this.setStroke = false;
    }
  }
}
