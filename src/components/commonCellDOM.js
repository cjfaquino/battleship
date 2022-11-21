const commonCellDOM = (cell, cellDOM) => {
  if (cell.missed === true) cellDOM.classList.add('missed');

  // ship hit color
  if (cell.missed === false) cellDOM.classList.add('hit');

  // ship sunk color
  if (cell.ship && cell.ship.isSunk()) cellDOM.classList.add('sunk');
};

module.exports = commonCellDOM;
