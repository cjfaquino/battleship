const { createBoard, findCell } = require('../createBoard');

const board = createBoard();

describe.only('createBattleship()', () => {
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

  it('should not place a ship out of bounds when placed on edge 10,10', () => {
    board.placeShip(10, 9, 3, 'Y');
    const cell = findCell(10, 8, board.grid);
    const cell1 = findCell(10, 9, board.grid);
    const cell2 = findCell(10, 10, board.grid);
    const cell3 = findCell(10, 11, board.grid);
    expect(cell.ship).not.toBeNull();
    expect(cell1.ship).not.toBeNull();
    expect(cell2.ship).not.toBeNull();
    expect(cell3).toBe(undefined);
  });

  it('should not place a ship out of bounds when placed on edge 10,10', () => {
    board.placeShip(10, 10, 3, 'X');
    const cell = findCell(8, 10, board.grid);
    const cell1 = findCell(9, 10, board.grid);
    const cell2 = findCell(10, 10, board.grid);
    const cell3 = findCell(11, 10, board.grid);
    expect(cell.ship).not.toBeNull();
    expect(cell1.ship).not.toBeNull();
    expect(cell2.ship).not.toBeNull();
    expect(cell3).toBe(undefined);
  });

  it('should return a string with out of bounds placement of ships', () => {
    expect(board.placeShip(11, 1, 2, 'X')).toBe('Out of bounds');
    expect(board.placeShip(0, 1, 2, 'X')).toBe('Out of bounds');
    expect(board.placeShip(1, 11, 2, 'X')).toBe('Out of bounds');
    expect(board.placeShip(1, 0, 2, 'X')).toBe('Out of bounds');
  });

  test('a cell with a ship (1,1) should take damage from receiveAttack at (1,1)', () => {
    const { ship } = findCell(1, 1, board.grid);
    expect(board.receiveAttack(1, 1).missed).toBe(false);
    expect(ship.isSunk()).toBe(false);
  });

  it('cannot attack the same space', () => {
    const { ship } = findCell(1, 1, board.grid);
    expect(board.receiveAttack(1, 1)).toBe("Can't attack same cell");
    expect(ship.isSunk()).toBe(false);
  });

  test('ship at 1,1, 1,2 increases damage if attacked next space', () => {
    expect(board.receiveAttack(1, 2).ship.isSunk()).toBe(true);
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
