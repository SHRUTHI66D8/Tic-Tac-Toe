let currentPlayer = 'X';
let gameBoard = [];
let gameMode = '';
let isGameOver = false;

const startGame = (mode) => {
    gameMode = mode;
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    isGameOver = false;
    currentPlayer = 'X';
    document.getElementById('game-board').innerHTML = '';
    document.getElementById('game-message').innerHTML = '';
    document.getElementById('new-game-btn').style.display = 'none';
    createBoard();
};

const createBoard = () => {
    const boardContainer = document.getElementById('game-board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleCellClick(i));
        boardContainer.appendChild(cell);
    }
};

const handleCellClick = (index) => {
    if (isGameOver) return;
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (gameBoard[row][col] !== '') return; // Cell already filled

    gameBoard[row][col] = currentPlayer;
    document.getElementsByClassName('game-board')[0].children[index].innerText = currentPlayer;

    if (checkWinner(currentPlayer)) {
        document.getElementById('game-message').innerHTML = `${currentPlayer} Wins!`;
        document.getElementById('new-game-btn').style.display = 'inline-block';
        isGameOver = true;
    } else if (gameBoard.flat().every(cell => cell !== '')) {
        document.getElementById('game-message').innerHTML = "It's a Draw!";
        document.getElementById('new-game-btn').style.display = 'inline-block';
        isGameOver = true;
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (gameMode === 'ai' && currentPlayer === 'O') {
            aiMove();
        }
    }
};

const checkWinner = (player) => {
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === player && gameBoard[i][1] === player && gameBoard[i][2] === player) return true; // Row
        if (gameBoard[0][i] === player && gameBoard[1][i] === player && gameBoard[2][i] === player) return true; // Column
    }
    if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player) return true; // Diagonal
    if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player) return true; // Diagonal
    return false;
};

const aiMove = () => {
    let bestMove = getBestMove();
    const row = Math.floor(bestMove / 3);
    const col = bestMove % 3;

    gameBoard[row][col] = 'O';
    document.getElementsByClassName('game-board')[0].children[bestMove].innerText = 'O';

    if (checkWinner('O')) {
        document.getElementById('game-message').innerHTML = "AI Wins!";
        document.getElementById('new-game-btn').style.display = 'inline-block';
        isGameOver = true;
    } else {
        currentPlayer = 'X';
    }
};

const getBestMove = () => {
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        if (gameBoard[row][col] === '') {
            gameBoard[row][col] = 'O';
            if (checkWinner('O')) {
                gameBoard[row][col] = '';
                return i;
            }
            gameBoard[row][col] = '';
        }
    }

    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        if (gameBoard[row][col] === '') {
            gameBoard[row][col] = 'X';
            if (checkWinner('X')) {
                gameBoard[row][col] = '';
                return i;
            }
            gameBoard[row][col] = '';
        }
    }

    return getRandomMove();
};

const getRandomMove = () => {
    let availableMoves = [];
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        if (gameBoard[row][col] === '') {
            availableMoves.push(i);
        }
    }
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};
