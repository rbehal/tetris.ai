var gameboard; // Holds the one and only gameboard object for the game.
var activeShape; // The current activeShape (falling shape on the board)
var lockDelay = null; // lockDelay object is stored in this variable when piece is on the ground
var score = 0;
var seconds = 0;
var frames = 0;
var rand_shapes = []; // Array of integers that correspond to random shapes. See randomShape() for more info.
var keydown = 0;
var timer = 0;
var lines_cleared = 0;
var level = 0;
var gameOver = false; 

// Variables for running moves on intervals when a key is held down.
var lKey;
var rKey;
var dKey;

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

var hold = [null, null, null]; // hold[0] represents the image object in hold. hold[1] represents the # corresponding the shape. hold[2] checks for double shifting.

var startBoard;
var generationNum = 0;
var allGenerations = {};
var currGeneration = [];
var currGenome = null; 
var currGenerationDeaths = [];
var bestGenome = {fitness: 1};
var secondBestGenome = {fitness: 0};



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

  startBoard = {   
    gameboard: copyGameboard(gameboard.gameboard), 
    pieces: copyPieces(gameboard.pieces),
    activeShape: gameboard.activeShape.copy(), 
    rand_shapes: Array.from(rand_shapes),
    score: score,
    level: level,
    lines_cleared: lines_cleared
  };

  currGeneration = createGeneration(); 
  currGenome = currGeneration.pop(); 

  frameRate(10); 
}

/**
 * Draw function runs 60 times per seconds. Serves to render and animate everything on the screen.
 */
function draw() {

  background(255);
  // Displays gameboard background.
  imageMode(CORNER);
  image(gameboard.gameboard_img, 20, 20); 

  gameboard.displayNext(); // Displays all of the pieces coming up next.

  // Displays the hold image.
  if (hold[0] != null) {
    image(hold[0], 75, 160); 
  }

  // Generates new random shape if there is none on the board.
  if (gameboard.activeShape.shape == false) { 
    randomShape(rand_shapes.shift()); // dequeue
    rand_shapes.push(randomNumber()); // enqueue
  }

  gameboard.display(); // Renders every active block on the grid.

  // Timer
  timer++;
  if (timer == 60) {
    seconds++;
    timer = 0;
  }
  fill(255);
  text(seconds.toString(), width / 2 - 5, 60); 

  // Lock delay 
  if (lockDelay != null) {
    lockDelay.time--; 
  }

  // calculateLevel() moves active piece down (speed based on level) and returns level #
  fill(0);
  text("Level: " + gameboard.calculateLevel().toString(), 0, 300);
  text("Score: " + score.toString(), 0, 350);
}
/**
 * Runs once when the mouse is clicked.
 */
function mouseClicked() { // For testing
  // console.log(gameboard.gameboard)
  // noLoop();
  console.log(bestGenome);
  console.log(secondBestGenome);
}

/**
 * Runs any time a key is pressed.
 */
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    lKey = setInterval(function() {gameboard.moveLeft();}, 75); // Runs moveLeft ever 75 ms.
    return false;
  }
  if (keyCode === RIGHT_ARROW) {
    rKey = setInterval(function() {gameboard.moveRight();}, 75);
    return false;
  } 
  if (keyCode === DOWN_ARROW) {
    dKey = setInterval(function() {gameboard.moveDown(false, addScore = true);}, 75);
    return false;
  }
  if (keyCode === UP_ARROW) {
    gameboard.rotate();
    return false;
  }
  if (keyCode == 32) { // ASCII for spacebar
    let swtch = true;
    while (swtch) {
      swtch = gameboard.moveDown(true, addScore = true); // Moves down until it can't anymore
    }
  }
  if (keyCode == 16) { // ASCII for shift
    gameboard.hold();
  }
  if (keyCode == 83) { // ASCII for s
    saveBoard();
  }
  if (keyCode == 82) { // ASCII for r
    reset();
  }
  if (keyCode == 78) { // ASCII for n
    noLoop();
  }
  if (keyCode == 76) { // ASCII for n
    loop();
  }
}

/**
 * Runs any time a key is released.
 */
function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    clearInterval(lKey);
  }
  if (keyCode === RIGHT_ARROW) {
    clearInterval(rKey);
  }
  if (keyCode === DOWN_ARROW) {
    clearInterval(dKey);
  }
}

// Prevents scrolling up and down through the arrow keys
var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);

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
  if (!gameOver) {
    makeBestMove(currGenome);
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

  // Necessary for the NEXT images //

  // First next
  T_img0 = loadImage("assets/T_piece.png", img => {
    img.resize(0, 45);
  });
  Z_img0 = loadImage("assets/Z_piece.png", img => {
    img.resize(0, 45);
  });
  S_img0 = loadImage("assets/S_piece.png", img => {
    img.resize(0, 45);
  });
  L_img0 = loadImage("assets/L_piece.png", img => {
    img.resize(0, 45);
  });
  J_img0 = loadImage("assets/J_piece.png", img => {
    img.resize(0, 45);
  });
  Line_img0 = loadImage("assets/Line_piece.png", img => {
    img.resize(0, 45);
  });
  Box_img0 = loadImage("assets/Box_piece.png", img => {
    img.resize(0, 45);
  }); 

  // Second next
  T_img1 = loadImage("assets/T_piece.png", img => {
    img.resize(0, 40);
  });
  Z_img1 = loadImage("assets/Z_piece.png", img => {
    img.resize(0, 40);
  });
  S_img1 = loadImage("assets/S_piece.png", img => {
    img.resize(0, 40);
  });
  L_img1 = loadImage("assets/L_piece.png", img => {
    img.resize(0, 40);
  });
  J_img1 = loadImage("assets/J_piece.png", img => {
    img.resize(0, 40);
  });
  Line_img1 = loadImage("assets/Line_piece.png", img => {
    img.resize(0, 40);
  });
  Box_img1 = loadImage("assets/Box_piece.png", img => {
    img.resize(0, 40);
  });

  // All other nexts
  T_img2 = loadImage("assets/T_piece.png", img => {
    img.resize(0, 35);
  });
  Z_img2 = loadImage("assets/Z_piece.png", img => {
    img.resize(0, 35);
  });
  S_img2 = loadImage("assets/S_piece.png", img => {
    img.resize(0, 35);
  });
  L_img2 = loadImage("assets/L_piece.png", img => {
    img.resize(0, 35);
  });
  J_img2 = loadImage("assets/J_piece.png", img => {
    img.resize(0, 35);
  });
  Line_img2 = loadImage("assets/Line_piece.png", img => {
    img.resize(0, 35);
  });
  Box_img2 = loadImage("assets/Box_piece.png", img => {
    img.resize(0, 35);
  });
}



