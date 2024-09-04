const NUM_Rows = 9;
const NUM_Cols = 9;
const NUM_MINES = 9;

let board = [];

function initialization() {
    // Create the board
    for (let r = 0; r < NUM_Rows; r++) {
        board[r] = [];
        for (let c = 0; c < NUM_Cols; c++) {
            board[r][c] = {
                isMine: false,
                isRevealed: false,
                count: 0
            };
        }
    }

    // Mine the board randomly
    let mines = 0;
    while (mines < NUM_MINES) {
        const randomRow = Math.floor(Math.random() * NUM_Rows);
        const randomCol = Math.floor(Math.random() * NUM_Cols);

        if (!board[randomRow][randomCol].isMine) {
            board[randomRow][randomCol].isMine = true;
            mines++;
        }
    }

    // Calculate mine counts for each cell
    for (let r = 0; r < NUM_Rows; r++) {
        for (let c = 0; c < NUM_Cols; c++) {
            if (!board[r][c].isMine) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        const iLoc = r + dx;
                        const iJoc = c + dy;

                        if (iLoc >= 0 && iLoc < NUM_Rows && iJoc >= 0 && iJoc < NUM_Cols) {
                            if (board[iLoc][iJoc].isMine) {
                                count++;
                            }
                        }
                    }
                }
                board[r][c].count = count;
            }
        }
    }
}

const gameBoard = document.getElementById("game-board");
function render() {
    gameBoard.innerHTML = "";

    for (let r = 0; r < NUM_Rows; r++) {
        for (let c = 0; c < NUM_Cols; c++) {
            const tile = document.createElement("div");
            tile.className = "cell";
            if (board[r][c].isRevealed) {
                // Reveal the tile
                tile.classList.add("revealed");

                if (board[r][c].isMine) {
                    // Mine styles + show bomb
                    tile.classList.add("mine");
                    tile.innerHTML = "💣";
                } else if (board[r][c].count > 0) {
                    tile.innerHTML = board[r][c].count;
                }
            }

            tile.addEventListener("click", () => revealTile(r, c));

            gameBoard.appendChild(tile);
        }
    }
}

function revealTile(r, c) {
    if (r >= 0 && r < NUM_Rows && c >= 0 && c < NUM_Cols && !board[r][c].isRevealed) {
        board[r][c].isRevealed = true;
        if (board[r][c].isMine) {
            alert("Game Over! You hit a mine");
        } else if (board[r][c].count === 0) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    revealTile(r + dx, c + dy);
                }
            }
        }
        render();
    }
}

initialization();
render();
