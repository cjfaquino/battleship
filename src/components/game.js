const { createBoard } = require('./createBoard');
const Player = require('./Player');
const CPU = require('./CPU');
const renderBoard = require('./renderBoard');
const createBoardDOM = require('./createBoardDOM');
const renderEnemyBoard = require('./renderEnemyBoard');
const { attackCpu, attackPlayer } = require('./attackDOM');

const game = (size = 10) => {
  const { cpu: cpuDOM } = createBoardDOM(size);
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

  // test
  // for (let i = 0; i < 200; i++) {
  //   const randX = Math.floor(Math.random() * 10 + 1);
  //   const randY = Math.floor(Math.random() * 10 + 1);
  //   player.sendAttack(randX, randY, cpu);
  //   cpu.sendAttack(player);
  // }

  renderBoard('player', playerBoard);
  renderEnemyBoard(cpuBoard);

  cpuDOM.childNodes.forEach((cell) => {
    cell.addEventListener('click', attackCpu(player, cpu));
  });

  document.addEventListener('cpuTurn', attackPlayer(player, cpu));
  document.addEventListener('playerTurn', () => {
    console.log('player turn');
  });

  document.addEventListener('gameOver', () => {
    cpuDOM.childNodes.forEach((cell) => {
      cell.removeEventListener('click', attackCpu(player, cpu));
    });
    console.log('game over');
  });
  return { player, cpu, playerBoard, cpuBoard };
};

module.exports = { game };
