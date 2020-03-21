function setup() {
  createCanvas(1000, 1000);
}
imgDB = loadImage("assets/darkblue_sq.png");
imgG = loadImage("assets/green_sq.png");
imgLB = loadImage("assets/lightblue_sq.png");
imgO = loadImage("assets/orange_sq.png");
imgP = loadImage("assets/pink_sq.png");
imgPU = loadImage("assets/purple_sq.png");
imgY = loadImage("assets/yellow_sq.png");
GameBoard = loadImage("assets/TetrisBoard.png");

function draw() {
  background(220); // rgb value
  // square(100, 100, 100); //top, left corner, and size
  image(GameBoard, 0, 0);
  image(imgY, 0, 0);
  image(imgY, 45, 0);
  image(imgDB, 90, 90);
}
