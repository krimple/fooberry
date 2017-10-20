import * as actions from './loggerActions';

export function logMovementCreator(character, x, y) {
  return {
    type: actions.LOG_MOVE_ACTION,
    payload: {
      character: character,
      x,
      y
    }
  };
}
