function setup() {
  createCanvas(400, 400);
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
GameBoard = loadImage("assets/TetrisBoard.png");

function draw() {
  background(0);
  image(GameBoard, 40, 0);

  fill(20, 30, 100);
  square(10, 10, 50);
  Square();
}
