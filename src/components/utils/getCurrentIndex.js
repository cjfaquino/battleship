let index = 0;

document.addEventListener('ship placed', () => {
  index += 1;
});

document.addEventListener('reset board', () => {
  index = 0;
});

const getCurrentIndex = () => index;

module.exports = getCurrentIndex;
