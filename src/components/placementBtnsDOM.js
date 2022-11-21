const { rotateAxis } = require('./utils/rotateAxis');
const resetPlacement = require('./utils/resetPlacement');
const randomPlacement = require('./utils/randomPlacement');
const renderBoard = require('./renderBoard');
const getCurrentIndex = require('./utils/getCurrentIndex');

const rotateBtn = () => {
  const btn = document.querySelector('.rotate-btn');
  btn.dataset.axis = 'X';
  btn.addEventListener('click', rotateAxis);
};

const randomizeBtn = (board) => {
  const btn = document.querySelector('.randomize-btn');

  btn.addEventListener('click', () => {
    resetPlacement(board);
    randomPlacement(board);
    renderBoard('place-ships', board);

    const event = new Event('randomize');
    document.dispatchEvent(event);
  });
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

  document.addEventListener('ship placed', () => {
    const index = getCurrentIndex();
    if (index >= shipSize.length) {
      btn.disabled = false;
    }
  });

  btn.addEventListener('click', () => {
    const index = getCurrentIndex();
    if (index >= shipSize.length) {
      const event = new Event('finished placing');
      document.dispatchEvent(event);
    }
  });
};

module.exports = { rotateBtn, randomizeBtn, resetBtn, confirmBtn };
