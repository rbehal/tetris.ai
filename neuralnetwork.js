class NeuralNetwork {
    constructor(i, h, o) {
        this.input_nodes = i;
        this.hidden_nodes =  h;
        this.output_nodes = o;

        this.createModel();
    }

    createModel() {
        this.model = tf.sequential(); 

        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });

        this.model.add(hidden);

        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });

        this.model.add(output);
    }

    predict(input_arr) {
        const input_tensor = tf.tensor2d([input_arr]);
        const output_tensor = this.model.predict(input_tensor); 

        const output_arr = output_tensor.dataSync();
        return output_arr;
    }
}

var preMoveGameboard;
var preMovePieces;
var preMoveActiveShape;
var preMoveRandShapes;
var preMoveLevel;
var preMoveScore;
var preMoveLinesCleared;
var testMove; 

/**
 * Saves current state of the board in an object and returns that object.
 */
function saveBoard() {
    preMoveGameboard = copyGameboard(gameboard.gameboard);
    preMovePieces = copyPieces(gameboard.pieces);
    preMoveActiveShape = gameboard.activeShape.copy();
    preMoveRandShapes = Array.from(rand_shapes);
    preMoveScore = score;
    preMoveLevel = level;
    preMoveLinesCleared = lines_cleared;

    var move = {   
        gameboard: copyGameboard(gameboard.gameboard), 
        pieces: copyPieces(preMovePieces),
        activeShape: gameboard.activeShape.copy(), 
        rand_shapes: Array.from(rand_shapes),
        score: score,
        level: level,
        lines_cleared: lines_cleared
    };
    testMove = move; 
    return move;
}

/**
 * Resets the board to a passed game state.
 * @param move Formerly saved game state returned with saveBoard().
 */
function reset(move) {
    noLoop()
    if (move === undefined) {
        gameboard.gameboard = copyGameboard(preMoveGameboard);
        gameboard.pieces = copyPieces(preMovePieces);
        gameboard.activeShape = preMoveActiveShape.copy();
        rand_shapes = Array.from(preMoveRandShapes);
        score = preMoveScore;
        level = preMoveLevel;
        lines_cleared = preMoveLinesCleared;
    } else {
        gameboard.gameboard = copyGameboard(move.gameboard);
        gameboard.pieces = copyPieces(move.pieces);
        gameboard.activeShape = move.activeShape.copy();
        rand_shapes = Array.from(move.rand_shapes);
        score = move.score;
        level = move.level;
        lines_cleared = move.lines_cleared;
    }
    loop();
}

/**
 * Tests all possible moves and returns an array of them.
 * @return possibleMoves Array of of all possible moves .
 */
function possibleMoves() {
    var possibleMovesArr = []; 
    var startPosition = saveBoard(); // Saves very start position

    for (var rotationState = 0; rotationState < 4; rotationState++) {
        for (var i = 0; i < 9; i++) {
            while(gameboard.moveLeft()) { // Moves all the way to the left
            }
            for (var j = 0; j < i; j++) { // Moves incrementally to the right (10 times til the end)
                gameboard.moveRight();
            }
            while(gameboard.moveDown()) { // Moves all the way down
            }
            var currentState = saveBoard();
            currentState["rowsCleared"] = currentState.lines_cleared - startPosition.lines_cleared;
            possibleMovesArr.push(saveBoard());
            reset(startPosition);
        }
        gameboard.rotate(); 
        startPosition = saveBoard();
    }

    return possibleMovesArr; 
}

/**
 * Helper function that returns a deep copy of the gameboard array.
 * @param gameboard Gameboard array
 */
function copyGameboard(gameboard) {
    newGameboard = [];
    gameboard.forEach(column => {
        var newColumn = [];
        column.forEach(block => {
            if (!(block === null)) {
                newColumn.push(block.copy());
            } else {
                newColumn.push(null);
            }
        });
        newGameboard.push(newColumn);
    });
    return newGameboard;
}

/**
 * Helper functipn that returns a deep copy of the pieces array
 * @param pieces Pieces array
 */
function copyPieces(pieces) {
    var newPieces = [];
    pieces.forEach(position => {
        var newPosition = [];
        position.forEach(coordinate => {
            newPosition.push(coordinate);
        });
        newPieces.push(newPosition);
    });
    return newPieces;
}

/// Properties of a move ///


function getFullLines(pieces) {
    let row_status = {}; // Object that holds the row indices as keys and the number of blocks in the row as an entry
    let full_lines = []; // Holds the indices of all of the full rows

    pieces.forEach(function (position) { // Counts the number of blocks in each row.
        let curr_row = position[1];
        row_status[curr_row] = (row_status[curr_row] || 0) + 1;
    });

    Object.entries(row_status).forEach(function (row) { // Finds the lines that are full
        if (row[1] == 10) {
            full_lines.push(parseInt(row[0]));
        }
    });

    return full_lines; 
}

function getMoveRating(move) {

    var rowsCleared = getFullLines(move.pieces).length;

    // Getting array of column heights to get other rating parameters
    var columnHeights = []
    var holes = 0; 
    move.gameboard.forEach(function (column) {
        var colHeight = 0;
        var blockAbove = false;

        for (var yIndex = 0; yIndex < 20; yIndex++) {
            if (column[yIndex] != null && blockAbove === false) {
                colHeight = yIndex;
                blockAbove = true; 
            } else if (column[yIndex] === null && blockAbove === true) {
                holes++; 
            }
        }

        columnHeights.push(colHeight);
    });

    // Getting weighted height
    var highestColumn = Math.max.apply(null, columnHeights);
    var lowestColumn = Math.min.apply(null, columnHeights);
    var weightedHeight = Math.pow(highestColumn, 1.5);


    // Getting cumulative heights
    var cumulativeHeight = 0; 
    columnHeights.forEach(function (height) {
        cumulativeHeight += height;
    });

    // Getting relative height
    var relativeHeight = highestColumn - lowestColumn;

    // Getting roughness
    var roughness = 0;
    for (var i = 0; i < columnHeights.length - 1; i++) {
        roughness += Math.abs(columnHeights[i] - columnHeights[i + 1]); 
    }

    var rating = {   
        rowsCleared: rowsCleared, 
        weightedHeight: weightedHeight,
        cumulativeHeight: cumulativeHeight, 
        relativeHeight: relativeHeight,
        holes: holes,
        roughness: roughness
    };

    return rating; 
}