const createBoardDOM = (size) => {
  const player = document.getElementById('player');
  const cpu = document.getElementById('cpu');

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('span');
    cell.classList.add('cell');
    player.append(cell);
  }

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('span');
    cell.classList.add('cell');
    cpu.append(cell);
  }
};
module.exports = createBoardDOM;
