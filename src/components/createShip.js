const createShip = (length) => {
  let hits = 0;

  const hit = () => {
    hits += 1;
    return hits;
  };

  const isSunk = () => hits >= length;
  return { length, hit, isSunk };
};

module.exports = createShip;
