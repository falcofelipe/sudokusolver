function getSubgridValues(grid, row, col) {
  let subGrid = [];
  const subGridSize = parseInt(grid.length ** 0.5);

  const rowStart = parseInt(Math.floor(row / subGridSize) * subGridSize);
  const colStart = parseInt(Math.floor(col / subGridSize) * subGridSize);

  for (let y = rowStart; y < rowStart + subGridSize; y++) {
    for (let x = colStart; x < colStart + subGridSize; x++) {
      subGrid.push(grid[y][x]);
    }
  }

  return subGrid;
}

function getRowValues(grid, row) {
  return grid[row];
}

function getColValues(grid, col) {
  return grid.map(r => r[col]);
}

function isValidPlay(grid, playValue, row, col) {
  if (grid[row][col] !== 0) {
    return false;
  }

  let subgridValues = getSubgridValues(grid, row, col);
  let rowValues = getRowValues(grid, row);
  let colValues = getColValues(grid, col);

  if (
    !subgridValues.includes(playValue) &&
    !rowValues.includes(playValue) &&
    !colValues.includes(playValue)
  ) {
    return true;
  } else {
    return false;
  }
}

function gridsAugmentedInRow(grid, number, row) {
  let result = [];
  const rowValues = getRowValues(grid, row);
  if (grid[row].includes(number)) {
    result.push(grid);
  } else {
    grid[row].forEach((colValues, col) => {
      if (isValidPlay(grid, number, row, col)) {
        let newGrid = deepcopyGrid(grid);
        newGrid[row][col] = number;

        result.push(newGrid);
      }
    });
  }
  return result;
}

function gridsAugmentedWithNumber(partialResult, number, row = 0) {
  let result = [];

  if (isNumberCompleted(partialResult, number)) {
    return [partialResult];
  }
  const partialPossibilities = gridsAugmentedInRow(partialResult, number, row);

  if (partialPossibilities === []) {
    return [];
  }

  partialPossibilities.forEach(possibility => {
    let newPoss = gridsAugmentedWithNumber(possibility, number, row + 1);
    newPoss.forEach(poss => result.push(poss));
  });
  return result;
}

function isNumberCompleted(partialResult, number) {
  let isCompleted = true;
  partialResult.forEach(row => {
    if (!row.includes(number)) {
      isCompleted = false;
    }
  });
  return isCompleted;
}

function isGridCompleted(partialResult) {
  let isCompleted = true;
  partialResult.forEach(row => {
    if (row.includes(0)) {
      isCompleted = false;
    }
  });
  return isCompleted;
}

function deepcopyGrid(grid) {
  return grid.map(row => [...row]);
}

function solveSudoku(partialResult, number = 1) {
  if (isGridCompleted(partialResult)) {
    return [partialResult];
  }

  let result = [];
  let possibilitiesForNumber = gridsAugmentedWithNumber(partialResult, number);
  if (possibilitiesForNumber === []) {
    return [];
  }
  possibilitiesForNumber.forEach(possibility => {
    let newPoss = solveSudoku(possibility, number + 1);
    newPoss.forEach(poss => result.push(poss));
  });
  return result;
}

export default solveSudoku;
