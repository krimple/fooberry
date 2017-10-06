import { fromJS } from 'immutable';

import * as actions from './gameStoreActions';

import Tile from './Tile';
import Point from './Point';

const numRows = 15, numCols = 15;
Point.configureCoordinateSystem(numCols, numRows);

const preImmutableState = {
  numRows: numRows,
  numCols: numCols,
  moves: [],
  grid: generateGrid(numRows, numCols),
  atoms: {
    player: {
      name: 'FooBerry the Wise',
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
  const currentPosition = Point.fromXY(
      state.getIn(['atoms', 'player', 'x']),
      state.getIn(['atoms', 'player', 'y']));
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

  return state.withMutations((state) => {
    const newX = newPosition.getX();
    const newY = newPosition.getY();
    return state.setIn(['atoms', 'player', 'x'], newX)
        .setIn(['atoms', 'player', 'y'], newY)
        .setIn(['moves'], state.get('moves').insert(0,
            [`Player moved ${direction} to ${
                state.getIn(['grid', newY, newX]).terrain.description} ${
                newX},${newY}`]));
  });
}

function moveNPCThief(state, action) {
  return state.withMutations((state) => {
    const thiefX = action.payload.point.getX();
    const thiefY = action.payload.point.getY();
    return state.setIn(['atoms', 'thief', 'x'], thiefX)
        .setIn(['atoms', 'thief', 'y'], thiefY)
        .setIn(['moves'], state.get('moves').insert(0,
            [`Thief moved to ${thiefX},${thiefY}`]));
   });
}

function updatePlayerInfo(state, action) {
  debugger;
  return state.withMutations(state => {
    state.set('atoms',
       state.get('atoms').merge({ player: action.payload.player}));
  });
}

export { gameInitialState, gameReducer };
