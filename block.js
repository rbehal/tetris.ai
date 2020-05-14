class Block {
  constructor(position, colour_sq, x = 0, y = 0, status = false) {
    this.srcImg = colour_sq;

    this.position = position;
    this.x = x
    this.y = y

    this.static = status;
  }

  /**
   * Returns copy of block object.
   * @returns Returns new block object with the same colour and position.
   */
  copy() {
    return new Block([this.position[0], this.position[1]], this.srcImg, this.x, this.y, status = this.static);
  }
}
