const { createBoard, findCell } = require('../createBoard');

const board = createBoard();

describe('createBattleship()', () => {
  it('should create a 10x10 grid with no input', () => {
    const start = [{ x: 1, y: 1, ship: null, missed: null }];
    const end = [{ x: 10, y: 10, ship: null, missed: null }];
    expect(board.grid).toHaveLength(100);
    expect(board.grid).toEqual(expect.arrayContaining(start));
    expect(board.grid).toEqual(expect.arrayContaining(end));
  });

  it('should place a ship length of 2 at 1,1 & 1,2', () => {
    board.placeShip(1, 1, 2, 'Y');
    const cell = findCell(1, 1, board.grid);
    const cell2 = findCell(1, 2, board.grid);
    const cell3 = findCell(1, 3, board.grid);
    expect(cell.ship).not.toBeNull();
    expect(cell2.ship).not.toBeNull();
    expect(cell3.ship).toBeNull();
  });

  it('should place a ship length 2 at 1,1 & 2,1', () => {
    board.placeShip(5, 5, 2, 'X');
    const cell = findCell(5, 5, board.grid);
    const cell2 = findCell(6, 5, board.grid);
    const cell3 = findCell(7, 5, board.grid);
    expect(cell.ship).not.toBeNull();
    expect(cell2.ship).not.toBeNull();
    expect(cell3.ship).toBeNull();
  });

  it('should return a string with out of bounds placement of ships', () => {
    expect(board.placeShip(11, 1, 2, 'X')).toBe('Out of bounds');
    expect(board.placeShip(0, 1, 2, 'X')).toBe('Out of bounds');
    expect(board.placeShip(1, 11, 2, 'X')).toBe('Out of bounds');
    expect(board.placeShip(1, 0, 2, 'X')).toBe('Out of bounds');
  });

  test('a cell with a ship (1,1) should take damage from receiveAttack at (1,1)', () => {
    const { ship } = findCell(1, 1, board.grid);
    ship.hit();

    expect(board.receiveAttack(1, 1).ship).toStrictEqual(ship);
    expect(board.receiveAttack(1, 1).missed).toBe(false);
  });

  it('should record a missed attack', () => {
    board.receiveAttack(3, 3);
    const cell = findCell(3, 3, board.grid);

    expect(cell.missed).toBe(true);
  });

  it('should not allow out of bounds attacks', () => {
    expect(board.receiveAttack(11, 1)).toBe('Out of bounds');
    expect(board.receiveAttack(1, 11)).toBe('Out of bounds');
  });
});
