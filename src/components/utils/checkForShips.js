const findCell = require('./findCell');

const checkForShips = (x, y, length, axis, size, grid) => {
  for (let i = 0; i < length; i++) {
    let cell;
    if (axis === 'Y') {
      let newY = y + i;
      if (newY > size) {
        newY -= length;
      }
      cell = findCell(x, newY, grid);
    } else if (axis === 'X') {
      let newX = x + i;
      if (newX > size) {
        newX -= length;
      }
      cell = findCell(newX, y, grid);
    }
    if (cell.ship !== null) return true;
  }

  return false;
};

module.exports = checkForShips;
