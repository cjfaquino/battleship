const commonCellDOM = require('./commonCellDOM');

const renderBoard = (player, board) => {
  const boardDOM = document.querySelectorAll(`#${player} .cell`);
  const { grid } = board;

  for (let i = 0; i < boardDOM.length; i++) {
    const cellDOM = boardDOM[i];
    const cell = grid[i];

    // ship color
    if (cell.ship) cellDOM.classList.add('ship');

    // missed attack color
    commonCellDOM(cell, cellDOM);

    cellDOM.dataset.x = cell.x;
    cellDOM.dataset.y = cell.y;
  }
};
module.exports = renderBoard;
