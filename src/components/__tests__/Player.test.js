const Player = require('../factories/Player');
const createBoard = require('../factories/createBoard');
const CPU = require('../factories/CPU');

const playerBoard = createBoard();
const enemyBoard = createBoard();
const player = Player('p1', playerBoard);
const cpu = CPU(enemyBoard);

describe('Player object', () => {
  it('should change turn after attacking enemy board', () => {
    expect(player.getTurn()).toBe(true);
    expect(cpu.getTurn()).toBe(false);
    player.sendAttack(1, 1, cpu);
    expect(player.getTurn()).toBe(false);
    expect(cpu.getTurn()).toBe(true);
    cpu.sendAttack(player);
    expect(player.getTurn()).toBe(true);
    expect(cpu.getTurn()).toBe(false);
  });

  it('should not allow out of bounds attack', () => {
    expect(player.getTurn()).toBe(true);
    expect(cpu.getTurn()).toBe(false);
    player.sendAttack(11, 1, cpu);
    expect(player.getTurn()).toBe(true);
    expect(cpu.getTurn()).toBe(false);
  });

  it('should not allow out of turn attacks', () => {
    expect(cpu.sendAttack(player)).toBe('Not your turn');
    expect(player.sendAttack(3, 3, cpu)).toBe('Success');
    expect(player.sendAttack(2, 2, cpu)).toBe('Not your turn');
  });

  it('should not allow same space attacks', () => {
    cpu.sendAttack(player);
    expect(player.sendAttack(1, 1, cpu)).toBe("Can't attack same cell");
  });
});
