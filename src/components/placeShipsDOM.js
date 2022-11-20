const renderBoard = require('./renderBoard');
const checkForShips = require('./utils/checkForShips');

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

module.exports = placeShipsInput;
