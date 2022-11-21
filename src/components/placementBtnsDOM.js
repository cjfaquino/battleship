const { rotateAxis } = require('./utils/rotateAxis');
const resetPlacement = require('./utils/resetPlacement');

const rotateBtn = () => {
  const btn = document.querySelector('.rotate-btn');
  btn.dataset.axis = 'X';
  btn.addEventListener('click', rotateAxis);
};

const resetBtn = (board) => {
  const btn = document.querySelector('.reset-placement');
  const confirm = document.querySelector('.confirm-placement');

  btn.addEventListener('click', () => {
    confirm.disabled = true;
    const event = new Event('reset board');
    document.dispatchEvent(event);
    resetPlacement(board);
  });
};

const confirmBtn = (shipSize) => {
  const btn = document.querySelector('.confirm-placement');

  btn.disabled = true;
  let index = 0;

  document.addEventListener('ship placed', () => {
    index += 1;
  });

  document.addEventListener('reset board', () => {
    index = 0;
  });

  btn.addEventListener('click', () => {
    if (index >= shipSize.length) {
      const event = new Event('finished placing');
      document.dispatchEvent(event);
    }
  });
};

module.exports = { rotateBtn, resetBtn, confirmBtn };
