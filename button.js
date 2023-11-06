class Button {
  constructor(x, y, width, scale, handler) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = this.width * 0.9;
    this.scale = scale;
    this.toggled = false; // buttons are off by default.
    // confusing name for boolean because boolean of isToggled does not correspond to toggled state.
    this.handler = handler;
  }

  // created a clickable rectangle as a button.
  display() {
    push();
    rectMode(CENTER);
    strokeWeight(6 * this.scale);
    stroke(255);
    noFill();
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  // checks if mouse was inside of button, called when the moues is pressed
  // returns true when click occurs, not if button is toggled on or off
  isToggled() {
    if (
      Math.abs(this.x - mouseX) <= this.width / 2 &&
      Math.abs(this.y - mouseY) <= this.height / 2
    ) {
      print("toggle !");
      this.toggled = !this.toggled;
      return true;
    }
    return false;
  }

  // button functions when pressed
  handleIt() {
    if (this.handler) {
      this.handler();
    }
  }

  // returns the state of the button
  getState() {
    return this.toggled; // returns if button is activated or not
  }

  // returns x position
  getX() {
    return this.x;
  }

  // returns y position
  getY() {
    return this.y;
  }
}

class ImageButton extends Button {
  // same as normal button but uses an image as display
  constructor(image, x, y, width, height, scale, handler) {
    super(x, y, width, scale, handler);
    this.height = height;
    this.image = image;
  }

  // button displays an image
  display() {
    image(this.image, this.x, this.y, this.width, this.height);
  }
}

class CircleButton extends Button {
  constructor(x, y, width, scale, handler) {
    super(x, y, width, scale, handler);
  }

  // displays a circle for button
  display() {
    strokeWeight(this.width * 0.25);
    stroke(255);
    // when button is on, circle is filled
    if (this.toggled) {
      fill(255);
    } else {
      noFill();
    }
    ellipse(this.x, this.y, this.width, this.width);
  }
}

class LabelButton extends CircleButton {
  constructor(x, y, width, scale, label, handler) {
    super(x, y, width, scale, handler);
    this.label = label;
  }

  display() {
    super.display(); // display circle for button
    // add text which is the label
    noStroke();
    textSize(this.width + scale * this.width * 0.4);
    textAlign(LEFT);
    textFont("Helvetica");
    fill(255);
    text(this.label, this.x + this.width, this.y + this.width / 2);
  }

  handleIt() {
    if (this.handler) {
      // label buttons are only toggled when the song is playing.
      return this.handler(); // we can use a boolean return to implement only on when song is playing.
    }
  }
}

class SideButton extends Button {
  constructor(x, y, width, scale, handler) {
    super(x, y, width, scale, handler);
  }

  display() {
    super.display();
    // display text corresponding to side of cassette
    noFill();
    textSize(50 * scale);
    textAlign(CENTER);
    textFont("Helvetica");
    fill(255);
    let side = !this.toggled ? "A" : "B";
    text(side, this.x, this.y + cassetteImg.height * scale * 0.03);
  }
}
