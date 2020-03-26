class Gameboard {

    constructor() {
        this.gameboard_img = loadImage('assets/TetrisBoard.png'); // Tetris gameboard

        // Variables for holding the current level and speed
        this.level = 1;
        this.speed = 1;

        // x and y of the top left corner of the top left corner of the grid
        this.initial = [145, 73];

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
    
            curr_block.x = curr_block.position[0] * 32 + this.initial[0];
            curr_block.y = curr_block.position[1] * 32 + this.initial[1];

            // Updating gameboard, pieces array, and activeShape attribute
            this.gameboard[curr_block.position[0]][curr_block.position[1]] = curr_block;
            this.pieces.push(curr_block.position);
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
            image(curr_piece.srcImg, curr_piece.x, curr_piece.y)
        }
    }

    /**
     * Translates the activeShape to the provided blocks array. Ensure that the translation is legitimate by checking the blocks array with checkMove(blocks) first.
     * @param {Block[]} blocks Array of block objects with updated positions for the activeShape.
     */
    shiftShape(blocks) { // Blocks are block objects with new positions -- Should be checked with checkMove already.
        let indices_to_move = [];

        for (let i = 0; i < this.activeShape.blocks.length; i++) {
            let curr_block = this.activeShape.blocks[i];
            indices_to_move.push(this.pieces.indexOf(curr_block.position));
        }

        indices_to_move = indices_to_move.reverse(); // Not 100% sure this is necessary anymore

        for (let i = 0; i < indices_to_move.length; i++) {
            let index = indices_to_move[i];

            let x_cord = this.pieces[index][0];
            let y_cord = this.pieces[index][1];

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
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    moveDown() {
        let proposed_blocks = this.activeShape.copyBlocks();

        for (var i = 0; i < proposed_blocks.length; i++) {
            let candidate = proposed_blocks[i];
            candidate.position[1]++;
        }

        if (!this.checkMove(proposed_blocks)) {
            this.activeShape.stopDrop();
            return false;
        } else {
            this.shiftShape(proposed_blocks);
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

        return this.makeMove(proposed_blocks);
    }

    /**
     * Rotates the activeShape 90 degrees to the right.
     * @returns {boolean} true if the move was successfully made, false if it was not.
     */
    rotate() {

        let proposed_blocks = this.activeShape.copyBlocks();

        // The relative translation positions for every shape from stage to stage was input manually

        if (this.activeShape.blocks[0].srcImg == purple_sq) { // T-block rotation
            if (this.activeShape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] - 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status = 0;
                    return true;
                }
            }
        }


        if (this.activeShape.blocks[0].srcImg == darkblue_sq) { // J block rotation
            if (this.activeShape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 2, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 2, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] - 2];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status = 0;
                    return true;
                }
            }
        }


        if (this.activeShape.blocks[0].srcImg == orange_sq) { // L block rotation
            if (this.activeShape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] - 2];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status = 0;
                    return true;
                }
            }
        }


        if (this.activeShape.blocks[0].srcImg == green_sq) { // S block rotation
            if (this.activeShape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] + 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] - 2];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1]];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] + 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status = 0;
                    return true;
                }
            }
        }


        if (this.activeShape.blocks[0].srcImg == pink_sq) { // Z block rotation
            if (this.activeShape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 2, proposed_blocks[0].position[1] - 1];
                proposed_blocks[1].position = [proposed_blocks[1].position[0] + 1, proposed_blocks[1].position[1]];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0], proposed_blocks[0].position[1] + 2];
                proposed_blocks[1].position = [proposed_blocks[1].position[0] - 1, proposed_blocks[1].position[1] + 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] - 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 2, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0] - 1, proposed_blocks[1].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] - 1];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0], proposed_blocks[0].position[1] - 1];
                proposed_blocks[1].position = [proposed_blocks[1].position[0] + 1, proposed_blocks[1].position[1]];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 2];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status = 0;
                    return true;
                }
            }
        }


        if (this.activeShape.blocks[0].srcImg == lightblue_sq) { // Line rotation
            if (this.activeShape.status == 0) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 3];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 2];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 1) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] + 2, proposed_blocks[0].position[1] + 3];
                proposed_blocks[1].position = [proposed_blocks[1].position[0] + 1, proposed_blocks[1].position[1] + 2];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 1];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 2) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] - 3];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status++;
                    return true;
                }
            } else if (this.activeShape.status == 3) {
                proposed_blocks[0].position = [proposed_blocks[0].position[0] - 2, proposed_blocks[0].position[1]];
                proposed_blocks[1].position = [proposed_blocks[1].position[0] - 1, proposed_blocks[1].position[1] + 1];
                proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 2];
                proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 3];
                if (this.makeMove(proposed_blocks)) {
                    this.activeShape.status = 0;
                    return true;
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
        let row_status = {}; // Object that holds the row indices as keys and the number of blocks in the row as an entry
        let full_lines = []; // Holds the indices of all of the full rows

        this.pieces.forEach(function (position) { // Counts the number of blocks in each row.
            let curr_row = position[1];
            row_status[curr_row] = (row_status[curr_row] || 0) + 1;
        });

        Object.entries(row_status).forEach(function (row) { // Finds the lines that are full
            if (row[1] == 10) {
                full_lines.push(parseInt(row[0]));
            }
        });

        for (var i = 0; i < full_lines.length; i++) { // Deletes all the blocks in the full lines
            let full_row = full_lines[i];
            for (var j = 0; j < this.gameboard.length; j++) {
                let curr_block = this.gameboard[j][full_row];
                if (curr_block.static == false) { // Checks that none of the full lines include an activeShape's blocks
                    break;
                } else {
                    if (curr_block.position[0] == 9) {
                        this.deleteLine(full_row);
                    }
                }
            }
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

            this.pieces.splice(this.pieces.indexOf(curr_block.position), 1);
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
                        this.pieces.splice(this.pieces.indexOf(curr_block.position), 1); 

                        // Updating block object with new position
                        curr_block.position = [j, i + change];
                        curr_block.x = curr_block.position[0] * 32 + this.initial[0];
                        curr_block.y = curr_block.position[1] * 32 + this.initial[1];
                                        
                        // Updating new position in the pieces array and the gameboard
                        this.pieces.push(curr_block.position);
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

        rand_shapes.forEach(function (shape) { // Number used correspond to the way randomShape() in sketch.js works
            if (shape == 0) {
                next_shapes.push(Box_img);
            } else if (shape == 1) {
                next_shapes.push(J_img);
            } else if (shape == 2) {
                next_shapes.push(L_img);
            } else if (shape == 3) {
                next_shapes.push(Z_img);
            } else if (shape == 4) {
                next_shapes.push(S_img);
            } else if (shape == 5) {
                next_shapes.push(T_img);
            } else if (shape == 6) {
                next_shapes.push(Line_img);
            }
        })

        imageMode(CENTER);
        // Constant resizing causes blurriness
        next_shapes[0].resize(0, 45);
        image(next_shapes[0], 560, 160);

        next_shapes[1].resize(0, 40);
        image(next_shapes[1], 560, 280);

        next_shapes[2].resize(0, 35);
        image(next_shapes[2], 560, 377);

        next_shapes[3].resize(0, 35);
        image(next_shapes[3], 560, 470);

        next_shapes[4].resize(0, 35);
        image(next_shapes[4], 560, 560);     
    }

    /**
     * Puts the current piece in hold and spawns the hold piece if there is one. 
     */
    hold() {

        let curr_hold = null;
        // hold[0] represents the image object in hold. hold[1] represents the # corresponding the shape.
        if (hold.length != 0) {
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

            this.pieces.splice(this.pieces.indexOf(curr_block.position), 1);                           
            this.gameboard[curr_block.position[0]][curr_block.position[1]] = null;
        }

        // Spawns the shape that was previously on hold.
        if (curr_hold != null) {
            randomShape(curr_hold);          
        } else {
            this.activeShape.shape = false;
        }

    }

}