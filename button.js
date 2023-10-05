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
    print(this.toggled);
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
  constructor(image, x, y, w, h, handler) {
    super(x, y, w, h, handler);
    this.image = image;
  }

  display() {
    image(this.image, this.x, this.y, this.w, this.h);
  }
}
