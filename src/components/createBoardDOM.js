const createBoardDOM = (size) => {
  const player = document.getElementById('player');
  const cpu = document.getElementById('cpu');

  cpu.classList.add('current-turn');

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

  return { player, cpu };
};
module.exports = createBoardDOM;
