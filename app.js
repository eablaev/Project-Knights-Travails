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
            cell.innerHTML = row+" "+col
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
    resetBoard();
    let knightStart = false;
    
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => {
        cell.addEventListener('click',() => {
            if(!knightStart) {
                resetBoard();
                cell.classList.add('knightStart');
                cell.id = 'knightStart';
                knightStart = true;
                message.innerHTML = "Now pick the knight's ending position"
                
                startingPosition = [];
                startingPosition.push(Number(cell.dataset.row));
                startingPosition.push(Number(cell.dataset.col));
            } else {
                cell.classList.add('knightEnd');
                cell.id = 'knightEnd';

                targetPosition = [];
                targetPosition.push(Number(cell.dataset.row));
                targetPosition.push(Number(cell.dataset.col));
                findShortestPath(new Set(),startingPosition,targetPosition);
                knightStart = false;
            }
        });
    });
};

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
    const queue  = [{node: src, path: [src]}];
    console.log(queue)

    console.log("Exploring path : "+src+" --> "+dest)

    while (queue.length > 0) {
        const {node, path } = queue.shift();
      
        if(visited.has((JSON.stringify(node)))) {
            console.log('Visited')
            continue;
        } 
        if(JSON.stringify(node) === JSON.stringify(dest)) {
            console.log('Path found');
            let printPath = '';
            path.forEach(el => {
             printPath = printPath +" " + el+" -->"
            })
             message.innerHTML =" You made it in "+path.length+" moves. Here is your path: "+printPath.slice(0, -3);
            return true
        }
        
        visited.add(JSON.stringify(node));
        console.log("Visited: "+[...visited]);
        
        const legalMoves = generateLegalMoves(node);
        
        for (let move of legalMoves) {      
            queue.push({ node: move, path: [...path, move] });      
        } 
    }
    return false    
}

function resetBoard() {
  
    
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => {
        cell.classList.remove('knightStart', 'knightEnd');
        cell.id = '';
    });
    
    
    
    const message = document.getElementById('message');
    message.innerHTML = "Pick the knight's starting position";
}


createBoard();


