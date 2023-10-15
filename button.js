class Button {
  constructor(x, y, width, scale, handler) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = this.width * 0.9;
    this.scale = scale;
    this.toggled = false;
    this.handler = handler;
  }

  display() {
    push();
    rectMode(CENTER);
    strokeWeight(6 * this.scale);
    stroke(255);
    noFill();
    // if (this.toggled) {
    //   fill(255);
    // } else {
    //   noFill();
    // }
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

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

  handleIt() {
    if (this.handler) {
      this.handler();
    }
  }

  getState() {
    return this.toggled;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

class ImageButton extends Button {
  constructor(image, x, y, width, height, scale, handler) {
    super(x, y, width, scale, handler);
    this.height = height;
    this.image = image;
  }

  display() {
    image(this.image, this.x, this.y, this.width, this.height);
  }
}

class CircleButton extends Button {
  constructor(x, y, width, scale, handler) {
    super(x, y, width, scale, handler);
  }

  display() {
    strokeWeight(4);
    stroke(255);
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
    super.display();
    noStroke();
    textSize(this.width + scale * this.width * 0.4);
    textAlign(LEFT);
    textFont("Helvetica");
    fill(255);
    text(this.label, this.x + this.width, this.y + this.width / 2);
  }
}

class SideButton extends Button {
  constructor(x, y, width, scale, handler) {
    super(x, y, width, scale, handler);
  }

  display() {
    super.display();
    noFill();
    textSize(50 * scale);
    textAlign(CENTER);
    textFont("Helvetica");
    fill(255);
    let side = !this.toggled ? "A" : "B";
    text(side, this.x, this.y + cassetteImg.height * scale * 0.03);
  }
}
