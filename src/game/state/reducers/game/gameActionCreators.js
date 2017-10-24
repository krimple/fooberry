import * as gameActions  from './gameActions';

export function beginAttack() {
  return {
    type: gameActions.BEGIN_ATTACK
  };
}

export function attack() {
  return {
    type: gameActions.ATTACK
  };
}

export function endAttack() {
  return {
    type: gameActions.END_ATTACK
  };
}
