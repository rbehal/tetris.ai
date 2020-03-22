var gameboard;
var zoomby;
var square
let x = 0;
let y = 0;
let seconds = 0; 
let frames = 0;
let darkblue_sq;
let green_sq;
let lightblue_sq;
let orange_sq;
let pink_sq;
let purple_sq;
let yellow_sq;
let rand_shape = 0;


function setup() {
    // Loading images
    preloadImages(); 
    createCanvas(650, 750);
    gameboard = new Gameboard();
  }
  
  function draw() {
    background(0);
    image(gameboard.gameboard_img,20,20);
    
    randomShape();
 
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
      // this.gameboard.shift();
      // this.gameboard.moveDown();
    }
    fill(255);
    text(seconds.toString(), width/2 - 5, 60);

  }
 
  function mouseClicked() { // For testing
    // this.gameboard.moveDown();
    // this.gameboard.moveRight();
    this.gameboard.rotate(this.gameboard.activeShape);
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
  }

  function randomShape() {
    if (gameboard.activeShape.shape == false) {
      // rand_shape = Math.round(Math.random() * 6);
      rand_shape = 2;
      zoomby = new Shapes();
      if (rand_shape == 0) {
        zoomby.spawnSquare();
        rand_shape++; 
      } else if (rand_shape == 1) {
        zoomby.spawnJ();
        rand_shape++;
      } else if (rand_shape == 2) {
        zoomby.spawnL();
        rand_shape++;
      } else if (rand_shape == 3) {
        zoomby.spawnZ();
        rand_shape++;
      } else if (rand_shape == 4) {
        zoomby.spawnS();
        rand_shape++;
      } else if (rand_shape == 5) {
        zoomby.spawnT();
        rand_shape++;
      } else if (rand_shape == 6) {
        zoomby.spawnLine();
        rand_shape++;
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

