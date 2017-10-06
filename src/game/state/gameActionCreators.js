import * as actions from './gameStoreActions';

export function moveActionCreator(direction) {
  return {
    type: actions.MOVE_ACTION,
    payload: {
      direction: direction
    }
  };
}
export function moveNPCThiefCreator(point) {
  return {
    type: actions.NPC_THIEF_MOVE_ACTION,
    payload: {
      point: point
    }
  }
}

export function changeRandomTile() {
  return {
    type: actions.CHANGE_RANDOM_TILE
  };
}

export function updatePlayerInfo(playerInfo) {
  return {
    type: actions.UPDATE_PLAYER_INFO,
    payload: playerInfo
  };
}