import * as actions from './npcActions';
export function moveNPCThiefCreator(playerPoint) {
  return {
    type: actions.NPC_THIEF_MOVE_ACTION,
    payload: {
      playerPoint: playerPoint
    }
  };
}
