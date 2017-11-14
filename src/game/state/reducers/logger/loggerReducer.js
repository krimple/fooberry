import * as actions from './loggerActions';

const loggerInitialState = {
  moves: [],
};

export default function gameReducer (state = loggerInitialState, action) {
  switch (action.type) {
  case actions.LOG_MOVE_ACTION:
    console.log(`received log move: ${JSON.stringify(action.payload.character)}`);
    return Object.assign({}, state, {
      moves: [`Moved ${action.payload.character} to ${action.payload.x},${action.payload.y}`, ...state.moves]
    });
  default:
    return state;
  }
}

