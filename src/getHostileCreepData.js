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
