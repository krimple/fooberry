import * as gameActions from './gameActions';

const initialState = {
  gameRunning: false,
  attacking: false,
  defending: false,
  moves: 0,
  tick: 0
};

export default function gameReducer(state = initialState, action) {

  switch(action.type) {
  case gameActions.BEGIN_GAME:
    return Object.assign({}, state, { gameRunning: true });
  case gameActions.BEGIN_ATTACK:
    return Object.assign({}, state, { attacking: true });
  case gameActions.TIME_TICK:
    return Object.assign({}, state, { tick: state.tick + 1 });
  case gameActions.ATTACK:
    return state;
  case gameActions.END_ATTACK:
    return Object.assign({}, state, { attacking: false });
  case gameActions.BEGIN_DEFENSE:
    break;
  case gameActions.END_DEFENSE:
    break;
  case gameActions.END_GAME:
    return Object.assign({}, state, { gameRunning: false });

  default:
  }
  
  return state;
}
