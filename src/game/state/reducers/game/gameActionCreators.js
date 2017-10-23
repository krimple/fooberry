import * as gameActions  from './gameActions';

export function beginAttackCreator() {
  return {
    type: gameActions.BEGIN_ATTACK
  };
}

export function chooseWeaponCreator(weapon) {
  return {
    type: gameActions.CHOOSE_WEAPON,
    payload: {
      weapon: weapon
    }
  };
}

export function attackCreator() {
  return {
    type: gameActions.ATTACK
  };
}
export function endAttackCreator() {
  return {
    type: gameActions.END_ATTACK
  };
}
