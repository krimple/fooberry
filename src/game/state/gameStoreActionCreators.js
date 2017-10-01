import * as actions from './gameStoreActions';

export function moveActionCreator(direction) {
  return {
    type: actions.MOVE_ACTION,
    payload: {
      direction: direction
    }
  };
}

export function changeRandomTile() {
  return {
    type: actions.CHANGE_RANDOM_TILE
  };
}