class Gameboard {

    constructor() { 
    
        this.gameboard_img = loadImage('TetrisBoard.png'); 

        this.level = 1; 
        this.speed = 1; 

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

        console.log(this.gameboard[0].length);
    }
}