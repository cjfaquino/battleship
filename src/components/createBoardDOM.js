const createBoardDOM = (size, playerDomID) => {
  const board = document.getElementById(playerDomID);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('span');
    cell.classList.add('cell');
    board.append(cell);
  }

  return { board };
};
module.exports = createBoardDOM;
