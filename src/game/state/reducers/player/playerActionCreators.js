import * as actions from './playerActions';

export function moveActionCreator(direction) {
  return {
    type: actions.MOVE_ACTION,
    payload: {
      direction: direction
    }
  };
}
export function updatePlayerInfo(playerInfo) {
  return {
    type: actions.UPDATE_PLAYER_INFO,
    payload: playerInfo
  };
}

