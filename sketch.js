var gameboard;
var activeShape;
let seconds = 0;
let frames = 0;
let darkblue_sq;
let green_sq;
let lightblue_sq;
let orange_sq;
let pink_sq;
let purple_sq;
let yellow_sq;
let rand_shapes = [];


function setup() {
  // Loading images
  preloadImages();
  createCanvas(650, 750);
  gameboard = new Gameboard();
}

function draw() {
  background(0);
  image(gameboard.gameboard_img, 20, 20);

  if (rand_shapes.length == 0) {
    for (let i = 0;i < 4;i++) {
      rand_shapes.push(Math.floor(Math.random() * 8));
    }
  } 

  randomShape(rand_shapes.pop());

  gameboard.display();

  // Position of square based on mouse coords -- TESTING
  // square(mouseX,mouseY,32);
  // fill(255);
  // text(mouseX.toString(), 100, 150);
  // text(mouseY.toString(), 100, 175);

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
  noLoop();
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
}

function randomShape(rand_shape) {
  if (gameboard.activeShape.shape == false) {
    activeShape = new Shapes();
    if (rand_shape == 0) {
      activeShape.spawnSquare();
      rand_shape++;
    } else if (rand_shape == 1) {
      activeShape.spawnJ();
      rand_shape++;
    } else if (rand_shape == 2) {
      activeShape.spawnL();
      rand_shape++;
    } else if (rand_shape == 3) {
      activeShape.spawnZ();
      rand_shape++;
    } else if (rand_shape == 4) {
      activeShape.spawnS();
      rand_shape++;
    } else if (rand_shape == 5) {
      activeShape.spawnT();
      rand_shape++;
    } else if (rand_shape == 6) {
      activeShape.spawnLine();
      rand_shape++;
    } else if (rand_shape == 7) {
      randomShape(Math.floor(Math.random() * 8));
    }
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
}

