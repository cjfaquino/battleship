const renderEnemyBoard = (board) => {
  const boardDOM = document.querySelectorAll(`#cpu .cell`);
  const { grid } = board;

  for (let i = 0; i < boardDOM.length; i++) {
    const cellDOM = boardDOM[i];
    const cell = grid[i];

    // missed attack color
    if (cell.missed === true) cellDOM.classList.add('missed');

    // ship hit color
    if (cell.missed === false) cellDOM.classList.add('hit');

    // ship sunk color
    if (cell.ship && cell.ship.isSunk()) cellDOM.classList.add('sunk');

    cellDOM.dataset.x = cell.x;
    cellDOM.dataset.y = cell.y;
  }
};

module.exports = renderEnemyBoard;
