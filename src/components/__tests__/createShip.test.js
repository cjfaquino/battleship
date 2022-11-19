const createShip = require('../factories/createShip');

describe('Ship factory', () => {
  const ship = createShip(3);
  it('should output with length 5 if input 5', () => {
    expect(createShip(5)).toHaveProperty('length', 5);
  });

  it('should increase hit by 1 with hit() to 1', () => {
    expect(ship.hit()).toBe(1);
  });

  it('should increase hit by 1 with hit() to 2', () => {
    expect(ship.hit()).toBe(2);
  });

  it('should create a ship that is not sunk', () => {
    expect(createShip(2).isSunk()).toBe(false);
  });

  it('should change sunk to true when hit >== length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
