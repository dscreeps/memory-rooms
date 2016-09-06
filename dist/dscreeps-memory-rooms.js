'use strict'; // v1.0.0

Game.Memory.dscreeps = Game.Memory.dscreeps || {};

module.exports = () => {
  const memory = Game.Memory.dscreeps;

  updateTicksToLive(memory);
  updateRoomsData(memory);
};

/*
 * const hostileCreepData = {
 *   id: 'id',
 *   owner: undefined || { username: 'username' },
 *   ticksToLive: 0
 * };
 */

function getHostileCreepData(creep) {
  const hostileCreepData = {
    id: creep.id,
    owner: { username: creep.owner.username },
    ticksToLive: creep.ticksToLive
  };
  return hostileCreepData;
}

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

  const hostileCreepsData = room.find(FIND_HOSTILE_CREEPS).map(getHostileCreepData);
  roomData.hostileCreeps = hostileCreepsData;

  return roomData;
}

function updateRoomsData(memory) {
  const roomsData = {};

  _.each(Game.rooms, room => {
    roomsData[room.name] = getRoomData(room);
  });

  memory.rooms = memory.rooms || {};
  Object.assign(memory.rooms, roomsData);
}

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
