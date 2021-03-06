const gameBoard = (() => {
    const gameboard = [
        ['!', '!', '!'],
        ['!', '!', '!'],
        ['!', '!', '!']
    ];

    const getBoard = () => [...gameboard];

    const changeBoard = (row, col, mark) => {
        gameboard[row][col] = gameboard[row][col] !== 'X' && gameboard[row][col] !== 'O' ? mark : gameboard[row][col];
        return [...gameboard];
    }

    const clearBoard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[i].length; j++) {
                gameboard[i][j] = '!';
            }
        }
        return [...gameboard];
    }

    return { getBoard, changeBoard, clearBoard };
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

const displayController = (() => {

    let playerOne = null;
    let playerTwo = null;
    let currentPlayer = null;

    const gameStart = () => {
        document.querySelector('#startBtn').textContent = 'Restart Game';
        createPlayers();
        gameBoard.clearBoard();
        displayBoard();
        showMoveMessage();
    }

    const createPlayers = () => {
        const firstPlayerName = document.querySelector('#firstPlayer').value;
        const firstPlayerMark = document.querySelector('#mark').value;
        const secondPlayerName = document.querySelector('#secondPlayer').value;
        const secondPlayerMark = firstPlayerMark === 'X' ? 'O' : 'X';
        playerOne = Player(firstPlayerName, firstPlayerMark);
        playerTwo = Player(secondPlayerName, secondPlayerMark);
        currentPlayer = playerOne;
    }

    const showMoveMessage = () => {
        const messageDisplay = document.querySelector('#message');
        messageDisplay.textContent = `${currentPlayer.getName()} Your Move.`;
    }

    const showWinnerMessage = () => {
        const messageDisplay = document.querySelector('#message');
        messageDisplay.textContent = `${currentPlayer.getName()} is Winner`;
    }

    const displayBoard = () => {
        const cellsPanel = document.querySelector('#cellsPanel');
        cellsPanel.innerHTML = ''
        gameBoard.getBoard().forEach((item, index) => {
            item.forEach((innerItem, innerIndex) => {
                const cell = document.createElement('div');
                cell.classList.add('col-4', 'border', 'rounded');
                cell.setAttribute('id', 'cell');
                cell.setAttribute('data-row', index);
                cell.setAttribute('data-col', innerIndex);
                cell.textContent = innerItem;
                cellsPanel.append(cell);
                cell.addEventListener('click', changeSpotMark);
            });
        });
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const changeSpotMark = (e) => {
        gameBoard.changeBoard(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'), currentPlayer.getMark());
        displayBoard();
        if (gameOverCheck()) {
            showWinnerMessage();
            return;
        }
        changePlayer();
        showMoveMessage();
    }

    const gameOverCheck = () => {
        return checkLineRow() || checkLineCol() ? true : false;
    };

    const checkLineRow = () => {
        let isLine = false;
        gameBoard.getBoard().forEach(item => {
            if (item.every(elem => elem === currentPlayer.getMark())) {
                isLine = true;
                return;
            }
        })
        return isLine;
    }

    const checkLineCol = () => {
        let isLine = false;
        for (let i = 0; i < 3; i++) {
            let subArray = [];
            gameBoard.getBoard().forEach(item => {
                subArray.push(item[i]);
            })
            if (subArray.every(elem => elem === currentPlayer.getMark())) {
                isLine = true;
                return;
            }
        }
        return isLine;
    }

    return { gameStart };
})();

document.querySelector('#startBtn').addEventListener('click', () => { displayController.gameStart() });
