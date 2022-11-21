const highlightPlacement = require('./utils/highlightPlacement');
const placeShipDOM = require('./placeShipDOM');
const {
  rotateBtn,
  resetBtn,
  confirmBtn,
  randomizeBtn,
} = require('./placementBtnsDOM');
const randomPlacement = require('./utils/randomPlacement');

const placeShipsInput = (board) => {
  const shipSize = [5, 4, 3, 3, 2];

  highlightPlacement(shipSize);
  placeShipDOM(board, shipSize);

  rotateBtn();
  randomizeBtn(board);
  resetBtn(board);
  confirmBtn(shipSize);
};

const placeCpuShips = (board) => {
  randomPlacement(board);
};

module.exports = { placeShipsInput, placeCpuShips };
