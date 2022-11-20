const renderBoard = require('./renderBoard');
const checkForShips = require('./utils/checkForShips');

const placeShips = (boardDOM, board) => {
  const shipLengths = [5, 4, 3, 3, 2];
  let currentShip = 0;
  boardDOM.addEventListener('click', (e) => {
    const cell = e.target;
    const { x, y } = cell.dataset;
    const nX = Number(x);
    const nY = Number(y);

    if (
      currentShip < shipLengths.length &&
      !checkForShips(
        nX,
        nY,
        shipLengths[currentShip],
        'X',
        board.getSize(),
        board.grid
      )
    ) {
      board.placeShip(nX, nY, shipLengths[currentShip], 'X');
      currentShip += 1;
      renderBoard('place-ships', board);

      if (currentShip >= shipLengths.length) {
        const event = new Event('finished placing');
        document.dispatchEvent(event);
      }
    }

    return board;
  });
};

module.exports = placeShips;
