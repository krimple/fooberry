import { createStore } from 'redux';
import * as actions from './gameStoreActions';
import CoordinateHelper from  '../utils/CoordinateHelper';
import Tile from './Tile';
import Point from './Point';
import Player from './Player';

const numRows = 15,
      numCols = 15;
Point.configureCoordinateSystem(numCols, numRows);

const coordinateHelper = new CoordinateHelper(numRows, numCols);

const initialState = {
    numRows: numRows,
    numCols: numCols,
    grid:  generateGrid(numRows, numCols)
};

let createGameStore = () => {
    return createStore(boardReducer, initialState);
};

function boardReducer(state, action) {
  switch (action.type) {
    case actions.MOVE_ACTION:
      return moveTo(state, action.payload.direction);
    case actions.CHANGE_RANDOM_TILE:
      const randomTile = Math.floor(Math.random() * (numRows * numCols));
      const randomValue = Math.floor(Math.random() * 4);
      return Object.assign({}, state, {
        grid: state.grid.map((item, idx) => {
          if (idx === randomTile) {
            return new Tile(Point.calcX(randomTile), Point.calcY(randomTile), randomValue);
          } else {
            return item;
          }
        })
      });
    default:
      return state;
  }
}

function moveTo(state, direction) {
  // find existing location
  if (state.playerLocation) {

  }
  // see if you can move to the target location
  // remove player
  // place player in target
}

function generateGrid(numRows, numCols) {
  const gridLength = numRows * numCols;
  const grid = [];

  for (let cell = 0; cell < gridLength; cell = cell + 1) {
    const x = Point.calcX(cell);
    const y = Point.calcY(cell);
    let tile = (new Tile(x, y));
    grid.push(tile);
  }
  return grid;
}

export default createGameStore;
