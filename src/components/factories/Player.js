const isValidMove = require('../utils/isValidMove');

const Player = (player, playerBoard) => {
  let turn;
  if (player === 'p1') turn = true;
  else turn = false;

  const getTurn = () => turn;

  const changeTurn = () => {
    turn = !turn;
    return turn;
  };

  const sendAttack = (x, y, enemy) => {
    if (isValidMove(x, y, enemy.board) && turn) {
      enemy.board.receiveAttack(x, y);
      enemy.changeTurn();
      turn = false;
      return 'Success';
    }

    if (isValidMove(x, y, enemy.board) && !turn) {
      return 'Not your turn';
    }

    const otherMsg = enemy.board.receiveAttack(x, y);
    return otherMsg;
  };

  return { board: playerBoard, sendAttack, changeTurn, getTurn };
};

module.exports = Player;
