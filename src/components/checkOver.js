const checkOver = (player, cpu) => {
  if (player.board.allShipsSunk() || cpu.board.allShipsSunk()) {
    const event = new Event('gameOver');
    document.dispatchEvent(event);
    return true;
  }
  return false;
};

module.exports = checkOver;
