const DROP_DURATION_MS = 320;
const WIN_REVEAL_DELAY_MS = 950;

export function createBoard() {
  // create a 6 x 7 board and return just table containg the all the cells so i can append it to the DOM div 
  const table = document.createElement('table');
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      cell.dataset.row = i;
      cell.dataset.col = j;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

// player 1 get in the matrix 0 and player 2 get 1
// player 1 is red and player 2 is yellow
export function updateBoardCell(row, col, player) {
  const cell = getBoardCell(row, col);
  if (cell) {
    cell.classList.remove('player-one', 'player-two');
    cell.classList.add(getPlayerClass(player));
  }
}

export function updateTour(player) {
  const tourElement = document.getElementById('tour');
  tourElement.textContent = `Tour du joueur ${player === 1 ? '1 (Rouge)' : '2 (Jaune)'}`;
}

export async function showWin(winner, winningCells) {
  highlightWinningCells(winningCells, winner);

  const tourElement = document.getElementById('tour');
  if (tourElement) {
    tourElement.textContent = 'Puissance 4 !';
  }

  await wait(WIN_REVEAL_DELAY_MS);

  const board = document.getElementById('board');
  if (!board) {
    return;
  }

  const previousOverlay = board.querySelector('.win-overlay');
  if (previousOverlay) {
    previousOverlay.remove();
  }

  board.classList.add('win-state');
  const overlay = createWinOverlay(winner);
  board.appendChild(overlay);

  const scheduleFrame = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : (callback) => setTimeout(callback, 0);
  scheduleFrame(() => {
    overlay.classList.add('is-visible');
  });

  if (tourElement) {
    tourElement.textContent = `Victoire du joueur ${winner}`;
  }
}

export function highlightWinningCells(winningCells = [], winner) {
  const winnerClass = winner === 1 ? 'winning-cell-player-one' : 'winning-cell-player-two';

  for (const { row, col } of winningCells) {
    const cell = getBoardCell(row, col);
    if (cell) {
      cell.classList.add('winning-cell', winnerClass);
    }
  }
}

function createWinOverlay(winner) {
  const overlay = document.createElement('div');
  const title = document.createElement('h2');
  const subtitle = document.createElement('p');
  const replayButton = document.createElement('button');

  overlay.className = 'win-overlay';
  title.className = 'win-title';
  title.textContent = `Le joueur ${winner === 1 ? '1 (Rouge)' : '2 (Jaune)'} a gagne !`;

  subtitle.className = 'win-subtitle';
  subtitle.textContent = 'La ligne gagnante est verrouillee. Lance une nouvelle manche.';

  replayButton.className = 'replay-button';
  replayButton.textContent = 'Rejouer';
  replayButton.addEventListener('click', () => {
    window.location.reload();
  });

  overlay.append(title, subtitle, replayButton);
  return overlay;
}

export function animateDrop(sourceCell, targetRow, targetCol, player) {
  const board = document.getElementById('board');
  const targetCell = getBoardCell(targetRow, targetCol);
  const canAnimate = typeof HTMLElement !== 'undefined' && sourceCell instanceof HTMLElement;

  if (!canAnimate || !board || !targetCell) {
    updateBoardCell(targetRow, targetCol, player);
    return Promise.resolve();
  }

  const boardRect = board.getBoundingClientRect();
  const sourceRect = sourceCell.getBoundingClientRect();
  const targetRect = targetCell.getBoundingClientRect();
  const token = document.createElement('div');

  token.className = 'dropping-token';
  token.style.background = getPlayerBackground(player);
  token.style.width = `${sourceRect.width}px`;
  token.style.height = `${sourceRect.height}px`;
  token.style.left = `${sourceRect.left - boardRect.left}px`;
  token.style.top = `${sourceRect.top - boardRect.top}px`;
  board.appendChild(token);

  const deltaY = targetRect.top - sourceRect.top;
  const scheduleFrame = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : (callback) => setTimeout(callback, 0);

  return new Promise((resolve) => {
    scheduleFrame(() => {
      token.style.transform = `translateY(${deltaY}px)`;
    });

    setTimeout(() => {
      token.remove();
      updateBoardCell(targetRow, targetCol, player);
      resolve();
    }, DROP_DURATION_MS);
  });
}

function getBoardCell(row, col) {
  return document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
}

function getPlayerClass(player) {
  return player === 1 ? 'player-one' : 'player-two';
}

function getPlayerBackground(player) {
  return player === 1
    ? 'radial-gradient(circle at 32% 30%, #ffb0c0 0%, #ff4d6d 42%, #b81b3d 100%)'
    : 'radial-gradient(circle at 32% 30%, #fff6ad 0%, #ffd93d 42%, #cc9b00 100%)';
}

function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
