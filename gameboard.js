class Gameboard {

    constructor() { 
        this.gameboard_img = loadImage('TetrisBoard.png'); 

        this.level = 1; 
        this.speed = 1; 

        // x and y of the top left corner
        this.initial = [147,77];

        // Initializing gameboard array
        this.gameboard = []; 
        for (let i = 0;i < 20;i++) {
            var temp = []; 
            for (let j = 0;j<10;j++) {
                temp.push(null);
            }
            this.gameboard.push(temp); 
            temp = []; 
        } 

        console.log(this.gameboard[0].length);
    }

    addSquare(square, position) {
        if (this.gameboard[position[0]][position[1]] != null) { 
            return false; 
        } else {
            square.x = position[0]*32 + this.initial[0];
            square.y = position[1]*32 + this.initial[1];
            this.gameboard[position[0]][position[1]] = square; 
        }
    }

    display() {
        for (let i = 0;i<this.gameboard.length;i++) {
            for (let j = 0;j<this.gameboard[i].length;j++) {
                if (this.gameboard[i][j] != null) {
                    if (this.gameboard[i][j].shape == null) {
                        image(this.gameboard[i][j].srcImg, this.gameboard[i][j].x, this.gameboard[i][j].y)
                    }
                }
            }
        }
    }
}