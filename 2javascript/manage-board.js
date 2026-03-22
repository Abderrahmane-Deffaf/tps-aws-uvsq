import * as displayBoard from './display-board.js';

const ROWS = 6;
const COLS = 7;
const EMPTY = -1;
const PLAYER_ONE = 0;
const PLAYER_TWO = 1;
const WIN_LENGTH = 4;
const WIN_DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

const boardMatrix = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));

// player 1 is the first to play 
// 0 veut dire player 1 et 1 veut dire player 2 
const tour = [];
let isAnimating = false;
let gameOver = false;

export function tourSuivant() {
  if (tour.length === 0) {
    tour.push(1); // player 1 starts
  } else {
    tour.push(tour[tour.length - 1] === 1 ? 0 : 1); // alternate between player 1 and player 2
  }
  return tour[tour.length - 1];
}

export function play() {
  const table = document.getElementsByTagName('table')[0];
  table.addEventListener('click', async (event) => {
    if (isAnimating || gameOver) {
      return;
    }

    const cell = event.target;
    if (cell instanceof HTMLTableCellElement) {
      const colIndex = Number(cell.dataset.col);
      const rowIndex = getClosestRow(colIndex);
      const currentPlayer = tour[tour.length - 1];

      if (rowIndex !== -1) {
        isAnimating = true;

        try {
          await displayBoard.animateDrop(cell, rowIndex, colIndex, currentPlayer);
          set(rowIndex, colIndex, currentPlayer);

          if (!await checkWin()) {
            displayBoard.updateTour(tourSuivant());
          }
        } finally {
          isAnimating = false;
        }
      }
    }
  });
}

export function getClosestRow(col) {
  let row = -1;
  for (let i = 0; i < ROWS; i++) {
    if (boardMatrix[i][col] === EMPTY) {
      row = i;
    }
  }
  return row;
}


export function set(row, col, player) {
  boardMatrix[row][col] = player === 1 ? PLAYER_ONE : PLAYER_TWO;
}


async function checkWin() {
  const winningLine = findWinningLine();

  if (!winningLine) {
    return false;
  }

  gameOver = true;
  await displayBoard.showWin(winningLine.winner, winningLine.cells);
  return true;
}

function findWinningLine() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cellValue = boardMatrix[row][col];

      if (cellValue === EMPTY) {
        continue;
      }

      for (const [rowDelta, colDelta] of WIN_DIRECTIONS) {
        const cells = getWinningLine(row, col, rowDelta, colDelta, cellValue);

        if (cells) {
          return {
            winner: getWinner(cellValue),
            cells,
          };
        }
      }
    }
  }

  return null;
}

function getWinningLine(startRow, startCol, rowDelta, colDelta, cellValue) {
  const cells = [{ row: startRow, col: startCol }];

  for (let offset = 1; offset < WIN_LENGTH; offset++) {
    const row = startRow + rowDelta * offset;
    const col = startCol + colDelta * offset;

    if (!isInsideBoard(row, col) || boardMatrix[row][col] !== cellValue) {
      return null;
    }

    cells.push({ row, col });
  }

  return cells;
}

function isInsideBoard(row, col) {
  return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

function getWinner(cellValue) {
  return cellValue === PLAYER_ONE ? 1 : 2;
}
