let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8, ],
    [3, 6, 9],
    [4, 7, 10],
    [5, 8, 11],
    [6, 9, 12],
    [7, 10, 13],
    [8, 11, 14],
    [9, 12, 15],
    [10, 13, 16],
    [11, 14, 17],
    [0, 4, 8],
    [3, 7, 11],
    [6, 10, 14],
    [9, 13, 17],
    [2, 4, 6],
    [5, 7, 9],
    [8, 10, 12],
    [11, 13, 15]
]; //winning positions

let turn = 0; //initializing the variable turn
let turnDisplay = document.getElementById('turnDisplay'); //Getting element to display player's turns
let gameOver = false; //setting default bool value of gameOver to false

// making a function to check the condition if any player wins
function checkWin(val) {
    for (let rwin of win) {
        if (board[rwin[0]] == val && board[rwin[1]] == val && board[rwin[2]] == val)
            return true;
    }
    return false;
}

//making a function to find if the match is draw
function checkDraw() {
    for (let box of board) {
        if (box === 0) {
            return false;

        }
    }
    return true;
}

//displaying the turn of player 1 even if none of the player has clicked on any box/cell
turnDisplay.textContent = `Player ${turn % 2 + 1}'s turn`;

//getting elements of class boxes and assigning on click function
let divColumns = document.getElementsByClassName('boxes');
for (let column of divColumns) {
    column.onclick = putSymbol;
}

// on click function named putSymbol i.e. behavior on clicking on any of the box/cell
function putSymbol() {
    //if game is over, do nothing
    if (gameOver) {
        return;
    }

    let colIndex = Number(this.title) % 3; // formula for column
    let rowIndex = findLowestEmptyRow(colIndex); // making a function to find lowest row/box in a specific column

    //if a valid cell/ box is found in a specific column then execute the following code
    if (rowIndex !== -1) {
        let index = rowIndex * 3 + colIndex;

        // setting a condition for player 1 and if the cell is not clicked before
        if (turn % 2 === 0 && board[index] === 0) {
            board[index] = 1;//setting the value of board array to 1 for player 1
            turn++; // incrementing turn when an image with symbol X is successfully placed in cell
            updateBoard();
            if (checkWin(1)) {
                endGame('Player 1 wins!');
                turnDisplay.textContent = ` `;
            } else if (checkDraw()) {
                endGame('Its a Draw!')
                turnDisplay.textContent = ` `;
            }
        } 
        // setting a condition for player 2 and if the cell is not clicked before 
        else if (turn % 2 === 1 && board[index] === 0) {
            board[index] = 2; //setting the value of board array to 1 for player 1
            turn++;// incrementing turn when an image with symbol 0 is successfully placed in cell
            updateBoard();
            if (checkWin(2)) {
                endGame("Player 2 wins!");
                turnDisplay.textContent = ` `;
            } else if (checkDraw()) {
                endGame('Its a Draw!');
                turnDisplay.textContent = ` `;
            }

        }
    }
}

// finding the lowest empty cell in specific column
function findLowestEmptyRow(colIndex) {
    // i has 6 values i.e. 0,1,2,3,4,5, because there are 6 rows
    for (let i = 5; i >= 0; i--) {
        if (board[i * 3 + colIndex] === 0) {
            return i;
        }
    }
    return -1; // Column is full  
}

//
function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        let row = Math.floor(i / 6) + 1;
        let col = i % 6 + 1;
        let box = document.getElementById(`box${row}_${col}`); // finding a specific cell with the help of formulae of rows and column. In this case, rows are 6 and columns are 3.
        if (gameOver == false) {
            if (board[i] === 1) {
                box.style.backgroundImage = "url('Transparent_X.png')";//placing X symbol for every time player 1 clicks on his/her turn
            } else if (board[i] === 2) {
                box.style.backgroundImage = "url('O.png')";//placing 0 symbol for every time player 2 clicks on his/her turn
            }
        } else {
            return -1; // returning nothing if the game is over(if either of the player wins or the match is draw)
        }
    }
    turnDisplay.textContent = `Player ${turn % 2 + 1}'s turn`;//displaying the turn of the player after every click
}

//function if either of the player wins or its a draw
function endGame(message) {
    document.getElementById('txtGameOver').textContent = message; //creating message variable so that it can be changed according to the situation
    document.getElementById('restart').textContent = 'Start Again';//button will contain start again text after the game is over
    document.getElementById('restart').style.display = 'block';// changing the display from none to block

    // Add event listener to restart button
    document.getElementById('restart').addEventListener('click', function () {
        location.reload(); // Reload the page
    });

    document.getElementById('GameOver').style.display = 'block';
    gameOver = true;//setting the gameOver to true so that nothing happens o clicking the cells after the game is over
}