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


function setup() {
    // Loading images
    preloadImages(); 
    createCanvas(650, 750);
    gameboard = new Gameboard();
    zoomby = new Shapes(); 
    zoomby.spawnSquare(); 
  }
  
  function draw() {
    background(0);
    image(gameboard.gameboard_img,20,20);
    
    if (gameboard.activeShape.shape == false) {
      square = new Shapes();
      square.spawnSquare();
    }
 
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
      this.gameboard.shift();
    }
    fill(255);
    text(seconds.toString(), width/2 - 5, 60);

  }
 
  function mouseClicked() { // For testing
    this.gameboard.shift();
  }

  function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      x--;
    } 
    if (keyCode === RIGHT_ARROW) {
      x++;
    } 
    if (keyCode === UP_ARROW && y > 0) {
      y--;
    } 
    if (keyCode === DOWN_ARROW) {
      y++;
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

