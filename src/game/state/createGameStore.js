import { createStore } from 'redux';
import CoordinateHelper from  '../utils/CoordinateHelper';
import LandEntity from './LandEntity';
import Tile from './Tile';
import Player from './Player';

const numRows = 20,
      numCols = 34;

const initialState = {
    numRows: numRows,
    numCols: numCols,
    grid:  generateGrid(numRows, numCols)
};

let createGameStore = () => {
    return createStore(boardReducer, initialState);
};

function boardReducer(state, action) {
  return state;
}

function generateGrid(numRows, numCols) {
  const gridLength = numRows * numCols;
  const grid = [];

  for (let cell = 0; cell < gridLength; cell = cell + 1) {
    const x = CoordinateHelper.calcX(cell, numCols);
    const y = CoordinateHelper.calcY(cell, numRows);
    console.log(`${x},${y} being added`);
    let tile;
    if (x === 10 && y === 17) {
      tile = (new Tile(x, y, new Player('Crack Shot')));
    } else {
      tile = (new Tile(x, y, new LandEntity()));
    }
    grid.push(tile);
    console.log(`${x},${y} added tile: ${tile}`);
  }

  return grid;
}


export default createGameStore;
