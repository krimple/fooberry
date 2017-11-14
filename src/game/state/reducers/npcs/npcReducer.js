import {fromJS} from 'immutable';
import * as actions from './npcActions';


export default function npcReducer(state = fromJS({}), action) {
  switch(action.type) {
  case actions.NPC_MOVE_ACTION:
    return moveNPC(state, action);
  case actions.UPDATE_NPC_STRENGTH:
    return updateNPCStrength(state, action);
  case actions.LOAD_NPCS:
    return loadNPCs(state, action);
  case actions.KILL_NPC:
    return killNPC(state, action);
  default:
    return state;
  }
}

function loadNPCs(state, action) {
  const npcs = action.payload.data;
  return state.withMutations((state) => {
    state.set('npcs', fromJS(npcs));
  });
}

function moveNPC(state, action) {
  const npc = action.payload.npc;
  const coordinates = action.payload.coordinates;
  return state.setIn(['npcs', npc, 'point'], fromJS({
    x: coordinates.x,
    y: coordinates.y
  }));
}

function updateNPCStrength(state, action) {
  return state.withMutations((state) => {
    const npcKey = action.payload.npcKey;
    const newStrength = action.payload.newStrength;
    state.setIn(['npcs', npcKey, 'hitPoints'], newStrength);
  });
}

function killNPC(state, action) {
  const npcKey = action.payload.npcKey;
  return state.withMutations((state) => {
    state.setIn(['npcs', npcKey, 'isAlive'], false);
    state.removeIn(['npcs', npcKey]);
  });
}

