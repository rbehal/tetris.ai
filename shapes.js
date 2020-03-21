class Shapes {
  constructor() {
    this.srcImg = loadImage("assets/yellow_sq.png", img => {
      img.resize(32, 32);
    });

    this.x = 160;
    this.y = 32;

    this.shape = null;
  }
  display() {}
}
