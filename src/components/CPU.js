const Player = require('./Player');

const CPU = (board) => {
  const cpu = Player('cpu', board);

  cpu.sendAttack = (enemy) => {
    const attackable = enemy.board.getAttackable();
    const randomIndex = Math.floor(Math.random() * attackable.length);
    const randomCell = attackable[randomIndex];
    const { x, y } = randomCell;

    if (cpu.getTurn()) {
      enemy.board.receiveAttack(x, y);
      enemy.changeTurn();
      cpu.changeTurn();
      return 'Success';
    }
    if (!cpu.getTurn()) return 'Not your turn';

    return -1;
  };
  return cpu;
};

module.exports = CPU;
