const createShip = require('./createShip');

const createCell = (x, y) => ({
  x,
  y,
  ship: null,
  missed: null,
});

const findCell = (x, y, arr) =>
  arr.find((cell) => cell.x === x && cell.y === y);

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

const createBoard = (size = 10) => {
  const grid = [];
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      grid.push(createCell(i, j));
    }
  }

  const getSize = () => size;

  const placeShip = (x, y, length, axis) => {
    if (!findCell(x, y, grid)) return 'Out of bounds';
    if (checkForShips(x, y, length, axis, size, grid))
      return "Can't place onto another ship";

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
    const cell = findCell(x, y, grid);
    if (!cell) return 'Out of bounds';

    if (cell.missed !== null) return "Can't attack same cell";

    if (!cell.ship) {
      cell.missed = true;
      return cell;
    }

    const { ship } = cell;
    cell.missed = false;
    ship.hit();
    return cell;
  };

  const getMissed = () => {
    const missed = grid.filter((cell) => cell.missed === true);
    return missed;
  };

  const allShipsSunk = () => {
    const sunkenShips = grid
      .filter((cell) => cell.ship) // cells with ships
      .filter((cell) => cell.ship.isSunk()) // cells with sunken ships
      .map((cell) => cell.ship); // grab ships

    // removes same ships cells
    const uniqueSunken = [...new Set(sunkenShips)];

    return uniqueSunken.length >= 5;
  };

  return { grid, getSize, placeShip, receiveAttack, getMissed, allShipsSunk };
};

module.exports = { createBoard, findCell, isValidMove };
