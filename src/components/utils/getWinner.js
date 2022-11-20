const getWinner = (player, cpu) => {
  if (player.board.allShipsSunk()) return 'CPU is the winner.';
  if (cpu.board.allShipsSunk()) return 'You are the winner!';
};

module.exports = getWinner;
