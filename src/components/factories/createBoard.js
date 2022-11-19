const checkForShips = require('../utils/checkForShips');
const createCell = require('./createCell');
const createShip = require('./createShip');
const findCell = require('../utils/findCell');

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

  const getAttackable = () => {
    const notAttacked = grid.filter((cell) => cell.missed === null);
    return notAttacked;
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

  return {
    grid,
    getSize,
    placeShip,
    receiveAttack,
    getAttackable,
    allShipsSunk,
  };
};

module.exports = createBoard;
