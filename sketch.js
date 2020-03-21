var gameboard;
let x = 0;
let y = 0;

function setup() {
    createCanvas(1000, 1000);
    gameboard = new Gameboard();
    // gameboard_img = gameboard.gameboard_img;

  }
  
  function draw() {
    image(gameboard.gameboard_img,20,20);
    square(200,190,32);

  }