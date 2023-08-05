const placeKnightButton = document.getElementById('placeKnightButton');

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    startButton.addEventListener('click', placeKnight);

    for(let row = 0; row < 8; row ++) {
        for(let col = 0; col < 8; col ++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-cell','cell')
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
    message.innerHTML = 'Here is the fastest way'

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
            } else {
                cell.classList.add('knightEnd');
                cell.id = 'knightEnd';
                endKnight = true;
                knightMoves();
            }
            
        });
    })
}

createBoard();


