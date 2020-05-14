class Gameboard {

    constructor() {
        this.gameboard_img = loadImage('assets/TetrisBoard.png'); // Tetris gameboard

        // x and y of the top left corner of the top left corner of the grid
        this.initial = [145, 75];

        // Initializing gameboard array of null values
        this.gameboard = [];
        for (let i = 0; i < 10; i++) {
            var temp = [];
            for (let j = 0; j < 20; j++) {
                temp.push(null);
            }
            this.gameboard.push(temp);
            temp = [];
        }

        // This array holds the position ([y-index,x-index]) of every single block on the grid that is NOT null (all coloured blocks on grid)
        this.pieces = [];

        // Initializing activeShape attribute with placeHolder
        let placeHolder = new Shapes();
        placeHolder.shape = false;
        this.activeShape = placeHolder; // activeShape holds the Shape object of a falling shape at any given time
    }

    /**
     * Adds the block position in the given shape to the gameboard.
     * @param {Shape} shape Shape object that's blocks will be added to the gameboard. 
     */
    addShape(shape) {
        for (var i = 0; i < shape.blocks.length; i++) {
            let curr_block = shape.blocks[i];
    
            // Needs to translate block_sz - 0.30 as the size of the grid is slightly smaller
            curr_block.x = curr_block.position[0] * (block_sz - 0.30) + this.initial[0];
            curr_block.y = curr_block.position[1] * (block_sz - 0.30) + this.initial[1];

            // Updating gameboard, pieces array, and activeShape attribute
            this.gameboard[curr_block.position[0]][curr_block.position[1]] = curr_block;
       
            this.pieces.push([curr_block.position[0], curr_block.position[1]]);
        }
        this.activeShape = shape;
    }

    /**
     * Renders all of the coloured blocks to the screen.
     */
    display() {
        for (let i = 0; i < this.pieces.length; i++) {
            let x_cord = this.pieces[i][0];
            let y_cord = this.pieces[i][1];
            let curr_piece = this.gameboard[x_cord][y_cord];
            imageMode(CORNER);
            if (!(curr_piece === null)) {
                image(curr_piece.srcImg, curr_piece.x, curr_piece.y)
            }
        }
    }

    /**
     * Translates the blocks that make up the activeShape to the position of the blocks in the provided array. Ensure that the translation is legitimate by checking the blocks array with checkMove(blocks) first.
     * @param {Block[]} blocks Array of block objects with updated positions for the activeShape.
     */
    shiftShape(blocks) { // Blocks are block objects with new positions -- Should be checked with checkMove already.
        let indices_to_move = [];

        for (let i = 0; i < this.activeShape.blocks.length; i++) {
            let curr_block = this.activeShape.blocks[i];
            let blockx = curr_block.position[0];
            let blocky = curr_block.position[1];
            for (let j = 0; j < this.pieces.length; j++) {
                if (this.pieces[j][0] === blockx && this.pieces[j][1] === blocky) {
                    indices_to_move.push(j);
                    break;
                }
            }
        }

        indices_to_move = indices_to_move.reverse(); // Not 100% sure this is necessary anymore

        for (let i = 0; i < indices_to_move.length; i++) {
            let index = indices_to_move[i];
            let x_cord;
            let y_cord;

            x_cord = this.pieces[index][0];
            y_cord = this.pieces[index][1];

            // Removes current activeShape pieces from the gameboard and active pieces array.
            this.gameboard[x_cord][y_cord] = null;
            this.pieces.splice(index, 1);
        }   
        // Update activeShape blocks attribute and adds new shape (blocks that make it up) to the board.
        this.activeShape.blocks = blocks;
        this.addShape(this.activeShape);
    }

    /**
     * Checks if the proposed move is legitimate by seeing if there are any other pieces there currently.
     * @param {Block[]} proposed_blocks Array of proposed block objects for the shape translation.
     * @returns {boolean} true if the move can successfully be made, false if it cannot.
     */
    checkMove(proposed_blocks) {
        for (var i = 0; i < proposed_blocks.length; i++) {
            let curr_block = proposed_blocks[i];
            let x_cord = curr_block.position[0];
            let y_cord = curr_block.position[1];

            // Check if it's out of the game bounds
            if (!(y_cord >= 0 && y_cord <= 19 && x_cord >= 0 && x_cord <= 9)) { // Separate to prevent NullPointerException
                return false;
            }

            // The proposed blocks must be in a place that's currently empty OR part of the active shape itself.
            if (!(this.gameboard[x_cord][y_cord] == null || this.gameboard[x_cord][y_cord].static == false)) {
                return false;
            }
        }
        return true;
    }

    /** 
     * Translates the activeShape's blocks one block downwards.
     * @param no_lock_delay {boolean} Optional parameter; if true, piece will drop without the lock delay.
     * @param addScore {boolean} Adds 1 to the score per cell shifted down if true, otherwise does does nothing.
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    moveDown(no_lock_delay, addScore = false) {
        let proposed_blocks = this.activeShape.copyBlocks();

        for (var i = 0; i < proposed_blocks.length; i++) {
            let candidate = proposed_blocks[i];
            candidate.position[1]++;
        }

        if (!this.checkMove(proposed_blocks)) { // If it is on the ground/cannot go any lower.
            if (no_lock_delay) {
                lockDelay = null;
                this.activeShape.stopDrop();
            } else { 
                if (lockDelay == null) { // Creates lock delay if one doesn't exist
                    lockDelay = new LockDelay(level); 
                } else if (lockDelay.time <= 0) {  // If lock delay time is up, lock piece in place.
                    lockDelay = null; 
                    this.activeShape.stopDrop();
                }
            }
            return false;
        } else {
            this.shiftShape(proposed_blocks);
            score += addScore; 
            return true;
        }
    }

    /**
     * Translates the activeShape's blocks one block to the right.
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    moveRight() {
        let proposed_blocks = this.activeShape.copyBlocks();

        for (var i = 0; i < proposed_blocks.length; i++) {
            let candidate = proposed_blocks[i];
            candidate.position[0]++;
        }

        if (lockDelay != null) {
            lockDelay.resetTime();
        }

        return this.makeMove(proposed_blocks);
    }

    /**
     * Translates the activeShape's blocks one block to the left.
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    moveLeft() {
        let proposed_blocks = this.activeShape.copyBlocks();

        for (var i = 0; i < proposed_blocks.length; i++) {
            let candidate = proposed_blocks[i];
            candidate.position[0]--;
        }

        if (lockDelay != null) {
            lockDelay.resetTime();
        }

        return this.makeMove(proposed_blocks);
    }

    /**
     * Translates the activeShape's blocks one block up. !!!Should only be used by the rotate() function!!!
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    moveUp() {
        let proposed_blocks = this.activeShape.copyBlocks();

        for (var i = 0; i < proposed_blocks.length; i++) {
            let candidate = proposed_blocks[i];
            candidate.position[1]--;
        }

        return this.makeMove(proposed_blocks);
    }

    /**
     * Rotates the activeShape 90 degrees to the right.
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    rotate() {
        // The relative translation positions for every shape from stage to stage was input manually
        // The same thing is essentially done for every piece
        if (this.activeShape.blocks[0].srcImg == purple_sq) { // T-block rotation
            if (tRotation()) { // Checks if it can do a regular rotation
                return true;
            } else if (this.moveRight()) { // If not, try a left wall kick
                if (tRotation()) {
                    return true;
                } else {
                    this.moveLeft();
                }
            } else if (this.moveLeft()) { // If not, try a right wall kick
                if (tRotation()) {
                    return true;
                } else {
                    this.moveRight();
                }
            }
            if (this.moveDown()) { // If not, try an up wall kick
                if (tRotation()) {
                    return true;
                } else {
                    this.moveUp();
                }
            }
        }

        if (this.activeShape.blocks[0].srcImg == darkblue_sq) { // J block rotation
            if (jRotation()) {
                return true;
            } else if (this.moveRight()) {
                if (jRotation()) {
                    return true;
                } else {
                    this.moveLeft();
                }
            } else if (this.moveLeft()) {
                if (jRotation()) {
                    return true;
                } else {
                    this.moveRight();
                }
            }
            if (this.moveDown()) {
                if (jRotation()) {
                    return true;
                } else {
                    this.moveUp();
                }
            }
        }

        if (this.activeShape.blocks[0].srcImg == orange_sq) { // L block rotation
            if (lRotation()) {
                return true;
            } else if (this.moveRight()) {
                if (lRotation()) {
                    return true;
                } else {
                    this.moveLeft();
                }
            } else if (this.moveLeft()) {
                if (lRotation()) {
                    return true;
                } else {
                    this.moveRight();
                }
            }
            if (this.moveDown()) {
                if (lRotation()) {
                    return true;
                } else {
                    this.moveUp();
                }
            }
        }

        if (this.activeShape.blocks[0].srcImg == green_sq) { // S block rotation
            if (sRotation()) {
                return true;
            } else if (this.moveRight()) {
                if (sRotation()) {
                    return true;
                } else {
                    this.moveLeft();
                }
            } else if (this.moveLeft()) {
                if (sRotation()) {
                    return true;
                } else {
                    this.moveRight();
                }
            }
            if (this.moveDown()) {
                if (sRotation()) {
                    return true;
                } else {
                    this.moveUp();
                }
            }
        }

        if (this.activeShape.blocks[0].srcImg == pink_sq) { // Z block rotation
            if (zRotation()) {
                return true;
            } else if (this.moveRight()) {
                if (zRotation()) {
                    return true;
                } else {
                    this.moveLeft();
                }
            } else if (this.moveLeft()) {
                if (zRotation()) {
                    return true;
                } else {
                    this.moveRight();
                }
            }
            if (this.moveDown()) {
                if (zRotation()) {
                    return true;
                } else {
                    this.moveUp();
                }
            }
        }

        // Line piece must do extra walll kicks because of the extra length
        if (this.activeShape.blocks[0].srcImg == lightblue_sq) { // Line rotation
            if (lineRotation()) {
                return true;
            } else if (this.moveRight()) {
                if (lineRotation()) {
                    return true;
                } else if (this.moveRight()) {
                    if (lineRotation()) {
                        return true;
                    } else {
                        this.moveLeft();
                        this.moveLeft();
                    }
                } else {
                    this.moveLeft();
                }
            } else if (this.moveLeft()) {
                if (lineRotation()) {
                    return true;
                } else if (this.moveLeft()) {
                    if (lineRotation()) {
                        return true;
                    } else {
                        this.moveRight();
                        this.moveRight();
                    }
                } else {
                    this.moveRight();
                }
            }
            if (this.moveDown()) {
                if (lineRotation()) {
                    return true;
                } else if (this.moveDown()) {
                    if (lineRotation()) {
                        return true;
                    } else if (this.moveDown()) {
                        if (lineRotation()) {
                            return true;
                        } else {
                            for (var i = 0; i < 3; i++) {
                                this.moveUp();
                            }
                        }
                    } else {
                        this.moveUp();
                        this.moveUp();
                    }
                } else {
                    this.moveUp();
                }
            }
        }

        if (this.activeShape.blocks[0].srcImg == yellow_sq) { // Box rotation
            return true;
        }

        return false;
    }

    /**
     * Checks if the move is legitimate, if it is the move is then made.
     * @param {Block[]} proposed_blocks Array of proposed blocks for activeShape movement.
     * @returns {boolean} true if the move was made successfully, false if it was not.
     */
    makeMove(proposed_blocks) {
        if (this.checkMove(proposed_blocks)) {
            this.shiftShape(proposed_blocks);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears all full lines on the board.
     */
    clearLine() {
        let full_lines = getFullLines(this.pieces);

        for (var i = 0; i < full_lines.length; i++) { // Deletes all the blocks in the full lines
            let full_row = full_lines[i];
            for (var j = 0; j < this.gameboard.length; j++) {
                let curr_block = this.gameboard[j][full_row];
                if (curr_block.static == false) { // Checks that none of the full lines include an activeShape's blocks -- This is probably unnecessary
                    break;
                } else {
                    if (curr_block.position[0] == 9) {
                        this.deleteLine(full_row);
                        lines_cleared++;
                    }
                }
            }
        }

        if (full_lines.length == 4) { // Consider creating separate score.js if you want to add T-spins and such.
            score += 1200 * level;
        } else if (full_lines.length == 3) {
            score += 300 * level;
        } else if (full_lines.length == 2) {
            score += 100 * level;
        } else if (full_lines.length == 1) {
            score += 40 * level; 
        }

        if (full_lines.length > 0) { // Shifts all other rows (not full) the appropriate amount to take into account the full row disappearing
            this.shiftBlocks(full_lines);
        }
    }

    /**
     * Helper function for clearLine(). Sets all blocks in full rows to null and removes them from the pieces array.
     * @param {int} full_row Index of a full row.
     */
    deleteLine(full_row) { 
        for (var i = 0; i < this.gameboard.length; i++) {
            let curr_block = this.gameboard[i][full_row];
            this.splicePieces(curr_block.position);
            this.gameboard[i][full_row] = null;
        }
    }

    /**
     * Helper function for clearLine(). Shifts all other rows the appropriate amount to take into account the deletion of the full row.
     * @param {Integer[]} full_lines Indices of all of the full rows.
     */
    shiftBlocks(full_lines) {
        let shiftAmount = {}; // Object whose keys represent a row index and the entries represent the amount of blocks to be shifted down.

        for (var i = 19; i >= 0; i--) {
            let count = 0;
            for (var j = 0; j < full_lines.length; j++) {
                if (full_lines[j] > i) { // Counting the amount of full lines that are above a given row (amount needed to be shifted)
                    count++;
                }
            }
            shiftAmount[i] = count;
        }

        for (let i = 19; i >= 0; i--) { // Shifts down all blocks in every row by the appropriate amount
            let change = Object.entries(shiftAmount)[i][1];
            for (let j = 0; j < 10; j++) {
                if (!full_lines.includes(i)) {
                    let curr_block = this.gameboard[j][i];
                    if (curr_block != null) {

                        // Removing current position from pieces array
                        this.splicePieces(curr_block.position);

                        // Updating block object with new position
                        curr_block.position = [j, i + change];
                        // Needs to translate block_sz - 0.30 as the size of the grid is slightly smaller
                        curr_block.x = curr_block.position[0] * (block_sz - 0.30) + this.initial[0];
                        curr_block.y = curr_block.position[1] * (block_sz - 0.30) + this.initial[1];
                                        
                        // Updating new position in the pieces array and the gameboard
                        this.pieces.push([curr_block.position[0], curr_block.position[1]]);
                        this.gameboard[j][i + change] = curr_block;
                    } else {
                        this.gameboard[j][i + change] = null;
                    }
                }
            }
        }
    }

    /**
     * Renders the upcoming pieces to the screen.
     */
    displayNext() {
        let next_shapes = []; // Holds the p5 image object for the upcoming shapes

        for (var i = 0; i < rand_shapes.length; i++) { // Necessary to separate 3 times to prevent bluriness from constant resizing
            let shape = rand_shapes[i];
            if (i == 0) {
                if (shape == 0) {
                    next_shapes.push(Box_img0);
                } else if (shape == 1) {
                    next_shapes.push(J_img0);
                } else if (shape == 2) {
                    next_shapes.push(L_img0);
                } else if (shape == 3) {
                    next_shapes.push(Z_img0);
                } else if (shape == 4) {
                    next_shapes.push(S_img0);
                } else if (shape == 5) {
                    next_shapes.push(T_img0);
                } else if (shape == 6) {
                    next_shapes.push(Line_img0);
                }
            } else if (i == 1) {
                if (shape == 0) {
                    next_shapes.push(Box_img1);
                } else if (shape == 1) {
                    next_shapes.push(J_img1);
                } else if (shape == 2) {
                    next_shapes.push(L_img1);
                } else if (shape == 3) {
                    next_shapes.push(Z_img1);
                } else if (shape == 4) {
                    next_shapes.push(S_img1);
                } else if (shape == 5) {
                    next_shapes.push(T_img1);
                } else if (shape == 6) {
                    next_shapes.push(Line_img1);
                }
            } else { // After the first two next pieces, they're all the same size
                if (shape == 0) {
                    next_shapes.push(Box_img2);
                } else if (shape == 1) {
                    next_shapes.push(J_img2);
                } else if (shape == 2) {
                    next_shapes.push(L_img2);
                } else if (shape == 3) {
                    next_shapes.push(Z_img2);
                } else if (shape == 4) {
                    next_shapes.push(S_img2);
                } else if (shape == 5) {
                    next_shapes.push(T_img2);
                } else if (shape == 6) {
                    next_shapes.push(Line_img2);
                } 
            }
        }

        imageMode(CENTER);
        // Constant resizing causes blurriness
        image(next_shapes[0], 553, 157);
        image(next_shapes[1], 553, 278);
        image(next_shapes[2], 553, 375);
        image(next_shapes[3], 553, 466);
        image(next_shapes[4], 553, 557);     
    }

    /**
     * Puts the current piece in hold and spawns the hold piece if there is one. 
     * @returns true if the move was made successfully, false if not.
     */
    hold() {
        if (hold[2] == 1) {  // Checks for double shifting
            return false;
        }

        let curr_hold = null;
        // hold[0] represents the image object in hold. hold[1] represents the # corresponding the shape.
        if (hold[1] != null) {
            curr_hold = hold[1]; 
        }

        imageMode(CENTER);
        // Updates hold array to hold the activeShape. 
        // Images are loaded everytime to prevent blurriness
        if (this.activeShape.blocks[0].srcImg == purple_sq) {
            hold[0] = loadImage("assets/T_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 5;
        } else if (this.activeShape.blocks[0].srcImg == lightblue_sq) {
            hold[0] = loadImage("assets/Line_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 6;
        } else if (this.activeShape.blocks[0].srcImg == darkblue_sq) {
            hold[0] = loadImage("assets/J_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 1;
        } else if (this.activeShape.blocks[0].srcImg == yellow_sq) {
            hold[0] = loadImage("assets/Box_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 0;
        } else if (this.activeShape.blocks[0].srcImg == orange_sq) {
            hold[0] = loadImage("assets/L_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 2;
        } else if (this.activeShape.blocks[0].srcImg == green_sq) {
            hold[0] = loadImage("assets/S_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 4;
        } else if (this.activeShape.blocks[0].srcImg == pink_sq) {
            hold[0] = loadImage("assets/Z_piece.png", img => {
                img.resize(0, 45);
            });
            hold[1] = 3;
        }

        // Removes the activeShape from the gameboard
        for (let i = 0; i < this.activeShape.blocks.length; i++) {
            let curr_block = this.activeShape.blocks[i]; 

            this.splicePieces(curr_block.position);                          
            this.gameboard[curr_block.position[0]][curr_block.position[1]] = null;
        }

        // Spawns the shape that was previously on hold.
        if (curr_hold != null) {
            randomShape(curr_hold);          
        } else {
            this.activeShape.shape = false;
        }

        hold[2] = 1; 
        return true;
    }

    /**
     * Moves the active piece down at a speed that's based on the level.
     * @returns the current level
     */
    calculateLevel() {
        if (lines_cleared < 10) {
            if (frames == 53) {
                this.update();
            }
        } else if (lines_cleared < 20) {
            if (frames == 49) {
                this.update();
            }
        } else if (lines_cleared < 30) {
            if (frames == 45) {
                this.update();
            }
        } else if (lines_cleared < 40) {
            if (frames == 41) {
                this.update();
            }
        } else if (lines_cleared < 50) {
            if (frames == 37) {
                this.update();
            }
        } else if (lines_cleared < 60) {
            if (frames == 33) {
                this.update();
            }
        } else if (lines_cleared < 70) {
            if (frames == 28) {
                this.update();
            }
        } else if (lines_cleared < 80) {
            if (frames == 22) {
                this.update();
            }
        } else if (lines_cleared < 90) {
            if (frames == 17) {
                this.update();
            }
        } else if (lines_cleared < 100) {
            if (frames == 11) {
                this.update();
            }
        } else if (lines_cleared < 110) {
            if (frames == 10) {
                this.update();
            }
        } else if (lines_cleared < 120) {
            if (frames == 9) {
                this.update();
            }
        } else if (lines_cleared < 130) {
            if (frames == 8) {
                this.update();
            }
        } else if (lines_cleared < 140) {
            if (frames == 7) {
                this.update();
            }
        } else if (lines_cleared < 160) {
            if (frames == 6) {
                this.update(); 
            }
        } else if (lines_cleared < 180) {
            if (frames == 5) {
                this.update();
            }
        } else if (lines_cleared < 200) { 
            if (frames == 4) {
                this.update();
            }
        } else {
            if (frames == 3) {
                this.update();
            }
        }

        frames++;
        if (frames > 53) { // This is just a failsafe in case something goes wrong and it dosen't switch earlier.
            frames = 0; 
        }

        level = Math.floor(lines_cleared/10) + 1; // Level up once every 10 lines
        return level;
    }

    /**
     * Helper function for calculateLevel()
     */
    update() {
        frames = 0;
        this.moveDown();
    }

    /**
     * Helper function to splice pieces
     * @param {Integer} position [x_cord, y_cord] Integer array with x_cord and y_cord of block needed to remove
     */
    splicePieces(position) {
        let xPos = position[0];
        let yPos = position[1];

        for (let k = 0; k < this.pieces.length; k++) {
            if (this.pieces[k][0] === xPos && this.pieces[k][1] === yPos) {
                this.pieces.splice(k, 1);
                return;
            }
        }
    }

}


class LockDelay {
    constructor(level) { // LockDelay object should only exist while piece is on the ground
        this.time = 35 - level; 
        this.reset = 0; 
    }
    /**
     * Resets the lock delay timer up to 4 times. 
     * @returns {boolean} false if reset too many times, true if reset was successful.
     */
    resetTime() {
        if (this.reset == 4) {
            return false;
        } else {
            this.time = 35 - level;
            this.reset++; 
            return true;
        }
    }
}
