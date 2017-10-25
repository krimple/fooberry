import {fromJS} from 'immutable';
import Point2 from '../../Point2';
import * as actions from './npcActions';

const npcCharactersInitialState = fromJS({
  thief: {
    point: {x: 1, y: 1},
    strength: 100,
    isAlive: true
  }
});

export default function npcReducer(state = npcCharactersInitialState, action) {
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
  debugger;
  const npcs = action.payload.data;
  return state.withMutations((state) => {
    state.set('npcs', npcs);
  });
}

function moveNPC(state, action) {
  return state.withMutations((state) => {
    const npc = action.payload.npc;
    const thiefLocation = state.getIn([npc, 'point']);
    const playerPoint = action.payload.playerPoint;

    const newCoordinates = Point2.moveTracking(
      thiefLocation.get('x'), thiefLocation.get('y'),
      playerPoint.x, playerPoint.y);

    // TODO clean this up and maybe move into moveTracking
    if (newCoordinates.x === playerPoint.x && newCoordinates.y === playerPoint.y) {
      return state;
    } else {
      return state.setIn(['thief', 'point'], fromJS({
        x: newCoordinates.x,
        y: newCoordinates.y
      }));
    }
  });
}

function updateNPCStrength(state, action) {
  return state.withMutations((state) => {
    const npc = action.payload.npc;
    const newStrength = action.payload.newStrength;
    const isAlive = newStrength > 0;
    state.setIn([npc, 'strength'], newStrength);
    state.setIn([npc, 'isAlive'], isAlive);
  });
}
