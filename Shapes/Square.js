class Square {
  constructor() {
    imgY = loadImage("assets/yellow_sq.png", img => {
      img.resize(32, 32);
    });
    this.x = 160;
    this.y = 32;
    this.shape = [];
    this.shape[0] = image(imgY, this.x, this.y);
    this.shape[1] = image(imgY, this.x + 32, this.y);
    this.shape[2] = image(imgY, this.x, this.y + 32);
    this.shape[3] = image(imgY, this.x + 32, this.y + 32);
  }
  display() {}
}
