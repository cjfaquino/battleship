const createShip = require('./createShip');

const createCell = (x, y) => ({ x, y, ship: null });

const findCell = (x, y, arr) =>
  arr.find((cell) => cell.x === x && cell.y === y);

const createBoard = (n = 10) => {
  const grid = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      grid.push(createCell(i, j));
    }
  }

  const placeShip = (x, y, length, axis) => {
    if (!findCell(x, y, grid)) return 'Out of bounds';

    const ship = createShip(length);

    for (let i = 0; i < length; i++) {
      let cell;
      if (axis === 'Y') {
        cell = findCell(x, y + i, grid);
      } else if (axis === 'X') {
        cell = findCell(x + i, y, grid);
      }

      cell.ship = ship;
    }

    return ship;
  };

  return { grid, placeShip };
};

module.exports = { createBoard, findCell };
