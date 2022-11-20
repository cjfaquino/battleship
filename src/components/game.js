const createBoard = require('./factories/createBoard');
const Player = require('./factories/Player');
const CPU = require('./factories/CPU');
const renderBoard = require('./renderBoard');
const createBoardDOM = require('./createBoardDOM');
const renderEnemyBoard = require('./renderEnemyBoard');
const { attackCpu, attackPlayer } = require('./attackDOM');
const placeShips = require('./placeShipsDOM');

const game = (size = 10) => {
  const { board: placeShipsDOM } = createBoardDOM(size, 'place-ships');
  const { board: playerDOM } = createBoardDOM(size, 'player');
  const { board: cpuDOM } = createBoardDOM(size, 'cpu');
  const inputBoard = createBoard(size);
  const playerBoard = createBoard(size);
  const cpuBoard = createBoard(size);

  cpuDOM.classList.add('hide');
  playerDOM.classList.add('hide');

  renderBoard('place-ships', inputBoard);
  placeShips(placeShipsDOM, inputBoard);

  const player = Player('p1', playerBoard);
  const cpu = CPU(cpuBoard);

  // playerBoard.placeShip(1, 1, 5, 'Y');
  // playerBoard.placeShip(3, 1, 4, 'Y');
  // playerBoard.placeShip(5, 1, 3, 'Y');
  // playerBoard.placeShip(7, 1, 3, 'Y');
  // playerBoard.placeShip(9, 1, 2, 'Y');

  // cpuBoard.placeShip(1, 1, 5, 'X');
  // cpuBoard.placeShip(1, 3, 4, 'X');
  // cpuBoard.placeShip(1, 5, 3, 'X');
  // cpuBoard.placeShip(1, 7, 3, 'X');
  // cpuBoard.placeShip(1, 9, 2, 'X');

  // test
  // for (let i = 0; i < 90; i++) {
  //   const attackable = cpuBoard.getAttackable();
  //   const randomIndex = Math.floor(Math.random() * attackable.length);
  //   const randomCell = attackable[randomIndex];
  //   const { x, y } = randomCell;
  //   player.sendAttack(x, y, cpu);
  //   cpu.sendAttack(player);
  // }

  renderBoard('player', playerBoard);
  renderEnemyBoard(cpuBoard);

  // cpuDOM.childNodes.forEach((cell) => {
  //   cell.addEventListener('click', attackCpu(player, cpu));
  // });

  cpuDOM.addEventListener('click', attackCpu(player, cpu));

  document.addEventListener('finished placing', () => {
    console.log('finished placing');
  });

  document.addEventListener('cpuTurn', () => {
    cpuDOM.classList.remove('current-turn');
    playerDOM.classList.add('current-turn');
    attackPlayer(player, cpu);
  });

  document.addEventListener('playerTurn', () => {
    playerDOM.classList.remove('current-turn');
    cpuDOM.classList.add('current-turn');
  });

  document.addEventListener('gameOver', () => {
    console.log('game over');
  });

  return { player, cpu, playerBoard, cpuBoard };
};

module.exports = { game };
