import * as actions from './gridActions';

export function resetGrid() {
  return {
    type: actions.RESET_GRID
  };
}

export function changeRandomTile() {
  return {
    type: actions.CHANGE_RANDOM_TILE
  };
}

