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

        // Active shapes
        let placeHolder = new Shapes(); 
        placeHolder.shape = false; 
        this.activeShape = placeHolder; 
    }

    addShape(shape) {
        for (var i = 0;i<shape.blocks.length;i++) {
            let curr_block = shape.blocks[i]; 
            if (this.gameboard[curr_block.position[0]][curr_block.position[1]] != null) {  
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

    shift(blocks) { // Blocks are block objects with new positions -- Should be checked with checkMove already.
        let indices_to_move = []; 

        for (let i = 0;i<this.activeShape.blocks.length;i++) {  
            let curr_block = this.activeShape.blocks[i];            
            indices_to_move.push(this.pieces.indexOf(curr_block.position));
        }

        indices_to_move = indices_to_move.reverse(); 

        for (let i = 0;i<indices_to_move.length;i++) {
            let index = indices_to_move[i]; 

            let x_cord = this.pieces[index][0];
            let y_cord = this.pieces[index][1];

            this.gameboard[x_cord][y_cord] = null;
            this.pieces.splice(index, 1); 
        }

        this.activeShape.blocks = blocks;

        this.addShape(this.activeShape);
    }

    checkMove(blocks) {
        for (var i = 0;i<blocks.length;i++) {
            let curr_block = blocks[i]; 
            let x_cord = curr_block.position[0];
            let y_cord = curr_block.position[1];

            if (!(y_cord <= 19 && x_cord >= 0 && x_cord <= 9)) { // Separate to prevent NullPointerException
                return false;
            }

            if (!((this.gameboard[x_cord][y_cord] == null || this.gameboard[x_cord][y_cord].static == false) && curr_block.static == false)) {  
                return false; 
            }
        }
        return true;
    }
 
    moveDown() {
        let proposed_blocks = this.activeShape.copyBlocks(); 

        for (var i = 0;i<proposed_blocks.length;i++) {
            let candidate = proposed_blocks[i]; 
            candidate.position[1]++;
        }

        if(!this.checkMove(proposed_blocks)) {
            this.activeShape.stopDrop(); 
            return false;
        } else {
            this.shift(proposed_blocks);
            return true;
        }
    }

    moveRight() {
        let proposed_blocks = this.activeShape.copyBlocks(); 

        for (var i = 0;i<proposed_blocks.length;i++) {
            let candidate = proposed_blocks[i]; 
            candidate.position[0]++;
        }

        return this.makeMove(proposed_blocks);
    }

    moveLeft() {
        let proposed_blocks = this.activeShape.copyBlocks(); 

        for (var i = 0;i<proposed_blocks.length;i++) {
            let candidate = proposed_blocks[i]; 
            candidate.position[0]--;
        }

        return this.makeMove(proposed_blocks);
    }

    rotate(shape) {

        let proposed_blocks = this.activeShape.copyBlocks(); 


        if (shape.blocks[0].srcImg == purple_sq) { // T-block rotation
            if (shape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                }
            } else if (shape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                } 
            } else if (shape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] - 1];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                }
            } else if (shape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    shape.status = 0;
                    return true;
                }
            }
        }


        if (shape.blocks[0].srcImg == darkblue_sq) { // J block rotation
            if (shape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 2, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                }
            } else if (shape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                } 
            } else if (shape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 2, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] - 2];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                }
            } else if (shape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    shape.status = 0;
                    return true;
                }
            }
        }


        if (shape.blocks[0].srcImg == orange_sq) { // L block rotation
            if (shape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                }
            } else if (shape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                } 
            } else if (shape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] - 2];
                if (this.makeMove(proposed_blocks)) {
                    shape.status++;
                    return true;
                }
            } else if (shape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    shape.status = 0;
                    return true;
                }
            }
        }



    }

    makeMove(proposed_blocks) {
        if(this.checkMove(proposed_blocks)) {
            this.shift(proposed_blocks);
            return true;
        } else {
            return false;
        }
    }

}