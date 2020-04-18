// All functions take in a proposed_blocks array that consists of the CURRENT positions of the active piece.
// Returns true if rotation was successful, false if not.

function tRotation(proposed_blocks) {
    if (gameboard.activeShape.status == 0) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1]];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        } 
    } else if (gameboard.activeShape.status == 1) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 2) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] - 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 3) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] + 2];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status = 0;
            return true;
        }
    }
    return false;
}

function jRotation(proposed_blocks) {
    if (gameboard.activeShape.status == 0) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 2, proposed_blocks[2].position[1]];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 1) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 2];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 2) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 2, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] - 2];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 3) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 2];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status = 0;
            return true;
        }
    }
    return false;
}

function lRotation(proposed_blocks) {
    if (gameboard.activeShape.status == 0) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1]];
        proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 1) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 2) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] - 2];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 3) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] + 2];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status = 0;
            return true;
        }
    }
    return false;
}

function sRotation(proposed_blocks) {
    if (gameboard.activeShape.status == 0) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 2];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1]];
        proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 1) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] + 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 2) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0], proposed_blocks[3].position[1] - 2];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 3) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1]];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] + 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status = 0;
            return true;
        }
    }
}

function zRotation(proposed_blocks) {
    if (gameboard.activeShape.status == 0) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 2, proposed_blocks[0].position[1] - 1];
        proposed_blocks[1].position = [proposed_blocks[1].position[0] + 1, proposed_blocks[1].position[1]];
        proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 1) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0], proposed_blocks[0].position[1] + 2];
        proposed_blocks[1].position = [proposed_blocks[1].position[0] - 1, proposed_blocks[1].position[1] + 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1] - 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 2) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 2, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0] - 1, proposed_blocks[1].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] - 1];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 3) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0], proposed_blocks[0].position[1] - 1];
        proposed_blocks[1].position = [proposed_blocks[1].position[0] + 1, proposed_blocks[1].position[1]];
        proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 2];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status = 0;
            return true;
        }
    }
}

function lineRotation(proposed_blocks) {
    if (gameboard.activeShape.status == 0) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 1, proposed_blocks[0].position[1] - 3];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 2];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] - 1, proposed_blocks[2].position[1] - 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 2, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 1) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] + 2, proposed_blocks[0].position[1] + 3];
        proposed_blocks[1].position = [proposed_blocks[1].position[0] + 1, proposed_blocks[1].position[1] + 2];
        proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 1];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] - 1, proposed_blocks[3].position[1]];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 2) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 1, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0], proposed_blocks[1].position[1] - 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0] + 1, proposed_blocks[2].position[1] - 2];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 2, proposed_blocks[3].position[1] - 3];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status++;
            return true;
        }
    } else if (gameboard.activeShape.status == 3) {
        proposed_blocks[0].position = [proposed_blocks[0].position[0] - 2, proposed_blocks[0].position[1]];
        proposed_blocks[1].position = [proposed_blocks[1].position[0] - 1, proposed_blocks[1].position[1] + 1];
        proposed_blocks[2].position = [proposed_blocks[2].position[0], proposed_blocks[2].position[1] + 2];
        proposed_blocks[3].position = [proposed_blocks[3].position[0] + 1, proposed_blocks[3].position[1] + 3];
        if (gameboard.makeMove(proposed_blocks)) {
            gameboard.activeShape.status = 0;
            return true;
        }
    }
}