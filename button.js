class Button {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.toggled = false;
  }

  display() {
    push();
    strokeWeight(3);
    stroke(255, 0, 0);
    noFill();
    rect(this.x, this.y, this.width, this.width);
    pop();
  }
  isToggled() {
    if (mouseX) this.toggled != this.toggled;
  }
}

class ImageButton extends Button {
  constructor(img, x, y, width) {
    super(x, y);
    this.img = img;
  }

  display() {
    image(this.img, this.x, this.y);
  }
}
