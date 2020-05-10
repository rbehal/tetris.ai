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

function testMove() {

    saveBoard(); 
    // while (gameboard.moveLeft()) {
    // }
    // while (gameboard.moveDown()) {
    // }

    // for (var i = 0; i < 9; i++) {
    //     while(gameboard.moveLeft()) {
    //     }
    //     for (var j = 0; j < i; j++) {
    //         gameboard.moveRight();
    //     }
    //     while(gameboard.moveDown()) {
    //     }
    //     // saveMove();
    //     reset();
    // }
    // reset();

    // console.log(availableMoves);
}

function saveBoard() {
    preMoveGameboard = returnGameboard(gameboard.gameboard);
    preMovePieces = returnPieces(gameboard.pieces);
    preMoveActiveShape = gameboard.activeShape.copy();
    preMoveRandShapes = Array.from(rand_shapes);
    preMoveScore = score;
    preMoveLevel = level;
    preMoveLinesCleared = lines_cleared;
}


function saveMove() {
    var move = {gameboard: [], 
                pieces: Array.from(gameboard.pieces),
                activeShape: gameboard.activeShape.copy(), 
                // fitness: calculateFitness()
            };
    
    availableMoves.push(move);
}

function reset() {
    noLoop()
    gameboard.gameboard = returnGameboard(preMoveGameboard);
    gameboard.pieces = returnPieces(preMovePieces);
    gameboard.activeShape = preMoveActiveShape.copy();
    rand_shapes = Array.from(preMoveRandShapes);
    score = preMoveScore;
    level = preMoveLevel;
    lines_cleared = preMoveLinesCleared;
    loop();
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