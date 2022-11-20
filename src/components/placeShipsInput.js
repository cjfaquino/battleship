const checkForShips = require('./utils/checkForShips');
const isValidMove = require('./utils/isValidMove');
const highlightPlacement = require('./utils/highlightPlacement');
const placeShipDOM = require('./placeShipDOM');
const { rotateBtn, resetBtn, confirmBtn } = require('./placementBtnsDOM');

const placeShipsInput = (board) => {
  const shipSize = [5, 4, 3, 3, 2];

  highlightPlacement(shipSize);
  placeShipDOM(board, shipSize);

  rotateBtn();
  resetBtn(board);
  confirmBtn(shipSize);
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
