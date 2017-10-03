import { createStore } from 'redux';
import * as actions from './gameStoreActions';
import CoordinateHelper from  '../utils/CoordinateHelper';
import Tile from './Tile';
import Point from './Point';

const numRows = 15,
      numCols = 15;
Point.configureCoordinateSystem(numCols, numRows);

const coordinateHelper = new CoordinateHelper(numRows, numCols);

const initialState = {
    numRows: numRows,
    numCols: numCols,
    moves: [],
    grid:  generateGrid(numRows, numCols),
    atoms: {
      player: {
        x: 7,
        y: 7,
        strength: 100
      }
    }
};

let createGameStore = () => {
    return createStore(boardReducer, initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

function boardReducer(state, action) {
  switch (action.type) {
    case actions.MOVE_ACTION:
      return moveTo(state, action.payload.direction);
    case actions.CHANGE_RANDOM_TILE:
      return changeRandomTile(state);
    default:
      return state;
  }
}

function changeRandomTile(state) {
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

function moveTo(state ,direction) {
  const currentPosition = new Point(state.atoms.player.x, state.atoms.player.y);
  console.dir(currentPosition);
  let newPosition;
  switch (direction) {
    case 'north':
      newPosition = currentPosition.decY();
      break;
    case 'south':
      newPosition = currentPosition.incY();
      break;
    case 'west':
      newPosition = currentPosition.decX();
      break;
    case 'east':
      newPosition = currentPosition.incX();
      break;
    default:
      newPosition = currentPosition;
  }
  console.log(`New position is ${JSON.stringify(newPosition)}`);
  const newState =  Object.assign({}, state, {
    moves: [`Player moved ${direction} to ${newPosition.x},${newPosition.y}`, ...state.moves],
    atoms: Object.assign({}, state.atoms, {
      player: Object.assign({}, state.atoms.player, {
        x: newPosition.x,
        y: newPosition.y
      })
    })
  });
  return newState;
}

export default createGameStore;
