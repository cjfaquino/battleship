const { createBoard } = require('./createBoard');
const Player = require('./Player');
const CPU = require('./CPU');
const renderBoard = require('./renderBoard');
const createBoardDOM = require('./createBoardDOM');

const game = (size = 10) => {
  createBoardDOM(size);

  const playerBoard = createBoard(size);
  const cpuBoard = createBoard(size);

  const player = Player('p1', playerBoard);
  const cpu = CPU(cpuBoard);

  playerBoard.placeShip(1, 1, 5, 'Y');
  playerBoard.placeShip(3, 1, 4, 'Y');
  playerBoard.placeShip(5, 1, 3, 'Y');
  playerBoard.placeShip(7, 1, 3, 'Y');
  playerBoard.placeShip(9, 1, 2, 'Y');

  cpuBoard.placeShip(1, 1, 5, 'X');
  cpuBoard.placeShip(1, 3, 4, 'X');
  cpuBoard.placeShip(1, 5, 3, 'X');
  cpuBoard.placeShip(1, 7, 3, 'X');
  cpuBoard.placeShip(1, 9, 2, 'X');

  renderBoard('player', playerBoard);
  renderBoard('cpu', cpuBoard);

  return { player, cpu, playerBoard, cpuBoard };
};

module.exports = game;
