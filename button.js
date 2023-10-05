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
      if (this.handler) {
        // check if we have a handler function.
        this.handler(); // perform button function
      }
      this.toggled != this.toggled;
      return true;
    }
    return false;
  }

  getState() {
    return this.toggled;
  }
}

class ImageButton extends Button {
  constructor(img, x, y, width, scale) {
    super(x, y);
    this.img = img;
  }

  display() {
    image(this.img, this.x, this.y);
  }
}
