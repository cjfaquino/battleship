const renderBoard = require('./renderBoard');
const renderEnemyBoard = require('./renderEnemyBoard');

const attackPlayer = async (player, cpu) => {
  setTimeout(() => {
    cpu.sendAttack(player);
    renderBoard('player', player.board);
  }, 500);
};
const attackCpu = (player, cpu) => (e) => {
  const cell = e.currentTarget;
  const { x, y } = cell.dataset;
  const nX = Number(x);
  const nY = Number(y);

  if (player.getTurn()) {
    player.sendAttack(nX, nY, cpu);
    renderEnemyBoard(cpu.board);
  }

  attackPlayer(player, cpu);
};
exports.attackCpu = attackCpu;
