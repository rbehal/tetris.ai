class Shapes {
  constructor() {
    // Must order bottom to top
    this.blocks = [];
    this.shape = true;
  }

  spawnSquare() {
    this.blocks = [new Block([4,1], yellow_sq), new Block([5,1], yellow_sq), new Block([4,0], yellow_sq), new Block([5,0], yellow_sq)]
    gameboard.addShape(this);
  }

  stopDrop() {
    for (var i = 0;i<this.blocks.length;i++) {
      this.blocks[i].static = true;
    }
    this.shape = false;
  }
}
