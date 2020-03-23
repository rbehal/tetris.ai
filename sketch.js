var gameboard;
var activeShape;
var seconds = 0;
var frames = 0;
var rand_shapes = [];

var darkblue_sq;
var green_sq;
var lightblue_sq;
var orange_sq;
var pink_sq;
var purple_sq;
var yellow_sq;

var T_img;
var L_img;
var J_img;
var Z_img;
var S_img;
var Line_img;
var Box_img;

var hold = [];

var x;
var y;



function setup() {
  // Loading images
  preloadImages();
  createCanvas(650, 750);
  gameboard = new Gameboard();



  for (let i = 0; i < 5; i++) {
    rand_shapes.push(randomNumber());
  }
  console.log(rand_shapes);
}

function draw() {
  background(255);

  x = mouseX;
  y = mouseY;

  imageMode(CORNER);
  image(gameboard.gameboard_img, 20, 20);

  gameboard.displayNext();
  if (hold.length != 0) {
    image(hold[0], 75, 160);
  }
  // fill(255);
  // text(mouseX.toString(),100,150);
  // text (mouseY.toString(),100,175);
  if (gameboard.activeShape.shape == false) {
    randomShape(rand_shapes.shift());
    rand_shapes.push(randomNumber());
  }

  gameboard.display();

  // Timer stuff
  frames++;
  if (frames == 60) {
    seconds++;
    frames = 0;
    this.gameboard.moveDown();
  }
  fill(255);
  text(seconds.toString(), width / 2 - 5, 60);

}

function mouseClicked() { // For testing
  // this.gameboard.moveDown();
  // this.gameboard.moveRight();
  // gameboard.rotate(gameboard.activeShape);
  // gameboard.clearLine();
  // noLoop();
  gameboard.deleteHold();
}

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
    gameboard.rotate(gameboard.activeShape);
  }
  if (keyCode == 32) { // ASCII for spacebar
    let swtch = true;
    while (swtch) {
      swtch = gameboard.moveDown();
    }
  }
  if (keyCode == 16) {
    gameboard.hold();
  }
}

function randomNumber() {
  let rand_num = Math.floor(Math.random() * 8);
  if (rand_num == 7) {
    rand_num = randomNumber(); 
    return rand_num;
  } else {
    return rand_num;
  }
}

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



