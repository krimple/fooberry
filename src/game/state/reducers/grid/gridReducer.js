import Tile from '../../Tile';
import Point2 from '../../Point2';
import * as actions from './gridActions';
import { fromJS } from 'immutable';
const numRows = 15, numCols = 15;
Point2.setBounds(numRows, numCols);
const gridData = generateGrid(numRows, numCols);

export default function gridReducer (state, action) {
  if (state === undefined) {
    return fromJS(gridData);
  }

  switch (action.type) {
  case actions.CHANGE_RANDOM_TILE:
    return changeRandomTile(state);
  default:
    return state;
  }

}

function changeRandomTile(state) {
  const randomX = Math.floor(Math.random() * numCols);
  const randomY = Math.floor(Math.random() * numRows);
  const randomTileType = Math.floor(Math.random() * 4);
  return state.setIn(['grid', randomX, randomY], fromJS(new Tile(randomY, randomX, randomTileType)));
}

function generateGrid(numRows, numCols) {
  const grid = [];
  for (let y = 0; y < numRows; y++) {
    const row = [];
    for (let x = 0; x < numCols; x++) {
      row.push(new Tile(x, y));
    }
    grid.push(row);
  }
  return grid;
}
