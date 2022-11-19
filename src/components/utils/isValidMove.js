const findCell = require('./findCell');

const isValidMove = (x, y, board) => {
  const size = board.getSize();
  // within game board
  if (x > size || x < 1 || y > size || y < 1) {
    return false;
  }

  // cell has not been attacked
  const cell = findCell(x, y, board.grid);
  if (cell.missed !== null) return false;

  return true;
};

module.exports = isValidMove;
