import * as actions from './playerActions';

export function move(direction) {
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

export function fireWeapon() {
  return {
    type: actions.FIRE_ACTION
  };
}

export function chooseWeapon(weapon) {
  return {
    type: actions.CHOOSE_WEAPON,
    payload: {
      weapon: weapon
    }
  };
}

export function updatePlayerStrength(hitPoints) {
  return {
    type: actions.UPDATE_PLAYER_STRENGTH,
    payload: {
      hitPoints: hitPoints
    }
  };
}
