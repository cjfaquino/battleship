const  getCurrentIndex  = require('./getCurrentIndex');
const { getAxis } = require('./rotateAxis');

const highlightPlacement = (shipSize) => {
  const boardDOM = document.getElementById('place-ships');

  boardDOM.childNodes.forEach((cell) => {
    cell.addEventListener('mouseenter', () => {
      const index = getCurrentIndex();
      let { x, y } = cell.dataset;
      const nodes = [];
      nodes.push(cell);

      x = Number(x);
      y = Number(y);

      const length = shipSize[index];
      const axis = getAxis();

      for (let i = 1; i < length; i++) {
        let nextCell;
        if (axis === 'X') {
          if (x + i > 10) x -= length;
          nextCell = document.querySelector(
            `[data-x='${Number(x + i)}'][data-y='${Number(y)}']`
          );
        } else if (axis === 'Y') {
          if (y + i > 10) y -= length;
          nextCell = document.querySelector(
            `[data-x='${Number(x)}'][data-y='${Number(y + i)}']`
          );
        }
        nodes.push(nextCell);
      }

      if (length) {
        nodes.forEach((el) => {
          el.classList.add('highlight');
        });
      }
    });
  });

  boardDOM.childNodes.forEach((cell) => {
    cell.addEventListener('mouseleave', () => {
      boardDOM.childNodes.forEach((el) => {
        el.classList.remove('highlight');
      });
    });
  });
};

module.exports = highlightPlacement;
