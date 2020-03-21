var gameboard;
var zoomby;
let x = 0;
let y = 0;
let seconds = 0; 
let frames = 0;

function setup() {
    createCanvas(650, 750);
    gameboard = new Gameboard();
    zoomby = new Shapes();
    gameboard.addSquare(zoomby,[x,y]);

  }
  
  function draw() {
    background(0);
    image(gameboard.gameboard_img,20,20);
    // gameboard.addSquare(zoomby,[x,y]);
    gameboard.display();

    // Fills every piece of the board -- TESTING
    // for (var i = 0;i<20;i++) {
    //   for (var j = 0;j<10;j++) {
    //     zoomby = new Shapes();
    //     gameboard.addSquare(zoomby,[j,i]);
    //     gameboard.display();
    //   }
    // }
  
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

