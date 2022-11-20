const renderBoard = require('./renderBoard');
const checkForShips = require('./utils/checkForShips');
const { getAxis } = require('./utils/rotateAxis');

const placeShipDOM = (board, shipSize) => {
  const boardDOM = document.getElementById('place-ships');
  const confirmBtn = document.querySelector('.confirm-placement');

  let index = 0;

  document.addEventListener('reset board', () => {
    index = 0;
  });

  boardDOM.addEventListener('click', (e) => {
    const axis = getAxis();
    const cell = e.target;
    const { x, y } = cell.dataset;
    const nX = Number(x);
    const nY = Number(y);

    if (
      index < shipSize.length &&
      !checkForShips(nX, nY, shipSize[index], axis, board.getSize(), board.grid)
    ) {
      board.placeShip(nX, nY, shipSize[index], axis);
      index += 1;
      renderBoard('place-ships', board);
    }

    if (index >= shipSize.length) {
      confirmBtn.disabled = false;
    }

    const event = new Event('ship placed');
    document.dispatchEvent(event);
  });
};

module.exports = placeShipDOM;
