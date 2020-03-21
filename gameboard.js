class Gameboard {

    constructor() { 
        this.gameboard_img = loadImage('TetrisBoard.png'); 

        this.level = 1; 
        this.speed = 1; 

        // x and y of the top left corner
        this.initial = [145,73];

        // Initializing gameboard array
        this.gameboard = []; 
        for (let i = 0;i < 10;i++) {
            var temp = []; 
            for (let j = 0;j<20;j++) {
                temp.push(null);
            }
            this.gameboard.push(temp); 
            temp = []; 
        } 

        // Current blocks on the board coordinates
        this.pieces = [];

        // Active shape
        this.activeShape; 
    }

    addShape(shape) {
        for (var i = 0;i<shape.blocks.length;i++) {
            let curr_block = shape.blocks[i]; 
            if (this.gameboard[curr_block.position[0]][curr_block.position[1]] != null) {  // Maybe I don't need this if?
                console.log("I ran.")
                return false; 
            } else {
                curr_block.x = curr_block.position[0]*32 + this.initial[0];
                curr_block.y = curr_block.position[1]*32 + this.initial[1];

                this.gameboard[curr_block.position[0]][curr_block.position[1]] = curr_block; 
                this.pieces.push(curr_block.position); 
                this.activeShape = shape;
            }
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

    shift() { // Could try sorting indices array by y value, should wokr
        let indices_to_move = []; 



        for (let i = 0;i<this.activeShape.blocks.length;i++) {
            let curr_block = this.activeShape.blocks[i];
            let x_cord = curr_block.position[0];
            let y_cord = curr_block.position[1];
            let curr_piece = this.gameboard[x_cord][y_cord];
            if((this.gameboard[x_cord][y_cord+1] == null || this.gameboard[x_cord][y_cord+1].static == false) && curr_piece.static == false && y_cord != 19) {                
                indices_to_move.push(this.pieces.indexOf(curr_block.position));
            } else {
                this.activeShape.stopDrop(); 
                return;
            }
        }



        indices_to_move = indices_to_move.reverse(); 

        for (let i = 0;i<indices_to_move.length;i++) {
            let index = indices_to_move[i]; 

            let x_cord = this.pieces[index][0];
            let y_cord = this.pieces[index][1];

            this.pieces.splice(index, 1); 
            this.gameboard[x_cord][y_cord] = null;
        }

        for (let i =0;i<this.activeShape.blocks.length;i++) {
            let curr_block = this.activeShape.blocks[i]; 
            curr_block.position = [curr_block.position[0], curr_block.position[1] + 1]; 
        }

        this.addShape(this.activeShape);
    }
}