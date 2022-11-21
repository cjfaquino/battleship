const renderBoard = require('./renderBoard');
const checkForShips = require('./utils/checkForShips');
const getCurrentIndex = require('./utils/getCurrentIndex');
const { getAxis } = require('./utils/rotateAxis');

const placeShipDOM = (board, shipSize) => {
  const boardDOM = document.getElementById('place-ships');
  const confirmBtn = document.querySelector('.confirm-placement');

  boardDOM.addEventListener('click', (e) => {
    const index = getCurrentIndex();
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
