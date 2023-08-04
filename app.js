function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    for(let row = 0; row < 8; row ++) {
        for(let col = 0; col < 8; col ++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            console.log(col)
            if((row+col) % 2 === 0) {
                cell.classList.add('white')
            } else {
               cell.classList.add('black')
            }
            gameBoard.appendChild(cell);
        }
       
        
    }

}
createBoard()

