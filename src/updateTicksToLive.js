function updateTicksToLive(memory) {
  _.each(memory.rooms, roomData => {
    if (Game.rooms[roomData.name]) {
      return;
    }

    _.each(roomData.hostileCreeps, creepData => {
      --creepData.ticksToLive;
    });

    roomData.hostileCreeps = _.filter(roomData.hostileCreeps, creepData => creepData.ticksToLive);
  });
}
