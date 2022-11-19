const checkOver = require('./utils/checkOver');
const isValidMove = require('./utils/isValidMove');
const renderBoard = require('./renderBoard');
const renderEnemyBoard = require('./renderEnemyBoard');

const attackPlayer = (player, cpu) => {
  setTimeout(() => {
    cpu.sendAttack(player);
    renderBoard('player', player.board);

    const event = new Event('playerTurn');
    if (!checkOver(player, cpu)) {
      document.dispatchEvent(event);
    }
  }, 1000);
};

const attackCpu = (player, cpu) => (e) => {
  const cell = e.currentTarget;
  const { x, y } = cell.dataset;
  const nX = Number(x);
  const nY = Number(y);

  if (
    player.getTurn() &&
    !player.board.allShipsSunk() &&
    isValidMove(nX, nY, cpu.board)
  ) {
    player.sendAttack(nX, nY, cpu);
    renderEnemyBoard(cpu.board);

    const event = new Event('cpuTurn');
    if (!checkOver(player, cpu)) {
      document.dispatchEvent(event);
    }
  }
};

module.exports = { attackCpu, attackPlayer };
