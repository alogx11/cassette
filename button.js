class Button {
  constructor(x, y, width, scale, handler) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = this.width * 0.9;
    this.scale = scale;
    this.toggled = false;
    print(handler);
    this.handler = handler;
  }

  display() {
    push();
    rectMode(CENTER);
    strokeWeight(6 * this.scale);
    stroke(255);
    noFill();
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
      if (this.handler) {
        // check if we have a handler function.
        this.handler(); // perform button function
      }
    }
    return this.toggled;
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
