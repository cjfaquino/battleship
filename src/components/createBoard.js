const createShip = require('./createShip');

const createCell = (x, y) => ({
  x,
  y,
  ship: null,
  missed: null,
});

const findCell = (x, y, arr) =>
  arr.find((cell) => cell.x === x && cell.y === y);

const createBoard = (size = 10) => {
  const grid = [];
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      grid.push(createCell(i, j));
    }
  }

  const placeShip = (x, y, length, axis) => {
    if (!findCell(x, y, grid)) return 'Out of bounds';

    const ship = createShip(length);

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

      cell.ship = ship;
    }

    return ship;
  };

  const receiveAttack = (x, y) => {
    if (!findCell(x, y, grid)) return 'Out of bounds';

    const cell = findCell(x, y, grid);
    if (!cell.ship) {
      cell.missed = true;
      return cell;
    }

    const { ship } = cell;
    cell.missed = false;
    ship.hit();
    return cell;
  };

  return { grid, placeShip, receiveAttack };
};

module.exports = { createBoard, findCell };
