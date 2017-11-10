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
    debugger;
    const npc = action.payload.npc;
    const newStrength = action.payload.newStrength;
    const isAlive = newStrength > 0;
    state.setIn(['npcs', npc, 'hitPoints'], newStrength);
    state.setIn(['npcs', npc, 'isAlive'], isAlive);
  });
}

