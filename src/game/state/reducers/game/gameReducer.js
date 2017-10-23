import * as gameActions from './gameActions';

const initialState = {
  attacking: false,
  defending: false
};

export default function gameReducer(state = initialState, action) {

  switch(action.type) {
  case gameActions.BEGIN_ATTACK:
    return Object.assign({}, { attacking: true });
  case gameActions.ATTACK:
    return state;
  case gameActions.END_ATTACK:
    return Object.assign({}, { attacking: false });
  case gameActions.BEGIN_DEFENSE:
    break;
  case gameActions.END_DEFENSE:
    break;
  default:
  }
  
  return state;
}
