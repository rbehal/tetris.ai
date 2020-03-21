function setup() {
  createCanvas(1000, 1000);
}
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
imgY = loadImage("assets/yellow_sq.png", img => {
  img.resize(32, 32);
});
GameBoard = loadImage("assets/TetrisBoard.png");

function draw() {
  background(220); // rgb value
  // square(100, 100, 100); //top, left corner, and size
  image(GameBoard, 40, 0);
  GameBoard.resize(500, 100);

  // image(imgY, 0, 0);
  // image(imgY, 45, 45);
  // image(imgDB, 90, 90);
  // image(imgY, 0, 100);
}
