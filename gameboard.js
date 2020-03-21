class Gameboard {

    constructor() { 
        this.gameboard_img = loadImage('TetrisBoard.png'); 

        this.level = 1; 
        this.speed = 1; 

        // x and y of the top left corner
        this.initial = [145,73];

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

        // Active piece coordinates
        this.pieces = [];
    }

    addSquare(square, position) {
        if (this.gameboard[position[0]][position[1]] != null) { 
            return false; 
        } else {
            square.x = position[0]*32 + this.initial[0];
            square.y = position[1]*32 + this.initial[1];

            this.gameboard[position[0]][position[1]] = square; 
            this.pieces.push(position); 
        }
    }

    display() {
        for (let i = 0;i<this.pieces.length;i++) {
            let x_cord = this.pieces[i][0];
            let y_cord = this.pieces[i][1];
            let curr_piece = this.gameboard[x_cord][y_cord];
            image(curr_piece.srcImg, curr_piece.x, curr_piece.y)
        }
    }

    shift() {
        for (let i = 0;i<this.pieces.length;i++) {
            let x_cord = this.pieces[i][0];
            let y_cord = this.pieces[i][1];
            let curr_piece = this.gameboard[x_cord][y_cord];
            if(this.gameboard[x_cord][y_cord+1] == null && curr_piece.static == false && y_cord != 19) {                
                this.pieces.splice(i, 1); 
                this.gameboard[x_cord][y_cord] = null;
                this.addSquare(curr_piece, [x_cord, y_cord+1]);
            } else {
                curr_piece.static = true; 
            }
        }
    }
}