import * as gameActions from './gameActions';

const initialState = {
  attacking: false,
  defending: false,
  moves: 0
};

export default function gameReducer(state = initialState, action) {

  switch(action.type) {
  case gameActions.BEGIN_ATTACK:
    return Object.assign({}, state, { attacking: true });
  case gameActions.ATTACK:
    return state;
  case gameActions.END_ATTACK:
    return Object.assign({}, state, { attacking: false });
  case gameActions.BEGIN_DEFENSE:
    break;
  case gameActions.END_DEFENSE:
    break;
  default:
  }
  
  return state;
}
