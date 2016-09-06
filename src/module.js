Game.Memory.dscreeps = Game.Memory.dscreeps || {};

module.exports = () => {
  const memory = Game.Memory.dscreeps;

  updateTicksToLive(memory);
  updateRoomsData(memory);
};
