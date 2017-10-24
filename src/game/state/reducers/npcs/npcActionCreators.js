import * as actions from './npcActions';
export function moveNPC(npc, playerPoint) {
  return {
    type: actions.NPC_MOVE_ACTION,
    payload: {
      npc: npc,
      playerPoint: playerPoint
    }
  };
}

export function updateStrength(npc, strength) {
  return {
    type: actions.UPDATE_NPC_STRENGTH,
    payload: {
      npc: npc,
      newStrength: strength
    }
  };
}
