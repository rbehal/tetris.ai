class Shapes {

  constructor() {
    this.blocks = []; // Array of block objects that make up the shape
    this.shape = true; // If it is still an "in-play" shape, i.e. not static, this.shape = true
    this.status = 0; // Representing the current state of rotation. 0 being the state it spawned in.
  }

  // Spawn functions spawn the respective shapes to the board. Return true if possible, stops the game and false if not. (game over)
  spawnBox() {
    this.blocks = [new Block([4, 0], yellow_sq), new Block([5, 0], yellow_sq), new Block([4, 1], yellow_sq), new Block([5, 1], yellow_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  spawnL() {
    this.blocks = [new Block([4, 1], orange_sq), new Block([5, 1], orange_sq), new Block([6, 1], orange_sq), new Block([6, 0], orange_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  spawnJ() {
    this.blocks = [new Block([4, 0], darkblue_sq), new Block([5, 0], darkblue_sq), new Block([6, 1], darkblue_sq), new Block([6, 0], darkblue_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  spawnZ() {
    this.blocks = [new Block([3, 0], pink_sq), new Block([4, 0], pink_sq), new Block([4, 1], pink_sq), new Block([5, 1], pink_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  spawnS() {
    this.blocks = [new Block([3, 1], green_sq), new Block([4, 1], green_sq), new Block([4, 0], green_sq), new Block([5, 0], green_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  spawnLine() {
    this.blocks = [new Block([3, 0], lightblue_sq), new Block([4, 0], lightblue_sq), new Block([5, 0], lightblue_sq), new Block([6, 0], lightblue_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  spawnT() {
    this.blocks = [new Block([4, 1], purple_sq), new Block([5, 1], purple_sq), new Block([6, 1], purple_sq), new Block([5, 0], purple_sq)];

    if (gameboard.checkMove(this.blocks)) {
      gameboard.addShape(this);
      return true;
    } else {
      noLoop();
      return false;
    }
  }

  /**
   * Stops the activeShape from dropping changing the blocks' static attributes to true and setting this.shape to false.
   */
  stopDrop() {
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].static = true;
    }
    this.shape = false;
    hold[2] = 0; // Resets double shifting
    gameboard.clearLine(); // Full lines need to be cleared when a shape stops, before a new shape spawns.
  }

  /**
   * Returns a deep copy of the blocks array for the shape it was called on.
   * @returns {Block[]} Array of blocks. 
   */
  copyBlocks() {
    let blocks_copy = [];
    for (var i = 0; i < this.blocks.length; i++) {
      let curr_block = this.blocks[i];
      let new_block = curr_block.copy();
      blocks_copy.push(new_block);
    }
    return blocks_copy;
  }

}
