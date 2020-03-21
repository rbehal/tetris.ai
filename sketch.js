var gameboard;
let x = 0;
let y = 0;

imgDB = loadImage("assets/darkblue_sq.png", img => {
  img.resize(32, 32);
});
imgG = loadImage("assets/green_sq.png", img => {
  img.resize(32, 32);
});
imgLB = loadImage("assets/lightblue_sq.png", img => {
  img.resize(32, 32);
});
imgO = loadImage("assets/orange_sq.png", img => {
  img.resize(32, 32);
});
imgP = loadImage("assets/pink_sq.png", img => {
  img.resize(32, 32);
});
imgPU = loadImage("assets/purple_sq.png", img => {
  img.resize(32, 32);
});
GameBoard = loadImage("assets/TetrisBoard.png");

function setup() {
    createCanvas(1000, 1000);
    gameboard = new Gameboard();

  }
  
  function draw() {
    image(gameboard.gameboard_img,20,20);
    square(200,190,32);

  }
 




