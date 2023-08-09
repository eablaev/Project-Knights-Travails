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
                
                startingPosition.push(Number(cell.dataset.row));
                startingPosition.push(Number(cell.dataset.col));
            } else {
                cell.classList.add('knightEnd');
                cell.id = 'knightEnd';
                endKnight = true;
                targetPosition.push(Number(cell.dataset.row));
                targetPosition.push(Number(cell.dataset.col));
                findShortestPath(new Set(),startingPosition,targetPosition);
            }
            
        });
    })
}

function generateLegalMoves(position){
    const moves = [
        [+2,-1],
        [+2,+1],
        [+1,+2],
        [-1,+2],
        [-2,+1],
        [-2,-1],
        [-1,-2],
        [+1,-2]
    ]
    const [startRow, startCol] = position;
    const validMoves = [];

    moves.forEach(move => {
        const [rowOffset, colOffset] = move;
        const newRow = startRow + rowOffset;
        const newCol = startCol + colOffset;

        if(newRow >= 1 && newRow <= 8 && newCol >= 1 && newCol <= 8) {
            validMoves.push([newRow, newCol]);      
        }
       
    });
    return validMoves;
}

function findShortestPath(visited,src,dest) {
    console.log("Explosring path : "+src+" --> "+dest)
    
    if(visited.has(JSON.stringify(src))) return false;
    console.log(visited)
    visited.add(JSON.stringify(src))
    if(JSON.stringify(src) === JSON.stringify(dest)) {
        console.log('Pass found: '+[...visited])
        return true 
    } 
   
    
    const legalMoves = generateLegalMoves(src);
    console.log("Legal moves for this path are : "+legalMoves)

    for (let move of legalMoves) {
        console.log(move)
        if(findShortestPath(visited,move,dest)) {
            return true
        }
        
    }
    
    return false   
    
    // message.innerHTML =" Here is the fastest way, from (R,C)"+startingPosition+" to "+targetPosition
}

createBoard();


