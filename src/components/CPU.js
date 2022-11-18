const { isValidMove } = require('./createBoard');
const Player = require('./Player');

const CPU = (board) => {
  const cpu = Player('cpu', board);

  cpu.sendAttack = (enemy) => {
    const size = board.getSize();
    let randX = Math.floor(Math.random() * size + 1);
    let randY = Math.floor(Math.random() * size + 1);

    while (!isValidMove(randX, randY, enemy.board)) {
      randX = Math.floor(Math.random() * size + 1);
      randY = Math.floor(Math.random() * size + 1);
    }

    if (cpu.getTurn()) {
      enemy.board.receiveAttack(randX, randY);
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
