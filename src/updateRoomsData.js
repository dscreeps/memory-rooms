function updateRoomsData(memory) {
  const roomsData = {};

  _.each(Game.rooms, room => {
    roomsData[room.name] = getRoomData(room);
  });

  memory.rooms = memory.rooms || {};
  Object.assign(memory.rooms, roomsData);
}
