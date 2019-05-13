export function checkWinner(cells, size) {
    let winner = null;
    
    for (let i = 0; (i < size) && (winner === null); i++) {
        winner = cells[size * i]
        let wins = true;
        for (let j = 1; (j < size) && wins; j++) {
            wins = cells[size * i + j] === winner;
        }
        if (!wins || winner === -1) {
            winner = null;
        }
    } // Rows
    
    for (let i = 0; (i < size) && (winner === null) ; i++) {
        winner = cells[i]
        let wins = true;
        for (let j = 1; (j < size) && wins; j++) {
            wins = cells[i + size * j] === winner;
        }
        if (!wins || winner === -1) {
            winner = null;
        }
    } // Columns
    
    if (winner === null) {
        winner = cells[0]
        let wins = true;
        for (let i = 1; (i < size) && wins ; i++) {
            wins = cells[size * i + i] === winner;
        }
        if (!wins || winner === -1) {
            winner = null;
        }
    } // Top left to bottom right
    
    if (winner === null) {
        winner = cells[size - 1]
        let wins = true;
        for (let i = 0; (i < size - 1) && wins ; i++) {
            wins = cells[(size * (size - (1 + i))) + i] === winner;
        }
        if (!wins || winner === -1) {
            winner = null;
        }
    } // Top right to bottom left

    if (!cells.includes(null) && (winner === null)) {
        return -1;
    }
    
    return winner;
}

export function nextPlayer(currentPlayer, playersCount = 2){
    currentPlayer++;
    if (currentPlayer === playersCount) {
        currentPlayer = 0;
    }
    return currentPlayer;
}

function generateRandomMoveSimple (board) {
    let allowedMoves = board.map((c, i) => (c === null ? i : null)).filter(e => e !== null)
    return allowedMoves[Math.floor(Math.random()*allowedMoves.length)]; // There may be a simpler solution
}

export function generateRandomMove(board, allowedCells = [], isStrategic = false){
    if (isStrategic) {
        return generateRandomMoveSimple(board[allowedCells[Math.floor(Math.random()*allowedCells.length)]]);
    }
    return generateRandomMoveSimple(board);
}