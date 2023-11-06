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

  /* displays the magtapes and the images of the reels
  param: increment - added to the angle of the reel to change speed of rotation.

  */
  display(increment) {
    this.displayMagTape();
    this.displayReel();
    if (increment != null) {
      // wheels spin in different directions when cassette is flipped.
      if (sideButton.getState()) {
        increment *= -1;
      }
      this.angle += increment;
    } else {
      this.angle += 0.5;
    }
  }

  /*
  displays the black circles for the mag tapes.
  */
  displayMagTape() {
    // width of tape is dependend on how much of the song has passed
    let tempW = song.currentTime() / song.duration();
    // size of tape depends on which sise of cassette it is on.
    // this creates the illusion of the tape moving from one circle to the other
    if (this.left) {
      tempW = 1 - tempW;
    }
    // map the percentage of the song to the min and max width
    tempW = map(tempW, 0, 1, this.minW, this.maxW);
    // add a wobble to the tape when wobble effect is enabled
    if (wobble) {
      let wobbleVal;
      if (this.left) {
        // we want tapes to wobble independently, so move to a different part of the curve if it is the right tape
        wobbleVal = noise(wobbleNoise);
      } else {
        wobbleVal = noise(wobbleNoise + 100);
      }
      let val = map(wobbleVal, 0, 1, -10, 10);
      // wobbleNoise is incrememted in draw when wobble is true
      tempW += val;
    }
    push();
    noStroke();
    // set stroke is enabled when the song is playing and myVisual is toggled on
    if (this.setStroke) {
      colorMode(HSB, 255);
      stroke(this.hue, 255, 255);
      strokeWeight(this.weight);
    }
    // draw black circle for tape
    fill(0);
    ellipse(this.x, this.y, tempW, tempW);
    // white circle in the middle of tape
    fill(255);
    ellipse(
      this.x,
      this.y,
      this.reelImg.width * this.scale,
      this.reelImg.width * this.scale
    );
    pop();
  }

  // display image of the reel
  displayReel() {
    push();
    // set origin to x,y where the reel should be
    translate(this.x, this.y);
    // rotate the image around the origin
    rotate(radians(this.angle));
    // origin is set where reel should be, so it is at 0,0
    image(
      this.reelImg,
      0,
      0,
      this.reelImg.width * this.scale,
      this.reelImg.height * this.scale
    );
    pop();
  }

  // when the reel is flipped, left becomes right, right becomes left
  flipReel() {
    this.left = !this.left;
  }

  // method called when myButton is toggled on
  giveStroke() {
    if (song.isPlaying() && myButton.toggled) {
      // we are only visualizing when song is playing
      this.setStroke = true;
      colorMode(HSB, 255);
      fft.analyze();
      //set hue and weight of stoke based on bass energy
      this.hue = fft.getEnergy("bass");
      this.weight = scale * this.hue * 0.05;
    } else {
      // no effect when song is not playing or button not toggled
      this.hue = 0;
      this.weight = 0;
      this.setStroke = false;
    }
  }
}
