const renderBoard = (player, board) => {
  const boardDOM = document.querySelectorAll(`#${player} .cell`);
  const { grid } = board;

  for (let i = 0; i < boardDOM.length; i++) {
    const cellDOM = boardDOM[i];
    const cell = grid[i];

    // ship color
    if (cell.ship) cellDOM.style.backgroundColor = 'grey';

    // missed attack color
    if (cell.missed === true) cellDOM.style.backgroundColor = 'red';

    // ship hit color
    if (cell.missed === false) cellDOM.style.backgroundColor = 'black';

    cellDOM.textContent = [cell.x, cell.y];
  }
};
module.exports = renderBoard;
