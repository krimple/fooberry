import {fromJS} from 'immutable';
import Point2 from '../../Point2';
import * as actions from './npcActions';

const npcCharactersInitialState = fromJS({
  thief: {
    point: {x: 1, y: 1},
    strength: 100
  }
});

export default function npcReducer(state = npcCharactersInitialState, action) {
  switch(action.type) {
  case actions.NPC_THIEF_MOVE_ACTION:
    return moveNPCThief(state, action);
  default:
    return state;
  }
}

function moveNPCThief(state, action) {
  return state.withMutations((state) => {
    const thiefLocation = state.getIn(['thief', 'point']);
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

