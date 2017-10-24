import {fromJS} from 'immutable';
import Point2 from '../../Point2';
import * as actions from './playerActions';

const playerInitialState = fromJS({
  name: 'FooBerry the Wise',
  point: { x: 7, y: 7 },
  strength: 100,
  weapon: null
});

export default function playerReducer(state = playerInitialState, action) {
  switch (action.type) {
  case actions.MOVE_ACTION:
    return moveTo(state, action.payload.direction);
  case actions.UPDATE_PLAYER_INFO:
    return updatePlayerInfo(state, action);
  case actions.CHOOSE_WEAPON:
    return chooseWeapon(state, action);
  case actions.FIRE_ACTION:                        // marker action - saga picks it up
    return state;
  default:
    return state;
  }
}

function moveTo(state, direction) {
  // temporary until we get our heads around the object graph
  const currentPosition = state.getIn(['point']);
  let newPosition;
  switch (direction) {
  case 'north':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 0, -1);
    break;
  case 'south':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 0, 1);
    break;
  case 'west':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), -1, 0);
    break;
  case 'east':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 1, 0);
    break;
  default:
    newPosition = currentPosition;
  }

  return state.withMutations((state) => {
    return state
      .setIn(['point'], fromJS({
        x: newPosition.x,
        y: newPosition.y
      }));
  });
}

function updatePlayerInfo(state, action) {
  return state.withMutations(state => {
    state.set('name', action.payload.name);
  });
}

function chooseWeapon(state, action) {
  return state.set('weapon', action.payload.weapon);
}
