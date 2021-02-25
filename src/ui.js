class UI {
  constructor() {
    this.gridContainer = document.querySelector('.grid-container');
    this.cardBody = document.querySelector('.card-body');
    this.form = document.querySelector('form');
    this.difficultySelector = document.querySelector('select');
    this.getBoardBtn = document.querySelector('#getBoard-btn');
    this.solveBoardBtn = document.querySelector('#solveBoard-btn');
  }

  getDifficulty() {
    const difficulties = ['easy', 'medium', 'hard', 'random'];
    const difficultyIndex = parseInt(this.difficultySelector.value);

    if (!Number.isInteger(difficultyIndex)) {
      return null;
    }

    return difficulties[difficultyIndex - 1];
  }

  setAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    this.cardBody.insertBefore(div, this.form);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearBoard() {
    this.gridContainer.innerHTML = '';
  }

  deactivateButtons() {
    this.getBoardBtn.disabled = true;
    this.solveBoardBtn.disabled = true;
  }

  activateButtons() {
    this.getBoardBtn.disabled = false;
    this.solveBoardBtn.disabled = false;
  }

  showSolveBoardButton() {
    this.solveBoardBtn.parentElement.style.display = 'block';
  }

  showBoard(board) {
    this.createBoardHeaders();

    board.forEach((row, rowId) => {
      const rowDiv = this.createRow(rowId);
      if (rowId === 2 || rowId === 5) {
        this.paintRowNumbers(rowDiv, row, true);
      } else {
        this.paintRowNumbers(rowDiv, row, false);
      }
    });
  }

  createBoardHeaders() {
    const grid = document.createElement('table');

    grid.className =
      'table table-bordered border border-4 border-dark text-center mx-auto grid';

    this.gridContainer.appendChild(grid);
  }

  paintRowNumbers(rowDiv, row, isBottomThick = false) {
    row.forEach((colValue, colId) => {
      this.createColumn(rowDiv, colId, colValue, isBottomThick);
    });
  }

  createRow(rowId) {
    const rowDiv = document.createElement('tbody');
    rowDiv.id = rowId;

    if (rowId === 2 || rowId === 5) {
      rowDiv.classList.add('border-bottom-3');
    }

    const tableRow = document.createElement('tr');
    rowDiv.appendChild(tableRow);

    document.querySelector('.grid').appendChild(rowDiv);

    return rowDiv;
  }

  createColumn(rowDiv, colId, number, isBottomThick = false) {
    const tableRow = rowDiv.querySelector('tr');
    const colDiv = document.createElement('td');
    if (colId === 2 || colId === 5) {
      colDiv.classList.add('border-end-3');
    }
    if (isBottomThick) {
      colDiv.classList.add('border-bottom-3');
    }
    if (number !== 0) {
      colDiv.textContent = number;
    }
    tableRow.appendChild(colDiv);
  }

  getGridFromPage() {
    const gridDiv = document.querySelector('.grid');
    let grid = [];

    let rows = gridDiv.querySelectorAll('tbody');

    rows = Array.from(rows);
    rows.forEach(row => {
      grid.push([]);
      let columns = row.querySelectorAll('td');
      columns = Array.from(columns);
      columns.forEach(col => {
        let colVal = col.textContent;
        if (colVal === '') {
          colVal = 0;
        } else {
          colVal = parseInt(col.textContent);
        }
        grid[row.id].push(colVal);
      });
    });

    return grid;
  }

  paintSolution(grid, solution) {
    const rowDivs = Array.from(document.querySelectorAll('tr'));

    grid.forEach((row, rowId) => {
      row.forEach((col, colId) => {
        let colDivs = rowDivs[rowId].querySelectorAll('td');
        if (col === 0) {
          const colDiv = colDivs[colId];
          colDiv.classList.add('text-darkorange');
          colDiv.textContent = solution[rowId][colId];
        }
      });
    });
  }
}

const ui = new UI();

export default ui;
