import solveSudoku from './sudoku.js';
import { http } from './http.js';
import ui from './ui.js';

document.querySelector('#getBoard-btn').addEventListener('click', e => {
  const difficulty = ui.getDifficulty();

  if (difficulty === null) {
    ui.setAlert('Please choose a difficulty.', 'alert alert-danger');
  } else {
    ui.deactivateButtons();
    getGridFromAPI(difficulty)
      .then(async response => {
        const board = response.board;
        ui.clearBoard();
        ui.showBoard(board);
      })
      .then(() => {
        ui.activateButtons();
        ui.showSolveBoardButton();
      });
  }
});

document.querySelector('#solveBoard-btn').addEventListener('click', e => {
  const grid = ui.getGridFromPage();

  ui.deactivateButtons();

  (async function solveGrid() {
    const solutions = solveSudoku(grid);

    ui.paintSolution(grid, solutions[0]);
  })().then(async () => {
    ui.activateButtons();
  });
});

async function getGridFromAPI(difficulty) {
  try {
    return await http.get(
      `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
    );
  } catch (err) {
    console.log(err);
  }
}
