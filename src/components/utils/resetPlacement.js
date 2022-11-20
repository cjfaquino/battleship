/* eslint-disable no-param-reassign */
const renderBoard = require('../renderBoard');

const resetPlacement = (board) => {
  const inputCells = document.querySelectorAll('#place-ships .cell');

  // remove css
  inputCells.forEach((cell) => cell.classList.remove('ship'));

  // remove ship from obj
  board.grid = board.grid.map((cell) => {
    cell.ship = null;
    return cell;
  });

  renderBoard('place-ships', board);
};

module.exports = resetPlacement;
