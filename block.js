class Block {
  constructor(position, colour_sq) {
    this.srcImg = colour_sq;

    this.position = position;
    this.x = 0;
    this.y = 0;

    this.static = false;
  }

  copy() {
    return new Block([this.position[0], this.position[1]], this.srcImg);
  }
}
