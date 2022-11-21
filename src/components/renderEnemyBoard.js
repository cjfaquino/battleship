const commonCellDOM = require('./commonCellDOM');

const renderEnemyBoard = (board) => {
  const boardDOM = document.querySelectorAll(`#cpu .cell`);
  const { grid } = board;

  for (let i = 0; i < boardDOM.length; i++) {
    const cellDOM = boardDOM[i];
    const cell = grid[i];

    commonCellDOM(cell, cellDOM);

    cellDOM.dataset.x = cell.x;
    cellDOM.dataset.y = cell.y;
  }
};

module.exports = renderEnemyBoard;
