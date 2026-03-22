import * as displayBoard from './display-board.js';
import * as manageBoard from './manage-board.js';

const board = document.getElementById('board');

board.replaceChildren(displayBoard.createBoard());
displayBoard.updateTour(manageBoard.tourSuivant());
manageBoard.play();
