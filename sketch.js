var gameboard; // Holds the one and only gameboard object for the game.
var activeShape; // The current activeShape (falling shape on the board)
var seconds = 0;
var frames = 0;
var rand_shapes = []; // Array of integers that correspond to random shapes. See randomShape() for more info.

// Block image variables to be used on the grid.
var darkblue_sq;
var green_sq;
var lightblue_sq;
var orange_sq;
var pink_sq;
var purple_sq;
var yellow_sq;

// Full piece image variables to be used in the HOLD and NEXT sections.
var T_img;
var L_img;
var J_img;
var Z_img;
var S_img;
var Line_img;
var Box_img;

var hold = []; // hold[0] represents the image object in hold. hold[1] represents the # corresponding the shape.


/**
 * Setup function runs once when the page is loaded. Loads images, creates canvas and gameboard, and chooses the first few shapes.
 */
function setup() {
  preloadImages();

  createCanvas(650, 750);

  gameboard = new Gameboard();

  for (let i = 0; i < 5; i++) {
    rand_shapes.push(randomNumber());
  }
}

/**
 * Draw function runs 60 times per seconds. Serves to render and animate everything on the screen.
 */
function draw() {
  background(255);

  imageMode(CORNER);
  image(gameboard.gameboard_img, 20, 20); // Displays gameboard background.

  gameboard.displayNext(); // Displays all of the pieces coming up next.

  if (hold.length != 0) {
    image(hold[0], 75, 160); // Displays the hold image.
  }

  if (gameboard.activeShape.shape == false) { // Generates new random shape if there is none on the board.
    randomShape(rand_shapes.shift()); // dequeue
    rand_shapes.push(randomNumber()); // enqueue
  }

  gameboard.display(); // Renders every active block on the grid.

  // Timer
  frames++;
  if (frames == 60) {
    seconds++;
    frames = 0;
    // TODO: Replace with level mechanism that adjusts the rate of moving down
    this.gameboard.moveDown(); // Shifts gameboard down once per second
  }
  fill(255);
  text(seconds.toString(), width / 2 - 5, 60); // Renders seconds text at the top
}

/**
 * Runs once when the mouse is clicked.
 */
function mouseClicked() { // For testing
  // this.gameboard.moveDown();
  // this.gameboard.moveRight();
  // gameboard.rotate(gameboard.activeShape);
  // gameboard.clearLine();
  // noLoop();
  // gameboard.deleteHold();
}

/**
 * Runs any time a key is pressed.
 */
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    gameboard.moveLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    gameboard.moveRight();
  }
  if (keyCode === DOWN_ARROW) {
    gameboard.moveDown();
  }
  if (keyCode === UP_ARROW) {
    gameboard.rotate();
  }
  if (keyCode == 32) { // ASCII for spacebar
    let swtch = true;
    while (swtch) {
      swtch = gameboard.moveDown(); // Moves down until it can't anymore
    }
  }
  if (keyCode == 16) { // ASCII for shift
    gameboard.hold();
  }
}

/**
 * Returns a number that is a random roll of the die from 0 to 7 where 0 to 6 correspond to a shape and 7 is a reroll. 
 */
function randomNumber() {
  let rand_num = Math.floor(Math.random() * 8);
  if (rand_num == 7) {
    rand_num = randomNumber(); 
    return rand_num;
  } else {
    return rand_num;
  }
}

/**
 * Spawns a random shape based on the given integer.
 * @param {int} rand_shape 
 */
function randomShape(rand_shape) {
  activeShape = new Shapes();
  if (rand_shape == 0) {
    activeShape.spawnBox();
  } else if (rand_shape == 1) {
    activeShape.spawnJ();
  } else if (rand_shape == 2) {
    activeShape.spawnL();
  } else if (rand_shape == 3) {
    activeShape.spawnZ();
  } else if (rand_shape == 4) {
    activeShape.spawnS();
  } else if (rand_shape == 5) {
    activeShape.spawnT();
  } else if (rand_shape == 6) {
    activeShape.spawnLine();
  } 
}

/**
 * Loads all of the images.
 */
function preloadImages() {
  darkblue_sq = loadImage("assets/darkblue_sq.png", img => {
    img.resize(32, 32);
  });
  green_sq = loadImage("assets/green_sq.png", img => {
    img.resize(32, 32);
  });
  lightblue_sq = loadImage("assets/lightblue_sq.png", img => {
    img.resize(32, 32);
  });
  orange_sq = loadImage("assets/orange_sq.png", img => {
    img.resize(32, 32);
  });
  pink_sq = loadImage("assets/pink_sq.png", img => {
    img.resize(32, 32);
  });
  purple_sq = loadImage("assets/purple_sq.png", img => {
    img.resize(32, 32);
  });
  yellow_sq = loadImage("assets/yellow_sq.png", img => {
    img.resize(32, 32);
  });

  T_img = loadImage("assets/T_piece.png");
  Z_img= loadImage("assets/Z_piece.png");
  S_img = loadImage("assets/S_piece.png");
  L_img = loadImage("assets/L_piece.png");
  J_img= loadImage("assets/J_piece.png");
  Line_img = loadImage("assets/Line_piece.png");
  Box_img = loadImage("assets/Box_piece.png");
}



