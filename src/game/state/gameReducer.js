import {fromJS} from 'immutable';
import Point2 from './Point2';

import * as actions from './gameStoreActions';

import Tile from './Tile';
import Point from './Point';

const numRows = 15, numCols = 15;
Point.configureCoordinateSystem(numCols, numRows);
Point2.setBounds(numCols, numRows);

const preImmutableState = {
  numRows: numRows,
  numCols: numCols,
  moves: [],
  grid: generateGrid(numRows, numCols),
  atoms: {
    player: {
      name: 'FooBerry the Wise',
      point: { x: 7, y: 7 },
      strength: 100
    },
    thief: {
      point: { x: 1, y: 1 },
      strength: 100
    }
  }
};

const gameInitialState = fromJS(preImmutableState);

const gameReducer = (state, action) => {
  if (state === undefined) {
    return gameInitialState;
  }
  switch (action.type) {
  case actions.MOVE_ACTION:
    return moveTo(state, action.payload.direction);
  case actions.CHANGE_RANDOM_TILE:
    return changeRandomTile(state);
  case actions.NPC_THIEF_MOVE_ACTION:
    return moveNPCThief(state, action);
  case actions.UPDATE_PLAYER_INFO:
    return updatePlayerInfo(state, action);
  default:
    return state;
  }
};

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
  const currentPosition = state.getIn(['atoms', 'player', 'point']);
  let newPosition;
  switch (direction) {
  case 'north':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 0, -1);
    break;
  case 'south':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 0, 1);
    break;
  case 'west':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), -1, 0);
    break;
  case 'east':
    newPosition = Point2.move(currentPosition.get('x'), currentPosition.get('y'), 1, 0);
    break;
  default:
    newPosition = currentPosition;
  }

  return state.withMutations((state) => {
    return state
      .setIn(['atoms', 'player', 'point'], fromJS({
        x: newPosition.x,
        y: newPosition.y
      }))
      .setIn(['moves'], state.get('moves').insert(0, `Player moved ${direction} to ${newPosition.x},${newPosition.y}`));
  });
}

function moveNPCThief(state) {
  return state.withMutations((state) => {
    const thiefLocation = state.getIn(['atoms', 'thief', 'point']);
    const playerLocation = state.getIn(['atoms', 'player', 'point']);
    const newCoordinates = Point2.moveTracking(
      thiefLocation.get('x'), thiefLocation.get('y'),
      playerLocation.get('x'), playerLocation.get('y'));

    return state.setIn(['atoms', 'thief', 'point'], fromJS({
      x: newCoordinates.x,
      y: newCoordinates.y
    }))
      .setIn(['moves'], state.get('moves').insert(0, [`Thief moved to ${newCoordinates.x},${newCoordinates.y}`]));
  });
}

function updatePlayerInfo(state, action) {
  return state.withMutations(state => {
    state.set('atoms',
      state.get('atoms').merge({player: action.payload.player}));
  });
}

export {gameInitialState, gameReducer};
