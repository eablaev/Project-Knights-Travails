const placeKnightButton = document.getElementById('placeKnightButton');

let startingPosition = [];
let targetPosition = [];

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    startButton.addEventListener('click', placeKnight);
    

    for(let row = 8; row >= 1; row --) {
        for(let col = 1; col < 9; col ++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-cell','cell');
            cell.dataset.row = row; // Set the row number as data-row attribute
            cell.dataset.col = col;
            if((row+col) % 2 === 0) {
                cell.classList.add('white')
            } else {
               cell.classList.add('black')
            }
            gameBoard.appendChild(cell);
        }
    }
}
function knightMoves() {
    message.innerHTML =" Here is the fastest way, from "+startingPosition+" to "+targetPosition

}
function placeKnight() {
    let knightStart = false;
    let endKnight = false;
    const message = document.getElementById('message');
    message.innerHTML = "Pick the knight's stating position"
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => {
        cell.addEventListener('click',() => {
            if(!knightStart) {
                cell.classList.add('knightStart');
                cell.id = 'knightStart';
                knightStart = true;
                message.innerHTML = "Now pick the knight's ending position"
                
                startingPosition.push(cell.dataset.row);
                startingPosition.push(cell.dataset.col);
            } else {
                cell.classList.add('knightEnd');
                cell.id = 'knightEnd';
                endKnight = true;
                targetPosition.push(cell.dataset.row);
                targetPosition.push(cell.dataset.col);
                knightMoves();
            }
            
        });
    })
}

function knightMoves() {
    message.innerHTML =" Here is the fastest way, from (R,C)"+startingPosition+" to "+targetPosition

}

createBoard();


