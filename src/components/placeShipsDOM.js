const renderBoard = require('./renderBoard');
const checkForShips = require('./utils/checkForShips');
const isValidMove = require('./utils/isValidMove');

const placeShipsInput = (board) => {
  const boardDOM = document.getElementById('place-ships');
  const shipSize = [5, 4, 3, 3, 2];
  let currentShip = 0;
  boardDOM.addEventListener('click', (e) => {
    const cell = e.target;
    const { x, y } = cell.dataset;
    const nX = Number(x);
    const nY = Number(y);

    if (
      currentShip < shipSize.length &&
      !checkForShips(
        nX,
        nY,
        shipSize[currentShip],
        'X',
        board.getSize(),
        board.grid
      )
    ) {
      board.placeShip(nX, nY, shipSize[currentShip], 'X');
      currentShip += 1;
      renderBoard('place-ships', board);

      if (currentShip >= shipSize.length) {
        const event = new Event('finished placing');
        document.dispatchEvent(event);
      }
    }

    return board;
  });
};

const placeCpuShips = (board) => {
  const shipSize = [5, 4, 3, 3, 2];
  const axis = ['X', 'Y'];
  let randomX;
  let randomY;
  let randomAxis;

  shipSize.forEach((sLength) => {
    do {
      randomX = Math.floor(Math.random() * board.getSize() + 1);
      randomY = Math.floor(Math.random() * board.getSize() + 1);
      randomAxis = Math.floor(Math.random() * 2);
    } while (
      !randomX ||
      !randomY ||
      randomAxis === undefined ||
      !isValidMove(randomX, randomY, board) ||
      checkForShips(
        randomX,
        randomY,
        sLength,
        axis[randomAxis],
        board.getSize(),
        board.grid
      )
    );

    board.placeShip(randomX, randomY, sLength, axis[randomAxis]);
  });
};

module.exports = { placeShipsInput, placeCpuShips };
