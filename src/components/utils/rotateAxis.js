const rotateAxis = () => {
  const rotateBtn = document.querySelector('.rotate-btn');
  if (rotateBtn.dataset.axis === 'X') {
    rotateBtn.dataset.axis = 'Y';
  } else {
    rotateBtn.dataset.axis = 'X';
  }
};

const getAxis = () => {
  const rotateBtn = document.querySelector('.rotate-btn');
  return rotateBtn.dataset.axis;
};

module.exports = { rotateAxis, getAxis };
