const findCell = (x, y, arr) =>
  arr.find((cell) => cell.x === x && cell.y === y);

module.exports = findCell;
