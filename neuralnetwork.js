class NeuralNetwork {

}

/**
 * Creates generations of a specified size by assigning random weights to an object. 
 * @param {Array} parents Array containing genome weights. W
 * @returns {Array} Generation array containing the genome weights. 
 */
function createGeneration(parents) {
    generationNum++; 

    var generation = []; 
    var generationSize = 5; 

    if (parents === undefined) {
        for (var i = 0; i < generationSize; i++) {
            var genomeWeights = {
                rowsCleared: Math.random() - 0.5, 
                weightedHeight: Math.random() - 0.5,
                cumulativeHeight: Math.random() - 0.5, 
                relativeHeight: Math.random() - 0.5,
                holes: Math.random() - 0.5,
                roughness: Math.random() - 0.5
            }
            generation.push(genomeWeights);
        }
    } else {
        var mutationRate = 0.2;
        var mutationProbability = 0.2;

        var baseGenome = crossBreed(parents); 

        for (var i = 0; i < generationSize; i++) {
            var genomeWeights = {
                rowsCleared: baseGenome.rowsCleared, 
                weightedHeight: baseGenome.weightedHeight,
                cumulativeHeight: baseGenome.cumulativeHeight, 
                relativeHeight: baseGenome.relativeHeight,
                holes: baseGenome.holes,
                roughness: baseGenome.roughness
            }

            if (Math.random() < mutationProbability) {
                genomeWeights.rowsCleared = baseGenome.rowsCleared +  (((2*Math.random()) - 1) * mutationRate);
            } 
            if (Math.random() < mutationProbability) {
                genomeWeights.weightedHeight = baseGenome.weightedHeight +  (((2*Math.random()) - 1) * mutationRate);
            } 
            if (Math.random() < mutationProbability) {
                genomeWeights.cumulativeHeight = baseGenome.cumulativeHeight +  (((2*Math.random()) - 1) * mutationRate);
            } 
            if (Math.random() < mutationProbability) {
                genomeWeights.relativeHeight = baseGenome.relativeHeight +  (((2*Math.random()) - 1) * mutationRate);
            } 
            if (Math.random() < mutationProbability) {
                genomeWeights.holes = baseGenome.holes +  (((2*Math.random()) - 1) * mutationRate);
            } 
            if (Math.random() < mutationProbability) {
                genomeWeights.roughness = baseGenome.roughness +  (((2*Math.random()) - 1) * mutationRate);
            } 

            generation.push(genomeWeights);
        }
    }

    return generation; 
}

function terminateGenome() {
    currGenome['fitness'] = score; 
    if (currGeneration.length != 0) {
        currGenerationDeaths.push(currGenome); 
        currGenome = currGeneration.pop(); 
        gameOver = false; 
        reset(startBoard);
        randomShape(rand_shapes.shift());
        rand_shapes.push(randomNumber());
    } else {
        currGenerationDeaths.push(currGenome); 

        currGenerationDeaths.forEach (genome => {
            if (genome.fitness > secondBestGenome.fitness) {
                if (genome.fitness > bestGenome.fitness) {
                    if (secondBestGenome != bestGenome) {
                        secondBestGenome = bestGenome;
                    } 
                    bestGenome = genome; 
                } else {
                    secondBestGenome = genome;
                }
            }
        });

        currGenerationDeaths = [];

        gameOver = false; 
        currGeneration = createGeneration([bestGenome, secondBestGenome]);
    }
}

function crossBreed(parents) {
    var randomParent = function () {
        return Math.floor(Math.random() * 2); 
    }
    var genomeWeights = {
        rowsCleared: parents[randomParent()].rowsCleared, 
        weightedHeight: parents[randomParent()].weightedHeight,
        cumulativeHeight: parents[randomParent()].cumulativeHeight, 
        relativeHeight: parents[randomParent()].relativeHeight,
        holes: parents[randomParent()].holes,
        roughness: parents[randomParent()].roughness
    }
    return genomeWeights; 
}



// FIXME: Can refactor this later, they don't need to be global variables and you take the extra case for this out in reset() too. 
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
  
    return move;
}

/**
 * Resets the board to a passed game state.
 * @param move Formerly saved game state returned with saveBoard().
 */
function reset(move) {
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
function getPossibleMoves() {
    var possibleMovesArr = []; 
    var startPosition = saveBoard(); // Saves very start position

    for (var rotationState = 0; rotationState < 4; rotationState++) {
        for (var i = 0; i < 9; i++) {
            while(gameboard.moveLeft()) { // Moves all the way to the left
            }
            for (var j = 0; j < i; j++) { // Moves incrementally to the right (10 times til the end)
                gameboard.moveRight();
            }
            while(gameboard.moveDown(true, true)) { // Moves all the way down
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
 * Returns the best move as calculated by the provided genome.
 * @param {move} possibleMovesArr Array containing all possible moves. 
 * @param {genomeWeights} genome Genome that contains all the weights.
 * @returns {move} Returns the best move.
 */
function getBestMove(possibleMovesArr, genome) {
    var maxRating = -9999;
    var bestMove; 
    
    for (let move = 0; move < possibleMovesArr.length; move++) {
        var currMove = possibleMovesArr[move];
        var kpis = getMoveKPIs(currMove); 
        var rating = (kpis.rowsCleared * genome.rowsCleared) + (kpis.weightedHeight * genome.weightedHeight);
        rating += (kpis.cumulativeHeight * genome.cumulativeHeight) + (kpis.relativeHeight * genome.relativeHeight);
        rating += (kpis.holes * genome.holes) + (kpis.roughness * genome.roughness);

        if (rating > maxRating) {
            maxRating = rating; 
            bestMove = currMove; 
        }
    }
    
    return bestMove; 
}

/**
 * Gets and executes the best possible move based on the provided genome.
 * @param {genomeWeights} genome Object containing the weights.
 */
function makeBestMove(genome) {
    var possibleMoves = getPossibleMoves(); 
    var bestMove = getBestMove(possibleMoves, genome); 

    reset(bestMove);
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

/**
 * Gets the amount of full lines when provided with a pieces array.
 * @param {Array} pieces Array of activePieces. 
 */
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

/**
 * Gets key performance indicators that the quality of a move is judged on. 
 * @param {move} move A move object.
 */
function getMoveKPIs(move) {
    var rowsCleared = getFullLines(move.pieces).length;

    // Getting array of column heights to get other KPIs
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

    var kpis = {   
        rowsCleared: rowsCleared, 
        weightedHeight: weightedHeight,
        cumulativeHeight: cumulativeHeight, 
        relativeHeight: relativeHeight,
        holes: holes,
        roughness: roughness
    };

    return kpis; 
}