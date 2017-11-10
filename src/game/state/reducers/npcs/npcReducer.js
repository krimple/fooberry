import {fromJS} from 'immutable';
import Point2 from '../../Point2';
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
  const npcs = state.getIn(['npcs']);

  const npcLocation = npcs.getIn([npc, 'point']);
  const playerPoint = action.payload.playerPoint;

  const newCoordinates = Point2.moveTracking(
    npcLocation.get('x'), npcLocation.get('y'),
    playerPoint.x, playerPoint.y);
  if (newCoordinates.x === playerPoint.x && newCoordinates.y === playerPoint.y) {
    return state;
  } else if (checkSamePointAsOtherNPCs(state, npc, newCoordinates.x, newCoordinates.y)) {
    return state;
  } else {
    return state.setIn(['npcs', npc, 'point'], fromJS({
      x: newCoordinates.x,
      y: newCoordinates.y
    }));
  }
}

function updateNPCStrength(state, action) {
  return state.withMutations((state) => {
    const npc = action.payload.npc;
    const newStrength = action.payload.newStrength;
    const isAlive = newStrength > 0;
    state.setIn(['npcs', npc, 'strength'], newStrength);
    state.setIn(['npcs', npc, 'isAlive'], isAlive);
  });
}

function checkSamePointAsOtherNPCs(state, npc, x, y) {
  const npcs = state.getIn(['npcs']);
  npcs.forEach((item) => {
    if (item.get('key') !== npc) {
      if (item.getIn(['point','x']) === x && item.getIn(['point', 'y']) === y) {
        return true;
      }
    }
  });

  return false;
}
