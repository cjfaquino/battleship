const createBoard = require('./factories/createBoard');
const Player = require('./factories/Player');
const CPU = require('./factories/CPU');
const renderBoard = require('./renderBoard');
const createBoardDOM = require('./createBoardDOM');
const renderEnemyBoard = require('./renderEnemyBoard');
const { attackCpu, attackPlayer } = require('./attackDOM');
const { placeShipsInput, placeCpuShips } = require('./placeShipsInput');
const getWinner = require('./utils/getWinner');

const game = (size = 10) => {
  // input ships
  createBoardDOM(size, 'place-ships');

  // create board DOMs
  const { board: playerDOM } = createBoardDOM(size, 'player');
  const { board: cpuDOM } = createBoardDOM(size, 'cpu');

  // initialize player
  const playerBoard = createBoard(size);
  const player = Player('p1', playerBoard);
  playerDOM.classList.add('hide');

  // initialize cpu
  const cpuBoard = createBoard(size);
  const cpu = CPU(cpuBoard);
  cpuDOM.classList.add('hide');

  renderBoard('place-ships', playerBoard);
  placeShipsInput(playerBoard);

  cpuDOM.addEventListener('click', attackCpu(player, cpu));

  document.addEventListener('finished placing', () => {
    const menu = document.getElementById('input-menu');
    placeCpuShips(cpuBoard);
    renderBoard('player', playerBoard);
    renderEnemyBoard(cpuBoard);

    menu.classList.add('hide');
    playerDOM.classList.remove('hide');
    cpuDOM.classList.remove('hide');

    // test
    // for (let i = 0; i < 90; i++) {
    //   const attackable = cpuBoard.getAttackable();
    //   const randomIndex = Math.floor(Math.random() * attackable.length);
    //   const randomCell = attackable[randomIndex];
    //   const { x, y } = randomCell;
    //   player.sendAttack(x, y, cpu);
    //   cpu.sendAttack(player);
    // }
    // renderBoard('player', playerBoard);
    // renderEnemyBoard(cpuBoard);

    document.dispatchEvent(new Event('playerTurn'));
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
    const msg = document.getElementById('winning-message');
    const gameOver = document.getElementById('game-over');
    const restartBtn = document.querySelector('.restart-btn');

    gameOver.classList.remove('hide');
    msg.textContent = getWinner(player, cpu);

    restartBtn.addEventListener('click', () => {
      window.location.reload();
    });
  });

  return { player, cpu, playerBoard, cpuBoard };
};

module.exports = { game };
