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

var availableMoves = []; 
var preMoveGameboard;
var preMovePieces;
var preMoveActiveShape;
var preMoveRandShapes;
var preMoveLevel;
var preMoveScore;
var preMoveLinesCleared;


function saveBoard() {
    preMoveGameboard = returnGameboard(gameboard.gameboard);
    preMovePieces = returnPieces(gameboard.pieces);
    preMoveActiveShape = gameboard.activeShape.copy();
    preMoveRandShapes = Array.from(rand_shapes);
    preMoveScore = score;
    preMoveLevel = level;
    preMoveLinesCleared = lines_cleared;

    var move = {gameboard: returnGameboard(gameboard.gameboard), 
        pieces: returnPieces(preMovePieces),
        activeShape: gameboard.activeShape.copy(), 
        rand_shapes: Array.from(rand_shapes),
        score: score,
        level: level,
        lines_cleared: lines_cleared
        // fitness: calculateFitness()
    };
    // availableMoves.push(move);
    return move;
}

function reset(move) {
    noLoop()
    if (move === undefined) {
        gameboard.gameboard = returnGameboard(preMoveGameboard);
        gameboard.pieces = returnPieces(preMovePieces);
        gameboard.activeShape = preMoveActiveShape.copy();
        rand_shapes = Array.from(preMoveRandShapes);
        score = preMoveScore;
        level = preMoveLevel;
        lines_cleared = preMoveLinesCleared;
    } else {
        gameboard.gameboard = returnGameboard(move.gameboard);
        gameboard.pieces = returnPieces(move.pieces);
        gameboard.activeShape = move.activeShape.copy();
        rand_shapes = Array.from(move.rand_shapes);
        score = move.score;
        level = move.level;
        lines_cleared = move.lines_cleared;
    }
    loop();
}


function testMove() {

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
            availableMoves.push(saveBoard());
            reset(startPosition);
        }
        gameboard.rotate(); 
        startPosition = saveBoard();
    }
    
}







function returnGameboard(gameboard) {
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


function returnPieces(pieces) {
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