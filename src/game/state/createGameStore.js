import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import {fromJS} from 'immutable';

import * as actions from './gameStoreActions';
import npcSagas from './npcSagas';
import Tile from './Tile';
import Point from './Point';

const numRows = 15,
    numCols = 15;
Point.configureCoordinateSystem(numCols, numRows);

const preImmutableState = {
  numRows: numRows,
  numCols: numCols,
  moves: [],
  grid: generateGrid(numRows, numCols),
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

console.log('creating immutable state from this object');
console.dir(preImmutableState);

const initialState = fromJS(preImmutableState);

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
  const randomX = Math.floor(Math.random() * numCols);
  const randomY = Math.floor(Math.random() * numRows);
  const randomTileType = Math.floor(Math.random() * 4);
  return state.setIn(['grid', randomX, randomY], new Tile(randomY, randomX, randomTileType));
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

function moveTo(state, direction) {
  // temporary until we get our heads around the object graph
  const currentPosition = Point.fromXY(state.getIn(['atoms', 'player', 'x']), state.getIn(['atoms', 'player', 'y']));
  console.log(`current position ${JSON.stringify(currentPosition)}`)
  let newPosition;
  switch (direction) {
    case 'north':
      newPosition = currentPosition.incY(-1);
      break;
    case 'south':
      newPosition = currentPosition.incY(1);
      break;
    case 'west':
      newPosition = currentPosition.incX(-1);
      break;
    case 'east':
      newPosition = currentPosition.incX(1);
      break;
    default:
      newPosition = currentPosition;
  }

  console.log(`next posited position ${JSON.stringify(newPosition)}`);
  return state.withMutations((state) => {
    return state.setIn(['atoms', 'player', 'x'], newPosition.getX())
        .setIn(['atoms', 'player', 'y'], newPosition.getY())
        .setIn(['moves'], state.get('moves').insert(0,
            [`Player moved ${direction} to ${
                state.getIn(['grid', newPosition.getY(), newPosition.getX()]).terrain.description} ${
                newPosition.getX()},${newPosition.getY()}`]));
  });
}

function moveNPCThief(state, action) {
  console.log(`Moving thief to ${JSON.stringify(action.payload.point)}`);
  return state.withMutations((state) => {
    console.log(`setting thief location to ${action.payload.point.getX()},${action.payload.point.getY()}`);
    return state.setIn(['atoms', 'thief', 'x'], action.payload.point.getX())
        .setIn(['atoms', 'thief', 'y'], action.payload.point.getY());
  });
}

export default createGameStore;
