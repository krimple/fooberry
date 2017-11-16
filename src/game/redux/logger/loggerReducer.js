const LOG_MOVE_ACTION = 'fooberry/log/LOG_MOVE_ACTION';

const loggerInitialState = {
  moves: [],
};

export default function reducer(state = loggerInitialState, action) {
  switch (action.type) {
  case LOG_MOVE_ACTION:
      return { 
        ...state, 
        moves: [`Moved ${action.payload.character} to ${action.payload.x},${action.payload.y}`, ...state.moves]
      };
  default:
    return state;
  }
}

export function logMovement(character, x, y) {
  return {
    type: LOG_MOVE_ACTION,
    payload: {
      character: character,
      x,
      y
    }
  };
}
