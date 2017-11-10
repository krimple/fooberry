import * as gameActions  from './gameActions';

export function beginGame() {
  return {
    type: gameActions.BEGIN_GAME
  };
}

export function beginAttack(npc) {
  return {
    type: gameActions.BEGIN_ATTACK,
    payload: {
      npc: npc
    }
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

export function endGame() {
  return {
    type: gameActions.END_GAME
  };
}
