import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk'

import * as actions from './gameStoreActions';
import npcSagas from './npcSagas';
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
      },
      thief: {
        x: 1,
        y: 1,
        strength: 100
      }
    }
};

const sagaMiddleware = createSagaMiddleware();

let createGameStore = () => {
    const store = createStore(boardReducer, initialState,
        applyMiddleware(sagaMiddleware, thunkMiddleware, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    sagaMiddleware.run(npcSagas);
    return store;
};


function boardReducer(state, action) {
  switch (action.type) {
    case actions.MOVE_ACTION:
      return moveTo(state, action.payload.direction);
    case actions.CHANGE_RANDOM_TILE:
      return changeRandomTile(state);
    case actions.NPC_THIEF_MOVE_ACTION:
      return moveNPCThief(state, action);
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

function moveNPCThief(state, action) {
  const newState = Object.assign({}, state, {
    atoms: Object.assign({}, state.atoms, {
      thief: Object.assign({}, state.atoms.thief, {
        x: action.payload.point.x,
        y: action.payload.point.y
      })
    })
  });
  return newState;
}

export default createGameStore;
