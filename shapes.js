class Shapes {
  constructor() {
    // Must order bottom to top
    this.blocks = [];
    this.shape = true;
  }

  spawnSquare() {
    this.blocks = [new Block([4,1], yellow_sq), new Block([5,1], yellow_sq), new Block([4,0], yellow_sq), new Block([5,0], yellow_sq)];
    gameboard.addShape(this);
  }

  spawnL() {
    this.blocks = [new Block([4,1],orange_sq), new Block([5,1],orange_sq), new Block([6,1],orange_sq), new Block([6,0],orange_sq)];
    gameboard.addShape(this);
  }

  spawnJ() {
    this.blocks = [new Block([4,0],darkblue_sq), new Block([5,0],darkblue_sq), new Block([6,1],darkblue_sq), new Block([6,0],darkblue_sq)];
    gameboard.addShape(this);
  }

  spawnZ() {
    this.blocks = [new Block([5,1],pink_sq), new Block([4,1],pink_sq), new Block([4,0],pink_sq), new Block([3,0],pink_sq)];
    gameboard.addShape(this);
  }

  spawnS() {
    this.blocks = [new Block([3,1],green_sq), new Block([4,1],green_sq), new Block([4,0],green_sq), new Block([5,0],green_sq)];
    gameboard.addShape(this);
  }

  spawnLine() {
    this.blocks = [new Block([3,0],lightblue_sq), new Block([4,0],lightblue_sq), new Block([5,0],lightblue_sq), new Block([6,0],lightblue_sq)];
    gameboard.addShape(this);
  }

  spawnT() {
    this.blocks = [new Block([4,1],purple_sq), new Block([5,1],purple_sq), new Block([6,1],purple_sq), new Block([5,0],purple_sq)];
  }

  stopDrop() {
    for (var i = 0;i<this.blocks.length;i++) {
      this.blocks[i].static = true;
    }
    this.shape = false;
  }
}
