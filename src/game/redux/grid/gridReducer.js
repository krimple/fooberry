import Tile from '../../state/Tile';
import Point from '../../Point';

const RESET_GRID = 'fooberry/grid/RESET_GRID';
const CHANGE_RANDOM_TILE = 'fooberry/grid/CHANGE_RANDOM_TILE';

const numRows = 15, numCols = 15;
Point.setBounds(numRows, numCols);
const gridData = generateGrid(numRows, numCols);

export default function reducer(state = gridData, action) {
  switch (action.type) {
  case RESET_GRID:
    return { ...generateGrid(numRows, numCols) };
  case CHANGE_RANDOM_TILE:
    return changeTile(state);
  default:
    return state;
  }
}

function changeTile(state) {
  const randomX = Math.floor(Math.random() * numCols);
  const randomY = Math.floor(Math.random() * numRows);
  const randomTileType = Math.floor(Math.random() * 4);

  // create new array from old, mutate new state internally once done
  const newState = [...state];
  newState[randomY][randomX] = new Tile(randomY, randomX, randomTileType);
  return newState;
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

export function resetGrid() {
  return {
    type: RESET_GRID
  };
}

export function changeRandomTile() {
  return {
    type: CHANGE_RANDOM_TILE
  };
}

