/*
 * const roomData = {
 *   modified: undefined || 0, // Game.time of the last memory update for the room
 *   name: 'room name',
 *
 *   controller: undefined || {
 *     owner: undefined || { username: 'username' },
 *     my: false || true,
 *     reservation: undefined || { username: 'username', ticksToEnd: 0 }
 *   },
 *
 *   hostileCreeps: []
 * };
 */

function getRoomData(room) {
  const roomData = {
    modified: Game.time,
    name: room.name
  };

  const controller = room.controller;
  if (controller) {
    const controllerData = {
      my: controller.my,
      owner: { username: controller.owner.username }
    };

    const reservation = controller.reservation;
    if (reservation) {
      const reservationData = {
        ticksToEnd: reservation.ticksToEnd,
        username: reservation.username
      };
      controllerData.reservation = reservationData;
    }

    roomData.controller = controllerData;
  }

  roomData.hostileCreeps =
    room
      .find(FIND_HOSTILE_CREEPS)
      .map(creep => creep.id);

  return roomData;
}
